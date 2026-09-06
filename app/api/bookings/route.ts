import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Booking from "@/models/booking.model";

import Package from "@/models/package.model";

import {
  bookingSchema,
} from "@/lib/validations/booking";

function generateBookingNumber() {
  return (
    "AE-" +
    Date.now().toString().slice(-8)
  );
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const parsed =
      bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid booking details.",
          errors:
            parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const data = parsed.data;

    const packageExists =
      await Package.findById(
        data.package
      );

    if (!packageExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Package not found.",
        },
        {
          status: 404,
        }
      );
    }

    const booking =
      await Booking.create({
        bookingNumber:
          generateBookingNumber(),

        package: data.package,

        customerName:
          data.customerName,

        phone: data.phone,

        email: data.email,

        travelDate:
          data.travelDate,

        adults: data.adults,

        children: data.childrenCount,

        pickupLocation:
          data.pickupLocation,

        specialRequest:
          data.specialRequest,

        totalPrice:
          data.totalPrice,
      });

    return NextResponse.json({
      success: true,
      bookingId: booking._id,
      bookingNumber:
        booking.bookingNumber,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find({
      status: "active",
    })
      .select(
        "name pricing duration heroImage"
      )
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      packages,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}