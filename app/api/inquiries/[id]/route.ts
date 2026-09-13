import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

import {
  canTransitionInquiryStatus,
  isValidInquiryStatus,
  type InquiryStatus,
} from "@/lib/inquiry/inquiry-status";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

interface PopulatedDestination {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  city?: string;
  state?: string;
  country?: string;
  status?: string;
}

function invalidIdResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid inquiry reference.",
    },
    {
      status: 400,
    },
  );
}

/* -------------------------------------------------------------------------- */
/* GET SINGLE INQUIRY                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    const inquiry = await Inquiry.findById(id)
      .populate({
        path: "destination",
        select:
          "_id name slug city state country status",
      })
      .select("-__v")
      .lean();

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        {
          status: 404,
        },
      );
    }

    const destination =
      inquiry.destination as unknown as
        | PopulatedDestination
        | null;

    return NextResponse.json(
      {
        success: true,

        data: {
          _id: inquiry._id.toString(),

          inquiryNumber:
            inquiry.inquiryNumber,

          fullName: inquiry.fullName,
          phone: inquiry.phone,
          email: inquiry.email,

          destination: destination
            ? {
                _id:
                  destination._id.toString(),
                name: destination.name,
                slug: destination.slug,
                city:
                  destination.city ?? "",
                state:
                  destination.state ?? "",
                country:
                  destination.country ?? "",
                status:
                  destination.status ??
                  "",
              }
            : null,

          travelDate:
            inquiry.travelDate,

          travelers:
            inquiry.travelers,

          budget:
            inquiry.budget ?? "",

          pickupLocation:
            inquiry.pickupLocation ?? "",

          message:
            inquiry.message,

          status:
            inquiry.status,

          adminNotes:
            inquiry.adminNotes ?? "",

          createdAt:
            inquiry.createdAt,

          updatedAt:
            inquiry.updatedAt,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET INQUIRY ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while loading the inquiry.",
      },
      {
        status: 500,
      },
    );
  }
}

/* -------------------------------------------------------------------------- */
/* PATCH SINGLE INQUIRY                                                        */
/*                                                                            */
/* Exactly ONE controlled update:                                             */
/*                                                                            */
/* { status: "contacted" }                                                    */
/*                                                                            */
/* OR                                                                         */
/*                                                                            */
/* { adminNotes: "Customer prefers Volvo." }                                 */
/* -------------------------------------------------------------------------- */

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    const body = await request.json();

    const hasStatus =
      body &&
      Object.prototype.hasOwnProperty.call(
        body,
        "status",
      );

    const hasAdminNotes =
      body &&
      Object.prototype.hasOwnProperty.call(
        body,
        "adminNotes",
      );

    /* ---------------------------------------------------------------------- */
    /* Exactly one controlled field                                           */
    /* ---------------------------------------------------------------------- */

    if (
      Number(hasStatus) +
        Number(hasAdminNotes) !==
      1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Provide exactly one field to update: status or adminNotes.",
        },
        {
          status: 400,
        },
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Find inquiry                                                           */
    /* ---------------------------------------------------------------------- */

    const inquiry =
      await Inquiry.findById(id);

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* ====================================================================== */
    /* STATUS UPDATE                                                          */
    /* ====================================================================== */

    if (hasStatus) {
      const nextStatus =
        body.status as InquiryStatus;

      if (
        !isValidInquiryStatus(
          nextStatus,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid inquiry status.",
          },
          {
            status: 400,
          },
        );
      }

      const currentStatus =
        inquiry.status as InquiryStatus;

      /* -------------------------------------------------------------------- */
      /* Same status is not a transition                                     */
      /* -------------------------------------------------------------------- */

      if (
        currentStatus ===
        nextStatus
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              `Inquiry is already "${currentStatus}".`,
          },
          {
            status: 409,
          },
        );
      }

      /* -------------------------------------------------------------------- */
      /* Server-side lifecycle enforcement                                   */
      /* -------------------------------------------------------------------- */

      if (
        !canTransitionInquiryStatus(
          currentStatus,
          nextStatus,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              `Inquiry cannot move from "${currentStatus}" to "${nextStatus}".`,
          },
          {
            status: 409,
          },
        );
      }

      inquiry.status =
        nextStatus;

      await inquiry.save();

      const updatedInquiry =
        await Inquiry.findById(id)
          .populate({
            path: "destination",
            select:
              "_id name slug city state country status",
          })
          .select("-__v")
          .lean();

      return NextResponse.json(
        {
          success: true,
          message:
            `Inquiry ${nextStatus} successfully.`,
          data: updatedInquiry,
        },
        {
          status: 200,
        },
      );
    }

    /* ====================================================================== */
    /* ADMIN NOTES UPDATE                                                     */
    /* ====================================================================== */

    if (
      typeof body.adminNotes !==
      "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin notes must be a text value.",
        },
        {
          status: 400,
        },
      );
    }

    const adminNotes =
      body.adminNotes.trim();

    if (adminNotes.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin notes cannot exceed 2000 characters.",
        },
        {
          status: 400,
        },
      );
    }

    inquiry.adminNotes =
      adminNotes;

    await inquiry.save();

    const updatedInquiry =
      await Inquiry.findById(id)
        .populate({
          path: "destination",
          select:
            "_id name slug city state country status",
        })
        .select("-__v")
        .lean();

    return NextResponse.json(
      {
        success: true,
        message:
          "Admin notes saved successfully.",
        data: updatedInquiry,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "UPDATE INQUIRY ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update inquiry.",
      },
      {
        status: 500,
      },
    );
  }
}