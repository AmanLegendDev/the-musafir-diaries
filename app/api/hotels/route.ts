import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

import connectDB from "@/lib/db";

import Hotel from "@/models/hotel.model";
import Destination from "@/models/destination.model";

import { hotelSchema } from "@/lib/validations/hotel";

/* =========================================================
   GET HOTELS
   ========================================================= */

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const destination = searchParams.get("destination");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = {};

    /* =====================================================
       DESTINATION FILTER
    ===================================================== */

    if (destination) {
      if (!Types.ObjectId.isValid(destination)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid destination ID.",
          },
          { status: 400 },
        );
      }

      filter.destination = new Types.ObjectId(destination);
    }

    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (status === "active" || status === "draft") {
      filter.status = status;
    }

    /* =====================================================
       FEATURED FILTER
    ===================================================== */

    if (featured === "true") {
      filter.featured = true;
    }

    /* =====================================================
       FETCH HOTELS
    ===================================================== */

    const hotels = await Hotel.find(filter)
      .select("-__v")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        hotels,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET_HOTELS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch hotels.",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   POST / CREATE HOTEL
   ========================================================= */

export async function POST(request: NextRequest) {
  try {
    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        { status: 400 },
      );
    }

    /* =====================================================
       VALIDATE BODY
    ===================================================== */

    const parsed = hotelSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};

      parsed.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "form";

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message);
      });

      return NextResponse.json(
        {
          success: false,
          error: "Please fix the validation errors.",
          fieldErrors,
        },
        { status: 422 },
      );
    }

    const values = parsed.data;

    /* =====================================================
       DATABASE CONNECTION
    ===================================================== */

    await connectDB();

    /* =====================================================
       DESTINATION ID VALIDATION
    ===================================================== */

    if (!Types.ObjectId.isValid(values.destination)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid destination.",
          fieldErrors: {
            destination: [
              "Please select a valid destination.",
            ],
          },
        },
        { status: 422 },
      );
    }

    /* =====================================================
       CHECK DESTINATION EXISTS
    ===================================================== */

    const destination = await Destination.findById(
      values.destination,
    )
      .select("_id name slug status")
      .lean();

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          error: "Selected destination does not exist.",
          fieldErrors: {
            destination: [
              "Please select a valid destination.",
            ],
          },
        },
        { status: 422 },
      );
    }

    /* =====================================================
       ACTIVE HOTEL → ACTIVE DESTINATION
    ===================================================== */

    if (
      values.status === "active" &&
      destination.status !== "active"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An active hotel cannot belong to a draft destination.",
          fieldErrors: {
            destination: [
              "Please select an active destination.",
            ],
          },
        },
        { status: 422 },
      );
    }

    /* =====================================================
       SLUG DUPLICATE CHECK
    ===================================================== */

    const existingHotel = await Hotel.findOne({
      slug: values.slug,
    })
      .select("_id")
      .lean();

    if (existingHotel) {
      return NextResponse.json(
        {
          success: false,
          error: "A hotel with this slug already exists.",
          fieldErrors: {
            slug: ["This slug is already in use."],
          },
        },
        { status: 409 },
      );
    }

    /* =====================================================
       CREATE HOTEL
    ===================================================== */

    const hotel = await Hotel.create({
      ...values,
      destination: new Types.ObjectId(values.destination),
    });

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message: "Hotel created successfully.",
        hotel: {
          _id: String(hotel._id),
          name: hotel.name,
          slug: hotel.slug,
          destination: String(hotel.destination),
          status: hotel.status,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("CREATE_HOTEL_ERROR:", error);

    /* =====================================================
       MONGOOSE DUPLICATE KEY SAFETY
    ===================================================== */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A hotel with this slug already exists.",
          fieldErrors: {
            slug: ["This slug is already in use."],
          },
        },
        { status: 409 },
      );
    }

    /* =====================================================
       GENERIC SERVER ERROR
    ===================================================== */

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create hotel. Please try again.",
      },
      { status: 500 },
    );
  }
}