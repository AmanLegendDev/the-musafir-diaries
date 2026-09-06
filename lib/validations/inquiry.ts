import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(100),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid mobile number."
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  destination: z
    .string()
    .min(1, "Please select a destination."),

  travelDate: z
    .string()
    .min(1, "Travel date is required."),

  travelers: z.coerce
    .number()
    .min(1, "Minimum 1 traveler is required.")
    .max(50),

  budget: z
    .string()
    .trim()
    .optional(),

  pickupLocation: z
    .string()
    .trim()
    .max(100)
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(1000),
});

export type InquiryInput = z.infer<
  typeof inquirySchema
>;