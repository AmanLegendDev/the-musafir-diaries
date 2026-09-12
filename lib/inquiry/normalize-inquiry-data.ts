import type { InquiryInput } from "@/lib/validations/inquiry";

export function normalizeInquiryData(data: InquiryInput) {
  return {
    fullName: data.fullName.trim().replace(/\s+/g, " "),

    phone: data.phone.trim(),

    email: data.email.trim().toLowerCase(),

    destination: data.destination.trim(),

    travelDate: data.travelDate.trim(),

    travelers: Number(data.travelers),

    budget: data.budget?.trim() || "",

    pickupLocation: data.pickupLocation?.trim() || "",

    message: data.message.trim(),
  };
}