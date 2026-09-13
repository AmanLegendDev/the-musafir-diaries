import {
  NextRequest,
  NextResponse,
} from "next/server";

import { Types } from "mongoose";

import connectDB from "@/lib/db";

import Hotel from "@/models/hotel.model";
import Destination from "@/models/destination.model";

import { hotelSchema } from "@/lib/validations/hotel";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

/* =========================================================
   GET SINGLE HOTEL
========================================================= */

export async function GET(
  _request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid hotel ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const hotel =
      await Hotel.findById(id)
        .populate(
          "destination",
          "name slug status"
        )
        .lean();

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: "Hotel not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error(
      "GET_SINGLE_HOTEL_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to fetch hotel.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   UPDATE HOTEL
========================================================= */

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid hotel ID.",
        },
        { status: 400 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    const parsed =
      hotelSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<
        string,
        string[]
      > = {};

      parsed.error.issues.forEach(
        (issue) => {
          const field =
            issue.path.join(".") ||
            "form";

          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }

          fieldErrors[field].push(
            issue.message
          );
        }
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Please fix the validation errors.",
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const values = parsed.data;

    await connectDB();

    const existingHotel =
      await Hotel.findById(id);

    if (!existingHotel) {
      return NextResponse.json(
        {
          success: false,
          error: "Hotel not found.",
        },
        { status: 404 }
      );
    }

    /* Destination */

    if (
      !Types.ObjectId.isValid(
        values.destination
      )
    ) {
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
        { status: 422 }
      );
    }

    const destination =
      await Destination.findById(
        values.destination
      )
        .select("_id name slug status")
        .lean();

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Selected destination does not exist.",
          fieldErrors: {
            destination: [
              "Please select a valid destination.",
            ],
          },
        },
        { status: 422 }
      );
    }

    /* Active hotel requires active destination */

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
        { status: 422 }
      );
    }

    /* Duplicate slug */

    const duplicate =
      await Hotel.findOne({
        slug: values.slug,
        _id: {
          $ne: id,
        },
      })
        .select("_id")
        .lean();

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A hotel with this slug already exists.",
          fieldErrors: {
            slug: [
              "This slug is already in use.",
            ],
          },
        },
        { status: 409 }
      );
    }

    Object.assign(existingHotel, {
      ...values,
      destination:
        new Types.ObjectId(
          values.destination
        ),
    });

    await existingHotel.save();

    return NextResponse.json({
      success: true,
      message:
        "Hotel updated successfully.",
      hotel: {
        _id: String(
          existingHotel._id
        ),
        name: existingHotel.name,
        slug: existingHotel.slug,
        status:
          existingHotel.status,
      },
    });
  } catch (error: unknown) {
    console.error(
      "UPDATE_HOTEL_ERROR:",
      error
    );

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number })
        .code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A hotel with this slug already exists.",
          fieldErrors: {
            slug: [
              "This slug is already in use.",
            ],
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update hotel.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE HOTEL
========================================================= */

export async function DELETE(
  _request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid hotel ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const hotel =
      await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: "Hotel not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Hotel deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE_HOTEL_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to delete hotel.",
      },
      { status: 500 }
    );
  }
}