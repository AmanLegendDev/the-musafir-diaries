import { z } from "zod";

export const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Customer name is required."),

  designation: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default(""),

  location: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default(""),

  image: z
    .string()
    .url("Please upload a valid image."),

  rating: z
    .coerce
    .number()
    .min(1)
    .max(5),

  review: z
    .string()
    .trim()
    .min(20, "Review should be at least 20 characters.")
    .max(1000),

  trip: z
    .string()
    .trim()
    .max(150)
    .optional()
    .default(""),

  featured: z.boolean(),

  order: z
    .coerce
    .number()
    .min(0),

  active: z.boolean(),
});