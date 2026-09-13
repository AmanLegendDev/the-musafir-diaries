import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";

import Inquiry from "@/models/Inquiry";
import Destination from "@/models/destination.model";

import { inquirySchema } from "@/lib/validations/inquiry";
import { normalizeInquiryData } from "@/lib/inquiry/normalize-inquiry-data";
import { generateInquiryNumber } from "@/lib/inquiry/generate-inquiry-number";

import {
  isValidInquiryStatus,
  type InquiryStatus,
} from "@/lib/inquiry/inquiry-status";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getStartOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

function parseTravelDate(value: string) {
  /*
   * The public form sends YYYY-MM-DD.
   * Construct the date explicitly at local midnight.
   */
  const travelDate = new Date(
    `${value}T00:00:00`,
  );

  if (Number.isNaN(travelDate.getTime())) {
    return null;
  }

  return travelDate;
}

/* -------------------------------------------------------------------------- */
/* GET INQUIRIES — ADMIN LIST                                                 */
/*                                                                            */
/* Supports:                                                                  */
/*                                                                            */
/* /api/inquiries                                                             */
/* /api/inquiries?status=pending                                              */
/* /api/inquiries?status=contacted                                            */
/* /api/inquiries?status=quoted                                               */
/* /api/inquiries?status=confirmed                                            */
/* /api/inquiries?status=cancelled                                            */
/* /api/inquiries?search=aman                                                 */
/*                                                                            */
/* Search fields:                                                             */
/* inquiry number, name, phone, email, destination name                       */
/* -------------------------------------------------------------------------- */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const statusParam =
      searchParams.get("status")?.trim() || "";

    const search =
      searchParams.get("search")?.trim() || "";

    /* ---------------------------------------------------------------------- */
    /* Validate status                                                        */
    /* ---------------------------------------------------------------------- */

    let status: InquiryStatus | undefined;

    if (statusParam) {
      if (!isValidInquiryStatus(statusParam)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid inquiry status.",
          },
          {
            status: 400,
          },
        );
      }

      status = statusParam;
    }

    /* ---------------------------------------------------------------------- */
    /* Build filter                                                           */
    /* ---------------------------------------------------------------------- */

    const filter: Record<string, unknown> = {};

    if (status) {
      filter.status = status;
    }

    /* ---------------------------------------------------------------------- */
    /* Search                                                                 */
    /* ---------------------------------------------------------------------- */

    if (search) {
      const escapedSearch =
        search.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

      const regex = new RegExp(
        escapedSearch,
        "i",
      );

      const matchingDestinations =
        await Destination.find({
          $or: [
            { name: regex },
            { slug: regex },
          ],
        })
          .select("_id")
          .lean();

      const destinationIds =
        matchingDestinations.map(
          (destination) => destination._id,
        );

      filter.$or = [
        { inquiryNumber: regex },
        { fullName: regex },
        { phone: regex },
        { email: regex },
        {
          destination: {
            $in: destinationIds,
          },
        },
      ];
    }

    /* ---------------------------------------------------------------------- */
    /* Fetch inquiries                                                        */
    /* ---------------------------------------------------------------------- */

    const inquiries = await Inquiry.find(filter)
      .populate({
        path: "destination",
        select:
          "_id name slug city state country status",
      })
      .select("-__v")
      .sort({
        createdAt: -1,
      })
      .lean();

    /* ---------------------------------------------------------------------- */
    /* Stats                                                                   */
    /* ---------------------------------------------------------------------- */

    const [
      total,
      pending,
      contacted,
      quoted,
      confirmed,
      cancelled,
    ] = await Promise.all([
      Inquiry.countDocuments({}),
      Inquiry.countDocuments({
        status: "pending",
      }),
      Inquiry.countDocuments({
        status: "contacted",
      }),
      Inquiry.countDocuments({
        status: "quoted",
      }),
      Inquiry.countDocuments({
        status: "confirmed",
      }),
      Inquiry.countDocuments({
        status: "cancelled",
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: inquiries,
        stats: {
          total,
          pending,
          contacted,
          quoted,
          confirmed,
          cancelled,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET INQUIRIES ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch inquiries.",
      },
      {
        status: 500,
      },
    );
  }
}

/* -------------------------------------------------------------------------- */
/* POST INQUIRY — PUBLIC FORM                                                 */
/*                                                                            */
/* IMPORTANT: This preserves the existing public inquiry creation workflow.   */
/* -------------------------------------------------------------------------- */

export async function POST(
  request: Request,
) {
  try {
    await connectDB();

    const body = await request.json();

    const result =
      inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please check the form and try again.",
          errors:
            result.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = normalizeInquiryData(
      result.data,
    );

    /* ---------------------------------------------------------------------- */
    /* Destination ObjectId validation                                        */
    /* ---------------------------------------------------------------------- */

    if (
      !mongoose.isValidObjectId(
        data.destination,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid destination.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Travel date                                                            */
    /* ---------------------------------------------------------------------- */

    const travelDate = parseTravelDate(
      data.travelDate,
    );

    if (!travelDate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a valid travel date.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      travelDate < getStartOfToday()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Travel date cannot be in the past.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Active destination                                                     */
    /* ---------------------------------------------------------------------- */

    const destinationExists =
      await Destination.exists({
        _id: data.destination,
        status: "active",
      });

    if (!destinationExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected destination is unavailable.",
        },
        {
          status: 404,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Inquiry number                                                         */
    /* ---------------------------------------------------------------------- */

    const inquiryNumber =
      await generateInquiryNumber();

    /* ---------------------------------------------------------------------- */
    /* Create inquiry                                                         */
    /* ---------------------------------------------------------------------- */

    const inquiry = await Inquiry.create({
      inquiryNumber,

      fullName: data.fullName,
      phone: data.phone,
      email: data.email,

      destination:
        new mongoose.Types.ObjectId(
          data.destination,
        ),

      travelDate,

      travelers: data.travelers,

      budget: data.budget,
      pickupLocation:
        data.pickupLocation,
      message: data.message,

      status: "pending",
      adminNotes: "",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your inquiry has been received.",
        inquiryId:
          inquiry._id.toString(),
        inquiryNumber:
          inquiry.inquiryNumber,
        status: inquiry.status,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    /* ---------------------------------------------------------------------- */
    /* Duplicate inquiry number                                               */
    /* ---------------------------------------------------------------------- */

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      console.error(
        "Inquiry duplicate-key error:",
        error,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not complete the inquiry right now. Please try again.",
        },
        {
          status: 409,
        },
      );
    }

    console.error(
      "Inquiry submission error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your inquiry. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}