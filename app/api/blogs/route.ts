import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Blog from "@/models/blog.model";
import { blogSchema } from "@/lib/validations/blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs.",
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

    const parsed = blogSchema.safeParse(body);

   if (!parsed.success) {
  console.log("REQUEST BODY:");
  console.log(body);

  console.log("VALIDATION ERRORS:");
  console.dir(parsed.error.format(), { depth: null });

  return NextResponse.json(
    {
      success: false,
      message: "Validation failed.",
      body,
      errors: parsed.error.format(),
    },
    {
      status: 400,
    }
  );
}

    const data = parsed.data;

    const existingBlog = await Blog.findOne({
      slug: data.slug,
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const blog = await Blog.create({
      ...data,
      publishedAt:
        data.status === "published"
          ? new Date()
          : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully.",
        data: blog,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

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