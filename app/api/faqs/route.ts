import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

import connectDB from "@/lib/db";

import FAQ from "@/models/faq.model";
import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";

import { faqSchema } from "@/lib/validations/faq";

/* =========================================================
   GET FAQs
   ========================================================= */

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const destination =
      searchParams.get("destination");

    const packageId =
      searchParams.get("package");

    const hotel =
      searchParams.get("hotel");

    const category =
      searchParams.get("category");

    const status =
      searchParams.get("status");

    const featured =
      searchParams.get("featured");

    const filter: Record<string, unknown> = {};

    /* ---------------------------------------------------------
       Destination
    --------------------------------------------------------- */

    if (destination) {
      if (!Types.ObjectId.isValid(destination)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid destination ID.",
          },
          { status: 400 },
        );
      }

      filter.destination =
        new Types.ObjectId(destination);
    }

    /* ---------------------------------------------------------
       Package
    --------------------------------------------------------- */

    if (packageId) {
      if (!Types.ObjectId.isValid(packageId)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid package ID.",
          },
          { status: 400 },
        );
      }

      filter.package =
        new Types.ObjectId(packageId);
    }

    /* ---------------------------------------------------------
       Hotel
    --------------------------------------------------------- */

    if (hotel) {
      if (!Types.ObjectId.isValid(hotel)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid hotel ID.",
          },
          { status: 400 },
        );
      }

      filter.hotel =
        new Types.ObjectId(hotel);
    }

    /* ---------------------------------------------------------
       Category
    --------------------------------------------------------- */

    if (category) {
      filter.category = category;
    }

    /* ---------------------------------------------------------
       Status
    --------------------------------------------------------- */

    if (
      status === "active" ||
      status === "draft"
    ) {
      filter.status = status;
    }

    /* ---------------------------------------------------------
       Featured
    --------------------------------------------------------- */

    if (featured === "true") {
      filter.featured = true;
    }

    /* ---------------------------------------------------------
       Fetch
    --------------------------------------------------------- */

    const faqs = await FAQ.find(filter)
      .select("-__v")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        faqs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET_FAQS_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch FAQs.",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   POST / CREATE FAQ
   ========================================================= */

export async function POST(
  request: NextRequest,
) {
  try {
    let body: unknown;

    /* ---------------------------------------------------------
       JSON
    --------------------------------------------------------- */

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

    /* ---------------------------------------------------------
       Validation
    --------------------------------------------------------- */

    const parsed =
      faqSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors:
        Record<string, string[]> = {};

      parsed.error.issues.forEach(
        (issue) => {
          const field =
            issue.path.join(".") ||
            "form";

          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }

          fieldErrors[field].push(
            issue.message,
          );
        },
      );

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

    /* ---------------------------------------------------------
       Relationship Validation
    --------------------------------------------------------- */

    if (values.destination) {
      const destination =
        await Destination.findById(
          values.destination,
        )
          .select("_id status")
          .lean();

      if (!destination) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Selected destination does not exist.",
            fieldErrors: {
              destination: [
                "Please select a valid destination.",
              ],
            },
          },
          { status: 422 },
        );
      }

      if (
        values.status === "active" &&
        destination.status !== "active"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "An active FAQ cannot belong to a draft destination.",
            fieldErrors: {
              destination: [
                "Please select an active destination.",
              ],
            },
          },
          { status: 422 },
        );
      }
    }

    /* ---------------------------------------------------------
       Package Validation
    --------------------------------------------------------- */

    if (values.package) {
      const packageDoc =
        await Package.findById(
          values.package,
        )
          .select("_id status")
          .lean();

      if (!packageDoc) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Selected package does not exist.",
            fieldErrors: {
              package: [
                "Please select a valid package.",
              ],
            },
          },
          { status: 422 },
        );
      }
    }

    /* ---------------------------------------------------------
       Hotel Validation
    --------------------------------------------------------- */

    if (values.hotel) {
      const hotelDoc =
        await Hotel.findById(
          values.hotel,
        )
          .select("_id status")
          .lean();

      if (!hotelDoc) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Selected hotel does not exist.",
            fieldErrors: {
              hotel: [
                "Please select a valid hotel.",
              ],
            },
          },
          { status: 422 },
        );
      }

      if (
        values.status === "active" &&
        hotelDoc.status !== "active"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "An active FAQ cannot belong to a draft hotel.",
            fieldErrors: {
              hotel: [
                "Please select an active hotel.",
              ],
            },
          },
          { status: 422 },
        );
      }
    }

    /* ---------------------------------------------------------
       Create
    --------------------------------------------------------- */

    const faq = await FAQ.create(values);

    /* ---------------------------------------------------------
       Success
    --------------------------------------------------------- */

    return NextResponse.json(
      {
        success: true,
        message:
          "FAQ created successfully.",
        faq: {
          _id: String(faq._id),
          question: faq.question,
          status: faq.status,
          destination:
            faq.destination
              ? String(faq.destination)
              : null,
          package:
            faq.package
              ? String(faq.package)
              : null,
          hotel:
            faq.hotel
              ? String(faq.hotel)
              : null,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error(
      "CREATE_FAQ_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create FAQ. Please try again.",
      },
      { status: 500 },
    );
  }
}