import { z } from "zod";

export const packageSchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  shortDescription: z.string(),

  description: z.string(),

  category: z.string(),

  destination: z.string(),

  heroImage: z.string(),

  gallery: z.array(z.string()),

  duration: z.string(),

  difficulty: z.enum([
    "easy",
    "moderate",
    "difficult",
  ]),

  groupSize: z.string(),

  originalPrice: z.number(),

  discountedPrice: z.number(),

  childPolicy: z.object({
  complimentaryBelow: z.number(),
  halfPriceBelow: z.number(),
  halfPricePercentage: z.number(),
}),

  highlights: z.array(z.string()),

  included: z.array(z.string()),

  excluded: z.array(z.string()),

  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
    })
  ),

  seoTitle: z.string(),

  seoDescription: z.string(),

  featured: z.boolean(),

  status: z.enum([
    "active",
    "inactive",
  ]),
});