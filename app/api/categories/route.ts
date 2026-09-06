import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Category from "@/models/category.model";

import { categorySchema } from "@/lib/validations/category";

export async function POST(req: Request) {
  try {

    await connectDB();

    const body = await req.json();

    const parsed =
      categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Failed",
          errors: parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await Category.findOne({
        slug: body.slug,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const category =
      await Category.create(body);

    return NextResponse.json({
      success: true,
      message: "Category Created Successfully",

      data: category,
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

    const categories = await Category.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      categories,
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