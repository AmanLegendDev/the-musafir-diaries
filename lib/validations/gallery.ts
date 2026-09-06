import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().trim().min(2),

  description: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default(""),

  image: z.string().url(),

  category: z.enum([
    "hero",
    "destination",
    "package",
    "blog",
    "team",
    "testimonial",
    "office",
    "customer",
    "general",
  ]),

  alt: z
    .string()
    .trim()
    .max(150)
    .optional()
    .default(""),

  featured: z.boolean(),

  order: z.coerce.number().min(0),

  active: z.boolean(),
});