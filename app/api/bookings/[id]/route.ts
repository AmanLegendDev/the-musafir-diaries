import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Booking, {
  type BookingDocument,
} from "@/models/booking.model";

import {
  canTransitionBookingStatus,
  isValidBookingStatus,
  type BookingStatus,
} from "@/lib/booking/booking-status";

import {
  canTransitionPaymentStatus,
  isValidPaymentStatus,
  type PaymentStatus,
} from "@/lib/booking/payment-status";

import Package from "@/models/package.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

function invalidIdResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid booking ID.",
    },
    {
      status: 400,
    }
  );
}

/* -------------------------------------------------------------------------- */
/* LEGACY BOOKING REPAIR                                                      */
/*                                                                            */
/* Older booking records may not contain packageSnapshot / pricing because    */
/* those fields were introduced later. Before save(), Mongoose validates the */
/* complete document, so we repair missing legacy data from the Package.      */
/* -------------------------------------------------------------------------- */

async function repairLegacyBooking(
  booking: BookingDocument,
) {
  /* ---------------------------------------------------------------------- */
  /* Package snapshot                                                       */
  /* ---------------------------------------------------------------------- */

  if (!booking.packageSnapshot) {
    if (!booking.package) {
      throw new Error(
        "This booking has no associated package, so its package snapshot cannot be restored."
      );
    }

    const packageId = booking.package?._id ?? booking.package;

    if (
      !packageId ||
      !mongoose.Types.ObjectId.isValid(
        String(packageId)
      )
    ) {
      throw new Error(
        "This booking has an invalid package reference."
      );
    }

    const packageDoc = await Package.findById(
      packageId
    )
      .select(
        "_id name slug duration originalPrice discountedPrice"
      )
      .lean();

    if (!packageDoc) {
      throw new Error(
        "The package associated with this booking could not be found."
      );
    }

    booking.packageSnapshot = {
      name: packageDoc.name,
      slug: packageDoc.slug,
      duration: packageDoc.duration,
      originalPrice:
        typeof packageDoc.originalPrice === "number"
          ? packageDoc.originalPrice
          : 0,
      discountedPrice:
        typeof packageDoc.discountedPrice === "number"
          ? packageDoc.discountedPrice
          : 0,
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Pricing                                                                 */
  /* ---------------------------------------------------------------------- */

  if (!booking.pricing) {
    const adults =
      typeof booking.adults === "number"
        ? booking.adults
        : 0;

    const children =
      typeof booking.children === "number"
        ? booking.children
        : 0;

    const pricePerAdult =
      typeof booking.packageSnapshot
        ?.discountedPrice === "number"
        ? booking.packageSnapshot.discountedPrice
        : 0;

    /*
     * Legacy bookings do not contain their original pricing breakdown.
     *
     * We therefore create a safe recoverable structure rather than allowing
     * the status update itself to fail schema validation.
     */
    const adultTotal =
      pricePerAdult * adults;

    const childTotal = 0;

    const subtotal =
      adultTotal + childTotal;

    booking.pricing = {
      adultTotal,
      childTotal,
      subtotal,
      total: subtotal,
    };
  }
}

/* -------------------------------------------------------------------------- */
/* GET SINGLE BOOKING                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(
  _req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return invalidIdResponse();
    }

    const booking = await Booking.findById(id)
      .populate(
        "package",
        "_id name slug duration discountedPrice originalPrice status"
      )
      .select("-__v")
      .lean();

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: booking,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET BOOKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking.",
      },
      {
        status: 500,
      }
    );
  }
}

/* -------------------------------------------------------------------------- */
/* PATCH BOOKING                                                              */
/*                                                                            */
/* Supports exactly ONE controlled update at a time:                         */
/*                                                                            */
/* bookingStatus                                                              */
/* OR                                                                         */
/* paymentStatus                                                              */
/* -------------------------------------------------------------------------- */

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return invalidIdResponse();
    }

    const body = await req.json();

    const hasBookingStatus =
      body &&
      Object.prototype.hasOwnProperty.call(
        body,
        "bookingStatus"
      );

    const hasPaymentStatus =
      body &&
      Object.prototype.hasOwnProperty.call(
        body,
        "paymentStatus"
      );

    /* -------------------------------------------------------------------- */
    /* Exactly one status field is allowed                                  */
    /* -------------------------------------------------------------------- */

    if (
      Number(hasBookingStatus) +
        Number(hasPaymentStatus) !==
      1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Provide exactly one status to update.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------------------- */
    /* Find booking                                                         */
    /* -------------------------------------------------------------------- */

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ==================================================================== */
    /* BOOKING STATUS                                                        */
    /* ==================================================================== */

    if (hasBookingStatus) {
      const nextStatus =
        body.bookingStatus as BookingStatus;

      if (!isValidBookingStatus(nextStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid booking status.",
          },
          {
            status: 400,
          }
        );
      }

      const currentStatus =
        booking.bookingStatus as BookingStatus;

      if (
        !canTransitionBookingStatus(
          currentStatus,
          nextStatus
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `Booking cannot move from "${currentStatus}" to "${nextStatus}".`,
          },
          {
            status: 409,
          }
        );
      }

      /* ------------------------------------------------------------------ */
      /* Repair old/legacy booking before save                              */
      /* ------------------------------------------------------------------ */

      try {
        await repairLegacyBooking(booking);
      } catch (repairError) {
        console.error(
          "LEGACY BOOKING REPAIR ERROR:",
          repairError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              repairError instanceof Error
                ? repairError.message
                : "This legacy booking could not be repaired.",
          },
          {
            status: 409,
          }
        );
      }

      booking.bookingStatus = nextStatus;

      await booking.save();

      const updatedBooking =
        await Booking.findById(id)
          .populate(
            "package",
            "_id name slug duration discountedPrice originalPrice status"
          )
          .select("-__v")
          .lean();

      return NextResponse.json(
        {
          success: true,
          message: `Booking ${nextStatus} successfully.`,
          data: updatedBooking,
        },
        {
          status: 200,
        }
      );
    }

    /* ==================================================================== */
    /* PAYMENT STATUS                                                        */
    /* ==================================================================== */

    const nextPaymentStatus =
      body.paymentStatus as PaymentStatus;

    if (
      !isValidPaymentStatus(
        nextPaymentStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        {
          status: 400,
        }
      );
    }

    const currentPaymentStatus =
      booking.paymentStatus as PaymentStatus;

    if (
      !canTransitionPaymentStatus(
        currentPaymentStatus,
        nextPaymentStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Payment cannot move from "${currentPaymentStatus}" to "${nextPaymentStatus}".`,
        },
        {
          status: 409,
        }
      );
    }

    /* -------------------------------------------------------------------- */
    /* Repair old/legacy booking before save                                */
    /* -------------------------------------------------------------------- */

    try {
      await repairLegacyBooking(booking);
    } catch (repairError) {
      console.error(
        "LEGACY BOOKING REPAIR ERROR:",
        repairError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            repairError instanceof Error
              ? repairError.message
              : "This legacy booking could not be repaired.",
        },
        {
          status: 409,
        }
      );
    }

    booking.paymentStatus =
      nextPaymentStatus;

    await booking.save();

    const updatedBooking =
      await Booking.findById(id)
        .populate(
          "package",
          "_id name slug duration discountedPrice originalPrice status"
        )
        .select("-__v")
        .lean();

    return NextResponse.json(
      {
        success: true,
        message: `Payment marked as ${nextPaymentStatus.replace(
          "_",
          " "
        )}.`,
        data: updatedBooking,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE BOOKING ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update booking.",
      },
      {
        status: 500,
      }
    );
  }
}