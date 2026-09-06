import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Destination from "@/models/destination.model";

import { destinationSchema } from "@/lib/validations/destination";

export async function POST(req: Request) {
  try {
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
      await Destination.findOne({
        slug: body.slug,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Destination already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const destination =
      await Destination.create(body);

    return NextResponse.json({
      success: true,
      data: destination,
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
export async function GET() {
  try {
    await connectDB();

    const destinations =
      await Destination.find()
        .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      destinations,
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