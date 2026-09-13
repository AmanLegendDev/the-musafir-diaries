import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Package from "@/models/package.model";
import { packageSchema } from "@/lib/validations/package";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const pkg = await Package.findById(id)
      .populate("destination", "name slug")
      .populate("category", "name slug");

    if (!pkg) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    console.error("GET PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await req.json();

    const parsed = packageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const existing = await Package.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found.",
        },
        { status: 404 }
      );
    }

    const duplicate = await Package.findOne({
      slug: parsed.data.slug,
      _id: { $ne: id },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another package already uses this slug.",
        },
        { status: 409 }
      );
    }

    Object.assign(existing, parsed.data);

    await existing.save();

    return NextResponse.json({
      success: true,
      data: existing,
    });
  } catch (error) {
    console.error("PATCH PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deleted = await Package.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}