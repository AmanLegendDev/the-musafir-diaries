import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Booking from "@/models/booking.model";
import Package from "@/models/package.model";

import { bookingSchema } from "@/lib/validations/booking.schema";
import { calculateBookingPrice } from "@/lib/booking/calculate-booking-price";
import { generateBookingNumber } from "@/lib/booking/generate-booking-number";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    /*
     * Validate incoming request.
     */
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the booking details.",
          errors: parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = parsed.data;

    /*
     * Validate package ObjectId.
     */
    if (!mongoose.isValidObjectId(data.package)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package selected.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Validate travel date.
     */
    const travelDate = new Date(`${data.travelDate}T00:00:00`);

    if (Number.isNaN(travelDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid travel date.",
        },
        {
          status: 400,
        },
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (travelDate < today) {
      return NextResponse.json(
        {
          success: false,
          message: "Travel date cannot be in the past.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Fetch package from database.
     *
     * Frontend package price is NEVER trusted.
     */
    const selectedPackage = await Package.findOne({
      _id: data.package,
      status: "active",
    })
      .select(
        [
          "name",
          "slug",
          "duration",
          "originalPrice",
          "discountedPrice",
          "childPolicy",
        ].join(" "),
      )
      .lean();

    if (!selectedPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected package is no longer available.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * Safety check for children.
     */
    const childrenAges =
      data.childrenCount > 0
        ? data.childrenAges
        : [];

    if (
      childrenAges.length !==
      data.childrenCount
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the age of every child.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * SERVER-SIDE PRICE CALCULATION.
     *
     * Never use data.totalPrice from the browser.
     */
    const pricing = calculateBookingPrice({
      adultPrice: selectedPackage.discountedPrice,
      adults: data.adults,
      childrenAges,
      childPolicy: selectedPackage.childPolicy,
    });

    /*
     * Generate human-readable booking reference.
     */
    let bookingNumber = generateBookingNumber();

    /*
     * Extremely unlikely collision protection.
     */
    let exists = await Booking.exists({
      bookingNumber,
    });

    while (exists) {
      bookingNumber = generateBookingNumber();

      exists = await Booking.exists({
        bookingNumber,
      });
    }

    /*
     * Create booking request.
     */
    const booking = await Booking.create({
      bookingNumber,

      package: selectedPackage._id,

      packageSnapshot: {
        name: selectedPackage.name,
        slug: selectedPackage.slug,
        duration: selectedPackage.duration,
        originalPrice: selectedPackage.originalPrice,
        discountedPrice: selectedPackage.discountedPrice,
      },

      customerName: data.customerName,
      phone: data.phone,
      email: data.email,

      travelDate,

      adults: data.adults,
      children: data.childrenCount,
      childrenAges,

      pickupLocation: data.pickupLocation,

      specialRequest:
        data.specialRequest ?? "",

      pricing,

      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Booking request submitted successfully.",

        bookingId: booking.bookingNumber,

        bookingNumber:
          booking.bookingNumber,

        bookingStatus:
          booking.bookingStatus,

        pricing: {
          total: pricing.total,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "BOOKING_CREATE_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your booking request right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}