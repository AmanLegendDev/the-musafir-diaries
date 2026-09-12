import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

interface PopulatedDestination {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  city?: string;
  state?: string;
  country?: string;
}

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inquiry reference.",
        },
        {
          status: 400,
        },
      );
    }

    const inquiry = await Inquiry.findById(id)
      .populate({
        path: "destination",
        select: "name slug city state country",
        match: {
          status: "active",
        },
      })
      .lean();

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * Mongoose knows the field as ObjectId from the schema,
     * while populate() returns the referenced Destination object.
     * The double assertion tells TypeScript about the populated shape.
     */
    const destination =
      inquiry.destination as unknown as
        | PopulatedDestination
        | null;

    return NextResponse.json({
      success: true,

      inquiry: {
        id: inquiry._id.toString(),

        inquiryNumber: inquiry.inquiryNumber,

        fullName: inquiry.fullName,
        phone: inquiry.phone,
        email: inquiry.email,

        destination: destination
          ? {
              id: destination._id.toString(),
              name: destination.name,
              slug: destination.slug,
              city: destination.city ?? "",
              state: destination.state ?? "",
              country: destination.country ?? "",
            }
          : null,

        travelDate: inquiry.travelDate,

        travelers: inquiry.travelers,

        budget: inquiry.budget ?? "",

        pickupLocation:
          inquiry.pickupLocation ?? "",

        message: inquiry.message,

        status: inquiry.status,

        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Inquiry fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while loading your inquiry.",
      },
      {
        status: 500,
      },
    );
  }
}