import { z } from "zod";

export const bookingSchema = z
  .object({
    package: z
      .string()
      .min(1, "Please select a package"),

    customerName: z
      .string()
      .trim()
      .min(2, "Name is required")
      .max(100, "Name is too long"),

    phone: z
      .string()
      .trim()
      .min(10, "Please enter a valid phone number")
      .max(20, "Phone number is too long"),

    email: z
      .email("Please enter a valid email address")
      .max(150, "Email is too long"),

    travelDate: z
      .string()
      .min(1, "Travel date is required"),

    adults: z
      .number()
      .int()
      .min(1, "At least one adult is required")
      .max(20, "Maximum 20 adults allowed"),

    childrenCount: z
      .number()
      .int()
      .min(0)
      .max(20, "Maximum 20 children allowed"),

    childrenAges: z
      .array(
        z
          .number()
          .int()
          .min(0)
          .max(17),
      )
      .default([]),

    pickupLocation: z
      .string()
      .trim()
      .min(2, "Pickup location is required")
      .max(150, "Pickup location is too long"),

    specialRequest: z
      .string()
      .trim()
      .max(1000, "Special request is too long")
      .optional(),

    /*
     * Kept temporarily so the existing wizard doesn't break
     * during the redesign.
     *
     * IMPORTANT:
     * The backend NEVER trusts this value.
     */
    totalPrice: z
      .number()
      .nonnegative()
      .optional(),
  })
  .superRefine((data, ctx) => {
    /*
     * Children count and children ages must always match.
     */
    if (data.childrenCount === 0) {
      if (data.childrenAges.length > 0) {
        ctx.addIssue({
          code: "custom",
          path: ["childrenAges"],
          message: "Children ages should be empty when there are no children.",
        });
      }

      return;
    }

    if (data.childrenAges.length !== data.childrenCount) {
      ctx.addIssue({
        code: "custom",
        path: ["childrenAges"],
        message: "Please provide the age of every child.",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;