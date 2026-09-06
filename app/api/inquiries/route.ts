import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Inquiry from "@/models/Inquiry";
import Destination from "@/models/destination.model";

import { inquirySchema } from "@/lib/validations/inquiry";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body = await request.json();

    const result =
      inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors:
            result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      fullName,
      phone,
      email,
      destination,
      travelDate,
      travelers,
      budget,
      pickupLocation,
      message,
    } = result.data;

    const destinationExists =
      await Destination.findById(
        destination
      );

    if (!destinationExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Destination not found.",
        },
        {
          status: 404,
        }
      );
    }

    const inquiry =
      await Inquiry.create({
        fullName,
        phone,
        email,
        destination,
        travelDate: new Date(
          travelDate
        ),
        travelers,
        budget,
        pickupLocation,
        message,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Inquiry submitted successfully.",
        inquiryId: inquiry._id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}