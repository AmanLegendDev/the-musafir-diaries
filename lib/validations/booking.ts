import { z } from "zod";

export const bookingSchema = z.object({
  package: z.string().min(1, "Please select a package"),

  customerName: z
    .string()
    .min(2, "Name is required")
    .max(100),

  phone: z
    .string()
    .min(10)
    .max(15),

  email: z.email(),

  travelDate: z.string().min(1, "Travel date is required"),

  adults: z.number().min(1).max(20),

  childrenCount: z.number().min(0).max(20),

  childrenAges: z.array(z.number()).optional(),

  pickupLocation: z
    .string()
    .min(2)
    .max(100),

  specialRequest: z
    .string()
    .max(1000)
    .optional(),

  totalPrice: z.number(),
});