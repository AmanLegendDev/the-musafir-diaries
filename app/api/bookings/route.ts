import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Booking from "@/models/booking.model";
import "@/models/package.model";
/* -------------------------------------------------------------------------- */
/* GET ALL BOOKINGS                                                           */
/* -------------------------------------------------------------------------- */

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");
    const search = searchParams.get("search")?.trim();

    const filter: Record<string, unknown> = {};

    /* ----------------------------- Status Filter ------------------------- */

    const validBookingStatuses = [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
    ];

    if (
      status &&
      validBookingStatuses.includes(status)
    ) {
      filter.bookingStatus = status;
    }

    /* -------------------------- Payment Filter --------------------------- */

    const validPaymentStatuses = [
      "pending",
      "advance_paid",
      "paid",
      "refunded",
    ];

    if (
      paymentStatus &&
      validPaymentStatuses.includes(paymentStatus)
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
        "_id name slug duration discountedPrice originalPrice status"
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
                  $eq: ["$bookingStatus", "pending"],
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
                  $eq: ["$bookingStatus", "confirmed"],
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
                  $eq: ["$bookingStatus", "cancelled"],
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
                  $eq: ["$bookingStatus", "completed"],
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
      }
    );
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings.",
      },
      {
        status: 500,
      }
    );
  }
}