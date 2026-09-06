import { z } from "zod";

export const destinationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Destination name must be at least 3 characters.")
    .max(100, "Destination name cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers and hyphens."
    ),

  shortDescription: z
    .string()
    .trim()
    .min(20, "Short description must be at least 20 characters.")
    .max(250, "Short description cannot exceed 250 characters."),

  description: z
    .string()
    .trim()
    .min(50, "Description must be at least 50 characters."),

  country: z
    .string()
    .trim()
    .min(2, "Country is required."),

  state: z
    .string()
    .trim()
    .min(2, "State is required."),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  bestTime: z
    .string()
    .trim()
    .min(2, "Best time is required."),

  altitude: z
    .string()
    .trim()
    .min(1, "Altitude is required."),

  heroImage: z
    .string()
    .trim()
    .url("Hero image must be a valid URL."),

  gallery: z
    .array(z.string().url("Gallery image must be a valid URL."))
    .min(1, "At least one gallery image is required."),
startingPrice: z
  .number()
  .min(0, "Starting price cannot be negative."),

  duration: z
    .string()
    .trim()
    .min(2, "Duration is required."),

 rating: z
  .number()
  .min(0)
  .max(5),

reviewCount: z
  .number()
  .min(0),

  featured: z.boolean(),

featuredOrder: z
  .number()
  .min(0),

  seoTitle: z
    .string()
    .trim()
    .min(10, "SEO title must be at least 10 characters.")
    .max(60, "SEO title should not exceed 60 characters."),

  seoDescription: z
    .string()
    .trim()
    .min(50, "SEO description must be at least 50 characters.")
    .max(160, "SEO description should not exceed 160 characters."),

  status: z.enum(["active", "draft"]),
});

export type DestinationValidator = z.infer<typeof destinationSchema>;