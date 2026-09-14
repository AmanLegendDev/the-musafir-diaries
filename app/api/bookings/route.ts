import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Booking from "@/models/booking.model";
import Package from "@/models/package.model";

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const VALID_BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;

const VALID_PAYMENT_STATUSES = [
  "pending",
  "advance_paid",
  "paid",
  "refunded",
] as const;

type BookingStatus = (typeof VALID_BOOKING_STATUSES)[number];
type PaymentStatus = (typeof VALID_PAYMENT_STATUSES)[number];

function isValidBookingStatus(
  value: unknown,
): value is BookingStatus {
  return (
    typeof value === "string" &&
    VALID_BOOKING_STATUSES.includes(
      value as BookingStatus,
    )
  );
}

function isValidPaymentStatus(
  value: unknown,
): value is PaymentStatus {
  return (
    typeof value === "string" &&
    VALID_PAYMENT_STATUSES.includes(
      value as PaymentStatus,
    )
  );
}

function generateBookingNumber(): string {
  const year = new Date().getFullYear();

  const randomPart = Math.floor(
    100000 + Math.random() * 900000,
  );

  return `TMD-BKG-${year}-${randomPart}`;
}

function normalizeString(
  value: unknown,
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isValidFutureDate(
  value: unknown,
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date >= today;
}

/* -------------------------------------------------------------------------- */
/* GET ALL BOOKINGS                                                           */
/* -------------------------------------------------------------------------- */

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const paymentStatus =
      searchParams.get("paymentStatus");
    const search =
      searchParams.get("search")?.trim();

    const filter: Record<string, unknown> = {};

    /* ----------------------------- Status Filter ------------------------- */

    if (
      status &&
      isValidBookingStatus(status)
    ) {
      filter.bookingStatus = status;
    }

    /* -------------------------- Payment Filter --------------------------- */

    if (
      paymentStatus &&
      isValidPaymentStatus(paymentStatus)
    ) {
      filter.paymentStatus = paymentStatus;
    }

    /* ------------------------------ Search -------------------------------- */

    if (search) {
      filter.$or = [
        {
          bookingNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "packageSnapshot.name": {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* ----------------------------- Query --------------------------------- */

    const bookings = await Booking.find(filter)
      .populate(
        "package",
        "_id name slug duration discountedPrice originalPrice status",
      )
      .select("-__v")
      .sort({
        createdAt: -1,
      })
      .lean();

    /* ------------------------------ Stats -------------------------------- */

    const stats = await Booking.aggregate([
      {
        $group: {
          _id: null,

          total: {
            $sum: 1,
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$bookingStatus",
                    "pending",
                  ],
                },
                1,
                0,
              ],
            },
          },

          confirmed: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$bookingStatus",
                    "confirmed",
                  ],
                },
                1,
                0,
              ],
            },
          },

          cancelled: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$bookingStatus",
                    "cancelled",
                  ],
                },
                1,
                0,
              ],
            },
          },

          completed: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$bookingStatus",
                    "completed",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const bookingStats = stats[0] ?? {
      total: 0,
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
    };

    return NextResponse.json(
      {
        success: true,
        data: bookings,
        stats: bookingStats,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET BOOKINGS ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch bookings.",
      },
      {
        status: 500,
      },
    );
  }
}

/* -------------------------------------------------------------------------- */
/* CREATE BOOKING                                                             */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  try {
    await connectDB();

    /* ---------------------------------------------------------------------- */
    /* Parse request                                                          */
    /* ---------------------------------------------------------------------- */

    let body: Record<string, unknown>;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Extract fields                                                         */
    /* ---------------------------------------------------------------------- */

    const packageId =
      normalizeString(body.packageId);

    const customerName =
      normalizeString(
        body.customerName,
      );

    const phone =
      normalizeString(body.phone);

    const email =
      normalizeString(body.email).toLowerCase();

    const travelDate =
      normalizeString(body.travelDate);

    const pickupLocation =
      normalizeString(
        body.pickupLocation,
      );

    const specialRequest =
      normalizeString(
        body.specialRequest,
      );

    const adults =
      typeof body.adults === "number"
        ? body.adults
        : Number(body.adults);

    const children =
      typeof body.children === "number"
        ? body.children
        : Number(body.children);

    const childrenAgesRaw =
      Array.isArray(body.childrenAges)
        ? body.childrenAges
        : [];

    /* ---------------------------------------------------------------------- */
    /* Basic validation                                                       */
    /* ---------------------------------------------------------------------- */

    if (!packageId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select a package.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !mongoose.isValidObjectId(
        packageId,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid package.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !customerName ||
      customerName.length > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid name.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !phone ||
      phone.length < 7 ||
      phone.length > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !email ||
      email.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidFutureDate(travelDate)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select a valid future travel date.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isInteger(adults) ||
      adults < 1 ||
      adults > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Adults must be between 1 and 20.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isInteger(children) ||
      children < 0 ||
      children > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Children must be between 0 and 20.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !pickupLocation ||
      pickupLocation.length > 200
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid pickup location.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      specialRequest.length > 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Special request is too long.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Validate children ages                                                 */
    /* ---------------------------------------------------------------------- */

    if (
      children > 0 &&
      childrenAgesRaw.length !== children
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide the age of every child.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      children === 0 &&
      childrenAgesRaw.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Children ages cannot be provided when there are no children.",
        },
        {
          status: 400,
        },
      );
    }

    const childrenAges =
      childrenAgesRaw.map((age) =>
        typeof age === "number"
          ? age
          : Number(age),
      );

    if (
      childrenAges.some(
        (age) =>
          !Number.isInteger(age) ||
          age < 0 ||
          age > 17,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Child ages must be between 0 and 17.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Find active package                                                    */
    /* ---------------------------------------------------------------------- */

    const packageDoc =
      await Package.findOne({
        _id: packageId,
        status: "active",
      })
        .select(
          "_id name slug duration originalPrice discountedPrice status",
        )
        .lean();

    if (!packageDoc) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This package is no longer available.",
        },
        {
          status: 404,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Server-side pricing                                                    */
    /* ---------------------------------------------------------------------- */

    const originalPrice =
      typeof packageDoc.originalPrice ===
      "number"
        ? packageDoc.originalPrice
        : 0;

    const discountedPrice =
      typeof packageDoc.discountedPrice ===
      "number"
        ? packageDoc.discountedPrice
        : 0;

    if (
      discountedPrice < 0 ||
      originalPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Package pricing is invalid.",
        },
        {
          status: 500,
        },
      );
    }

    const adultTotal =
      discountedPrice * adults;

    /*
     * Current booking model does not define a
     * separate child price, so children are
     * currently priced at zero.
     */
    const childTotal = 0;

    const subtotal =
      adultTotal + childTotal;

    const total = subtotal;

    /* ---------------------------------------------------------------------- */
    /* Package snapshot                                                       */
    /* ---------------------------------------------------------------------- */

    const packageSnapshot = {
      name: packageDoc.name,
      slug: packageDoc.slug,
      duration: packageDoc.duration,
      originalPrice,
      discountedPrice,
    };

    /* ---------------------------------------------------------------------- */
    /* Booking number                                                         */
    /* ---------------------------------------------------------------------- */

    let bookingNumber =
      generateBookingNumber();

    /*
     * Very small collision protection.
     */
    let attempts = 0;

    while (
      await Booking.exists({
        bookingNumber,
      })
    ) {
      attempts += 1;

      if (attempts > 5) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to generate a booking reference. Please try again.",
          },
          {
            status: 500,
          },
        );
      }

      bookingNumber =
        generateBookingNumber();
    }

    /* ---------------------------------------------------------------------- */
    /* Create booking                                                         */
    /* ---------------------------------------------------------------------- */

    const booking =
      await Booking.create({
        bookingNumber,

        package: packageDoc._id,

        packageSnapshot,

        customerName,

        phone,

        email,

        travelDate: new Date(
          travelDate,
        ),

        adults,

        children,

        childrenAges,

        pickupLocation,

        specialRequest,

        pricing: {
          adultTotal,
          childTotal,
          subtotal,
          total,
        },

        paymentStatus: "pending",

        bookingStatus: "pending",
      });

    /* ---------------------------------------------------------------------- */
    /* Response                                                               */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json(
      {
        success: true,

        message:
          "Booking request submitted successfully.",

        bookingId:
          booking._id.toString(),

        bookingNumber:
          booking.bookingNumber,

        data: {
          _id:
            booking._id.toString(),

          bookingNumber:
            booking.bookingNumber,

          bookingStatus:
            booking.bookingStatus,

          paymentStatus:
            booking.paymentStatus,

          total:
            booking.pricing.total,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST BOOKING ERROR:",
      error,
    );

    /* ---------------------------------------------------------------------- */
    /* Duplicate booking number                                               */
    /* ---------------------------------------------------------------------- */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A booking reference conflict occurred. Please try again.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create booking. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}