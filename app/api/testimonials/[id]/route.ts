import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Testimonial from "@/models/testimonial.model";
import { testimonialSchema } from "@/lib/validations/testimonial";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* -------------------- GET -------------------- */

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET TESTIMONIAL ERROR:", error);

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

/* -------------------- PATCH -------------------- */

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

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

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      parsed.data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial updated successfully.",
        data: testimonial,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);

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

/* -------------------- DELETE -------------------- */

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);

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