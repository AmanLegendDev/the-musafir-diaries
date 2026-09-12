import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";
import { destinationSchema } from "@/lib/validations/destination";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* ─────────────────────────────────────────────
   GET — Get single destination
───────────────────────────────────────────── */

export async function GET(
  _req: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid destination ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const destination =
      await Destination.findById(id).lean();

    if (!destination) {
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

    return NextResponse.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error(
      "GET_DESTINATION_ERROR:",
      error
    );

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

/* ─────────────────────────────────────────────
   PATCH — Update destination
───────────────────────────────────────────── */

export async function PATCH(
  req: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid destination ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const body = await req.json();

    const parsed =
      destinationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await Destination.findById(id);

    if (!existing) {
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

    /*
     * Prevent duplicate slug.
     * The current destination itself is excluded.
     */

    const duplicate =
      await Destination.findOne({
        slug: parsed.data.slug,
        _id: {
          $ne: id,
        },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Another destination already uses this slug.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Only validated fields are written.
     */

    Object.assign(existing, parsed.data);

    await existing.save();

    return NextResponse.json({
      success: true,
      message:
        "Destination updated successfully.",
      data: existing,
    });
  } catch (error) {
    console.error(
      "PATCH_DESTINATION_ERROR:",
      error
    );

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

/* ─────────────────────────────────────────────
   DELETE — Delete destination
───────────────────────────────────────────── */

export async function DELETE(
  _req: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid destination ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const destination =
      await Destination.findByIdAndDelete(id);

    if (!destination) {
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

    return NextResponse.json({
      success: true,
      message:
        "Destination deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE_DESTINATION_ERROR:",
      error
    );

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