import { z } from "zod";

export const destinationSchema =
  z.object({
    name: z.string().min(2),

    slug: z.string().min(2),

    shortDescription: z.string(),

    description: z.string(),

    country: z.string().min(2),

    state: z.string(),

    city: z.string(),

    bestTime: z.string(),

    altitude: z.string(),

    heroImage: z.string(),

    gallery: z.array(z.string()),

    seoTitle: z.string(),

    seoDescription: z.string(),

    status: z.enum([
      "active",
      "inactive",
    ]),
  });