
import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name is too long."),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number.",
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email address is too long."),

  destination: z
  .string()
  .trim()
  .min(1, "Please select a destination."),

  travelDate: z
    .string()
    .trim()
    .min(1, "Travel date is required.")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please select a valid travel date.",
    ),

travelers: z
  .number()
  .int("Number of travellers must be a whole number.")
  .min(1, "Minimum 1 traveller is required.")
  .max(50, "Maximum 50 travellers are allowed."),

  budget: z
    .string()
    .trim()
    .max(100, "Budget information is too long.")
    .optional()
    .or(z.literal("")),

  pickupLocation: z
    .string()
    .trim()
    .max(100, "Pickup location is too long.")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(1000, "Message is too long."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;