import { NextResponse } from "next/server";

import {
  contactSchema,
  type ContactFormInput,
} from "@/lib/validations/contact.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data: ContactFormInput = parsed.data;

    /*
     * ============================================================
     * CONTACT HANDLER
     * ============================================================
     *
     * This is intentionally kept ready for the real enquiry
     * destination.
     *
     * Later this can connect to:
     * - MongoDB
     * - Resend / email
     * - CRM
     * - WhatsApp workflow
     *
     * Do NOT claim an enquiry has been delivered until one of
     * those integrations is actually configured.
     */

    console.info("[Contact Enquiry]", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      travelDates: data.travelDates,
      travellers: data.travellers,
      message: data.message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Contact API Error]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}