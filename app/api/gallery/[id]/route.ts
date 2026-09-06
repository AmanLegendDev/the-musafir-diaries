import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Gallery from "@/models/gallery.model";
import { gallerySchema } from "@/lib/validations/gallery";

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

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

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

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      parsed.data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gallery updated successfully.",
        data: gallery,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);

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

    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gallery deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

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