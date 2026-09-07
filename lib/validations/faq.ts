import { z } from "zod";

/* =========================================================
   HELPERS
   ========================================================= */

const objectIdSchema = z
  .string()
  .trim()
  .regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ID.",
  );

/* =========================================================
   FAQ BASE SCHEMA
   ========================================================= */

const faqBaseSchema = z.object({
  /* ---------------------------------------------------------
     Content
  --------------------------------------------------------- */

  question: z
    .string()
    .trim()
    .min(
      5,
      "Question must be at least 5 characters.",
    )
    .max(
      300,
      "Question cannot exceed 300 characters.",
    ),

  answer: z
    .string()
    .trim()
    .min(
      10,
      "Answer must be at least 10 characters.",
    )
    .max(
      5000,
      "Answer cannot exceed 5,000 characters.",
    ),

  /* ---------------------------------------------------------
     Relationships
  --------------------------------------------------------- */

  destination: objectIdSchema.nullable(),

  package: objectIdSchema.nullable(),

  hotel: objectIdSchema.nullable(),

  /* ---------------------------------------------------------
     Category
  --------------------------------------------------------- */

  category: z
    .string()
    .trim()
    .max(
      100,
      "Category cannot exceed 100 characters.",
    ),

  /* ---------------------------------------------------------
     CMS
  --------------------------------------------------------- */

  featured: z.boolean(),

  displayOrder: z
    .number()
    .int(
      "Display order must be a whole number.",
    )
    .min(
      0,
      "Display order cannot be negative.",
    ),

  status: z.enum([
    "active",
    "draft",
  ]),

  /* ---------------------------------------------------------
     SEO
  --------------------------------------------------------- */

  seoTitle: z
    .string()
    .trim()
    .max(
      60,
      "SEO title cannot exceed 60 characters.",
    ),

  seoDescription: z
    .string()
    .trim()
    .max(
      160,
      "SEO description cannot exceed 160 characters.",
    ),
});

/* =========================================================
   CREATE FAQ SCHEMA
   ========================================================= */

export const faqSchema = faqBaseSchema
  .refine(
    (data) => {
      const relationCount = [
        data.destination,
        data.package,
        data.hotel,
      ].filter(Boolean).length;

      return relationCount <= 1;
    },
    {
      message:
        "FAQ can belong to only one destination, package, or hotel.",
      path: ["destination"],
    },
  )
  .refine(
    (data) => {
      if (data.status !== "active") {
        return true;
      }

      return (
        data.seoTitle.length >= 10 &&
        data.seoDescription.length >= 50
      );
    },
    {
      message:
        "Active FAQs must have a proper SEO title and SEO description.",
      path: ["seoTitle"],
    },
  );

/* =========================================================
   TYPES
   ========================================================= */

export type FAQValidator =
  z.infer<typeof faqSchema>;

/* =========================================================
   UPDATE SCHEMA
   ========================================================= */

export const faqUpdateSchema =
  faqBaseSchema.partial();

export type FAQUpdateValidator =
  z.infer<typeof faqUpdateSchema>;