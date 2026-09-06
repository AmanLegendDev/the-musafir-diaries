import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Package from "@/models/package.model";

import { packageSchema } from "@/lib/validations/package";

export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find({
      status: "active",
    })
      .select(
  "name duration heroImage originalPrice discountedPrice childPolicy"
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

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const parsed =
      packageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await Package.findOne({
        slug: body.slug,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Package already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const pkg =
      await Package.create(body);

    return NextResponse.json({
      success: true,
      data: pkg,
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