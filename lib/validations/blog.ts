import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3),

  slug: z.string().min(3),

  excerpt: z.string().min(10),

  content: z.string().min(20),

  featuredImage: z.string().url(),

  category: z.string().min(1),

  author: z.string().min(2),

  tags: z.array(z.string()),

  readTime: z.coerce.number().min(1),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  featured: z.boolean(),

  status: z.enum([
    "draft",
    "published",
  ]),
});