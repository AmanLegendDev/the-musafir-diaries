import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

import connectDB from "@/lib/db";

import FAQ from "@/models/faq.model";
import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";

import { faqSchema } from "@/lib/validations/faq";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

function invalidIdResponse() {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid FAQ ID.",
    },
    { status: 400 },
  );
}

async function validateRelationships(
  values: {
    destination?: string | null;
    package?: string | null;
    hotel?: string | null;
    status: "active" | "draft";
  },
) {
  if (values.destination) {
    if (!Types.ObjectId.isValid(values.destination)) {
      return {
        error: "Invalid destination ID.",
        fieldErrors: {
          destination: [
            "Please select a valid destination.",
          ],
        },
      };
    }

    const destination =
      await Destination.findById(
        values.destination,
      )
        .select("_id status")
        .lean();

    if (!destination) {
      return {
        error:
          "Selected destination does not exist.",
        fieldErrors: {
          destination: [
            "Please select a valid destination.",
          ],
        },
      };
    }

    if (
      values.status === "active" &&
      destination.status !== "active"
    ) {
      return {
        error:
          "An active FAQ cannot belong to a draft destination.",
        fieldErrors: {
          destination: [
            "Please select an active destination.",
          ],
        },
      };
    }
  }

  if (values.package) {
    if (!Types.ObjectId.isValid(values.package)) {
      return {
        error: "Invalid package ID.",
        fieldErrors: {
          package: [
            "Please select a valid package.",
          ],
        },
      };
    }

    const packageDoc =
      await Package.findById(values.package)
        .select("_id status")
        .lean();

    if (!packageDoc) {
      return {
        error:
          "Selected package does not exist.",
        fieldErrors: {
          package: [
            "Please select a valid package.",
          ],
        },
      };
    }
  }

  if (values.hotel) {
    if (!Types.ObjectId.isValid(values.hotel)) {
      return {
        error: "Invalid hotel ID.",
        fieldErrors: {
          hotel: [
            "Please select a valid hotel.",
          ],
        },
      };
    }

    const hotelDoc =
      await Hotel.findById(values.hotel)
        .select("_id status")
        .lean();

    if (!hotelDoc) {
      return {
        error: "Selected hotel does not exist.",
        fieldErrors: {
          hotel: [
            "Please select a valid hotel.",
          ],
        },
      };
    }

    if (
      values.status === "active" &&
      hotelDoc.status !== "active"
    ) {
      return {
        error:
          "An active FAQ cannot belong to a draft hotel.",
        fieldErrors: {
          hotel: [
            "Please select an active hotel.",
          ],
        },
      };
    }
  }

  return null;
}

/* =========================================================
   GET SINGLE FAQ
========================================================= */

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return invalidIdResponse();
    }

    await connectDB();

    const faq = await FAQ.findById(id)
      .populate(
        "destination",
        "_id name slug status",
      )
      .populate(
        "package",
        "_id name slug status destination",
      )
      .populate(
        "hotel",
        "_id name slug status destination",
      )
      .select("-__v")
      .lean();

    if (!faq) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        faq,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET_FAQ_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch FAQ.",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   PATCH / UPDATE FAQ
========================================================= */

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return invalidIdResponse();
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        { status: 400 },
      );
    }

    const parsed = faqSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<
        string,
        string[]
      > = {};

      parsed.error.issues.forEach((issue) => {
        const field =
          issue.path.join(".") || "form";

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message);
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "Please fix the validation errors.",
          fieldErrors,
        },
        { status: 422 },
      );
    }

    const values = parsed.data;

    await connectDB();

    const faq = await FAQ.findById(id);

    if (!faq) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found.",
        },
        { status: 404 },
      );
    }

    const relationshipError =
      await validateRelationships(values);

    if (relationshipError) {
      return NextResponse.json(
        {
          success: false,
          ...relationshipError,
        },
        { status: 422 },
      );
    }

    faq.question = values.question;
    faq.answer = values.answer;
    faq.destination =
      values.destination
        ? new Types.ObjectId(
            values.destination,
          )
        : null;
    faq.package = values.package
      ? new Types.ObjectId(values.package)
      : null;
    faq.hotel = values.hotel
      ? new Types.ObjectId(values.hotel)
      : null;
    faq.category = values.category;
    faq.featured = values.featured;
    faq.displayOrder = values.displayOrder;
    faq.status = values.status;
    faq.seoTitle = values.seoTitle;
    faq.seoDescription =
      values.seoDescription;

    await faq.save();

    return NextResponse.json(
      {
        success: true,
        message: "FAQ updated successfully.",
        faq: {
          _id: String(faq._id),
          question: faq.question,
          status: faq.status,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE_FAQ_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update FAQ. Please try again.",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   DELETE FAQ
========================================================= */

export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return invalidIdResponse();
    }

    await connectDB();

    const faq =
      await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "FAQ deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_FAQ_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to delete FAQ. Please try again.",
      },
      { status: 500 },
    );
  }
}