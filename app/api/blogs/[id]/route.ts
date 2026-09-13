import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Blog from "@/models/blog.model";
import { blogSchema } from "@/lib/validations/blog";

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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.findById(id)
      .populate("category", "name")
      .lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(
      "GET BLOG ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog.",
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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await req.json();

    const parsed =
      blogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const blog =
      await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    const duplicate =
      await Blog.findOne({
        slug: data.slug,
        _id: { $ne: id },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A blog with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const wasPublished =
      blog.status === "published";

    const willPublish =
      data.status === "published";

    Object.assign(blog, data);

    if (
      willPublish &&
      !wasPublished &&
      !blog.publishedAt
    ) {
      blog.publishedAt = new Date();
    }

    if (!willPublish) {
      blog.publishedAt = undefined;
    }

    await blog.save();

    return NextResponse.json({
      success: true,
      message:
        "Blog updated successfully.",
      data: blog,
    });
  } catch (error) {
    console.error(
      "UPDATE BLOG ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog.",
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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const blog =
      await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Blog deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE BLOG ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog.",
      },
      { status: 500 }
    );
  }
}