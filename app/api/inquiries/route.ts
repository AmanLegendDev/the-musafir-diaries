import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";

import Inquiry from "@/models/Inquiry";
import Destination from "@/models/destination.model";

import { inquirySchema } from "@/lib/validations/inquiry";
import { normalizeInquiryData } from "@/lib/inquiry/normalize-inquiry-data";
import { generateInquiryNumber } from "@/lib/inquiry/generate-inquiry-number";

function getStartOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

function parseTravelDate(value: string) {
  /*
   * The form sends a YYYY-MM-DD value.
   * Construct the date at local midnight rather than relying
   * on browser/runtime parsing differences.
   */
  const travelDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(travelDate.getTime())) {
    return null;
  }

  return travelDate;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form and try again.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = normalizeInquiryData(result.data);

    /*
     * Defensive ObjectId validation.
     * Schema already validates it, but the API should still
     * protect the database boundary.
     */
    if (!mongoose.isValidObjectId(data.destination)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid destination.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Parse and validate travel date.
     */
    const travelDate = parseTravelDate(data.travelDate);

    if (!travelDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid travel date.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Past dates are not accepted.
     */
    if (travelDate < getStartOfToday()) {
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
     * Only active destinations can receive inquiries.
     */
    const destinationExists = await Destination.exists({
      _id: data.destination,
      status: "active",
    });

    if (!destinationExists) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected destination is unavailable.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * Generate a human-friendly reference number.
     */
    const inquiryNumber = await generateInquiryNumber();

    /*
     * Create the inquiry.
     */
    const inquiry = await Inquiry.create({
      inquiryNumber,

      fullName: data.fullName,
      phone: data.phone,
      email: data.email,

      destination: new mongoose.Types.ObjectId(
        data.destination,
      ),

      travelDate,

      travelers: data.travelers,

      budget: data.budget,
      pickupLocation: data.pickupLocation,
      message: data.message,

      status: "pending",
      adminNotes: "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received.",
        inquiryId: inquiry._id.toString(),
        inquiryNumber: inquiry.inquiryNumber,
        status: inquiry.status,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    /*
     * MongoDB duplicate-key protection.
     *
     * This mainly protects against an extremely rare inquiry
     * number collision between simultaneous requests.
     */
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      console.error(
        "Inquiry duplicate-key error:",
        error,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not complete the inquiry right now. Please try again.",
        },
        {
          status: 409,
        },
      );
    }

    console.error("Inquiry submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your inquiry. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}