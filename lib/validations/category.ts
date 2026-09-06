import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required"),

  slug: z
    .string()
    .min(2),

  description: z.string(),

  displayOrder: z.number(),

  status: z.enum([
    "active",
    "inactive",
  ]),

  seoTitle: z.string(),

  seoDescription: z.string(),
});