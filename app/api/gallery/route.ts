import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Gallery from "@/models/gallery.model";
import { gallerySchema } from "@/lib/validations/gallery";

export async function GET() {
  try {
    await connectDB();

    const gallery = await Gallery.find({})
      .sort({
        featured: -1,
        order: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: gallery,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery.",
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

    const parsed = gallerySchema.safeParse(body);

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

    const data = parsed.data;

    const gallery = await Gallery.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
        data: gallery,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);

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