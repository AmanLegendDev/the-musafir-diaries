import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Testimonial from "@/models/testimonial.model";
import { testimonialSchema } from "@/lib/validations/testimonial";

/* -------------------- GET -------------------- */

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({})
      .sort({
        featured: -1,
        order: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: testimonials,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET TESTIMONIALS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials.",
      },
      {
        status: 500,
      }
    );
  }
}

/* -------------------- POST -------------------- */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const testimonial = await Testimonial.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully.",
        data: testimonial,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}