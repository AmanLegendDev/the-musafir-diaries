import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              HELPER SCHEMAS                                */
/* -------------------------------------------------------------------------- */

/**
 * MongoDB ObjectId
 *
 * We keep this as a string here because the form/API receives
 * ObjectIds as strings. Mongoose will handle the actual ObjectId
 * conversion when creating the document.
 */
const objectIdSchema = z
  .string()
  .trim()
  .regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid destination ID."
  );

/**
 * Image URL
 *
 * Supports:
 * - Cloudinary / external HTTPS URLs
 * - HTTP URLs for local development
 * - local public paths such as /images/hotels/hotel.jpg
 */
const imageUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (value.startsWith("/")) {
        return value.length > 1;
      }

      try {
        const url = new URL(value);

        return (
          url.protocol === "https:" ||
          url.protocol === "http:"
        );
      } catch {
        return false;
      }
    },
    {
      message:
        "Please provide a valid image URL or image path.",
    }
  );

/* -------------------------------------------------------------------------- */
/*                              ROOM TYPE                                     */
/* -------------------------------------------------------------------------- */

export const hotelRoomTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Room type name must be at least 2 characters."
    )
    .max(
      100,
      "Room type name cannot exceed 100 characters."
    ),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Room description cannot exceed 500 characters."
    ),

  occupancy: z
    .string()
    .trim()
    .max(
      100,
      "Occupancy cannot exceed 100 characters."
    ),

  bedType: z
    .string()
    .trim()
    .max(
      100,
      "Bed type cannot exceed 100 characters."
    ),
});

/* -------------------------------------------------------------------------- */
/*                              POLICIES                                      */
/* -------------------------------------------------------------------------- */

export const hotelPoliciesSchema = z.object({
  checkIn: z
    .string()
    .trim()
    .max(
      100,
      "Check-in information cannot exceed 100 characters."
    ),

  checkOut: z
    .string()
    .trim()
    .max(
      100,
      "Check-out information cannot exceed 100 characters."
    ),

  cancellation: z
    .string()
    .trim()
    .max(
      1000,
      "Cancellation policy cannot exceed 1000 characters."
    ),

  childPolicy: z
    .string()
    .trim()
    .max(
      1000,
      "Child policy cannot exceed 1000 characters."
    ),

  other: z
    .string()
    .trim()
    .max(
      1000,
      "Other policy information cannot exceed 1000 characters."
    ),
});

/* -------------------------------------------------------------------------- */
/*                              HOTEL SCHEMA                                  */
/* -------------------------------------------------------------------------- */

export const hotelSchema = z
  .object({
    /* ---------------------------------------------------------------------- */
    /* Identity                                                               */
    /* ---------------------------------------------------------------------- */

    name: z
      .string()
      .trim()
      .min(
        3,
        "Hotel name must be at least 3 characters."
      )
      .max(
        150,
        "Hotel name cannot exceed 150 characters."
      ),

    slug: z
      .string()
      .trim()
      .min(3, "Slug is required.")
      .max(
        180,
        "Slug cannot exceed 180 characters."
      )
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain only lowercase letters, numbers and single hyphens."
      ),

    /* ---------------------------------------------------------------------- */
    /* Destination                                                            */
    /* ---------------------------------------------------------------------- */

    destination: objectIdSchema,

    /* ---------------------------------------------------------------------- */
    /* Location                                                               */
    /* ---------------------------------------------------------------------- */

    area: z
      .string()
      .trim()
      .max(
        150,
        "Area cannot exceed 150 characters."
      ),

    address: z
      .string()
      .trim()
      .max(
        300,
        "Address cannot exceed 300 characters."
      ),

    city: z
      .string()
      .trim()
      .max(
        100,
        "City cannot exceed 100 characters."
      ),

    state: z
      .string()
      .trim()
      .max(
        100,
        "State cannot exceed 100 characters."
      ),

    country: z
      .string()
      .trim()
      .min(2, "Country is required.")
      .max(
        100,
        "Country cannot exceed 100 characters."
      ),

    /* ---------------------------------------------------------------------- */
    /* Classification                                                         */
    /* ---------------------------------------------------------------------- */

    starRating: z
      .number()
      .int("Star rating must be a whole number.")
      .min(
        1,
        "Star rating must be at least 1."
      )
      .max(
        5,
        "Star rating cannot exceed 5."
      ),

    hotelType: z.enum([
      "hotel",
      "resort",
      "boutique",
      "homestay",
      "villa",
      "guesthouse",
      "camp",
      "other",
    ]),

    /* ---------------------------------------------------------------------- */
    /* Content                                                                */
    /* ---------------------------------------------------------------------- */

    shortDescription: z
      .string()
      .trim()
      .min(
        20,
        "Short description must be at least 20 characters."
      )
      .max(
        300,
        "Short description cannot exceed 300 characters."
      ),

    description: z
      .string()
      .trim()
      .min(
        50,
        "Hotel description must be at least 50 characters."
      )
      .max(
        10000,
        "Hotel description cannot exceed 10,000 characters."
      ),

    /* ---------------------------------------------------------------------- */
    /* Images                                                                 */
    /* ---------------------------------------------------------------------- */

    heroImage: imageUrlSchema,

    gallery: z
      .array(imageUrlSchema)
      .max(
        30,
        "Hotel gallery cannot contain more than 30 images."
      )
      .refine(
        (images) =>
          new Set(images).size === images.length,
        {
          message:
            "Duplicate gallery images are not allowed.",
        }
      ),

    /* ---------------------------------------------------------------------- */
    /* Rooms                                                                  */
    /* ---------------------------------------------------------------------- */

    roomTypes: z
      .array(hotelRoomTypeSchema)
      .max(
        20,
        "A hotel cannot have more than 20 room types."
      ),

    /* ---------------------------------------------------------------------- */
    /* Amenities                                                              */
    /* ---------------------------------------------------------------------- */

    amenities: z
      .array(
        z
          .string()
          .trim()
          .min(
            2,
            "Amenity cannot be empty."
          )
          .max(
            80,
            "Amenity cannot exceed 80 characters."
          )
      )
      .max(
        50,
        "A hotel cannot have more than 50 amenities."
      )
      .refine(
        (items) =>
          new Set(
            items.map((item) =>
              item.toLowerCase()
            )
          ).size === items.length,
        {
          message:
            "Duplicate amenities are not allowed.",
        }
      ),

    /* ---------------------------------------------------------------------- */
    /* Policies                                                               */
    /* ---------------------------------------------------------------------- */

    policies: hotelPoliciesSchema,

    /* ---------------------------------------------------------------------- */
    /* Real Guest Rating                                                      */
    /* ---------------------------------------------------------------------- */

    guestRating: z
      .number()
      .min(
        0,
        "Guest rating cannot be negative."
      )
      .max(
        5,
        "Guest rating cannot exceed 5."
      )
      .nullable(),

    reviewCount: z
      .number()
      .int(
        "Review count must be a whole number."
      )
      .min(
        0,
        "Review count cannot be negative."
      ),

    /* ---------------------------------------------------------------------- */
    /* CMS                                                                    */
    /* ---------------------------------------------------------------------- */

    featured: z.boolean(),

    displayOrder: z
      .number()
      .int(
        "Display order must be a whole number."
      )
      .min(
        0,
        "Display order cannot be negative."
      ),

    status: z.enum([
      "active",
      "draft",
    ]),

    /* ---------------------------------------------------------------------- */
    /* SEO                                                                    */
    /* ---------------------------------------------------------------------- */

    seoTitle: z
      .string()
      .trim()
      .max(
        60,
        "SEO title cannot exceed 60 characters."
      ),

    seoDescription: z
      .string()
      .trim()
      .max(
        160,
        "SEO description cannot exceed 160 characters."
      ),
  })

  /* ------------------------------------------------------------------------ */
  /* Cross-field validation                                                   */
  /* ------------------------------------------------------------------------ */

  .refine(
    (data) => {
      if (
        data.guestRating === null
      ) {
        return data.reviewCount === 0;
      }

      return data.reviewCount > 0;
    },
    {
      message:
        "Provide a guest rating only when real reviews are available.",
      path: ["guestRating"],
    }
  )

  .refine(
    (data) => {
      if (data.status !== "active") {
        return true;
      }

      return (
        data.heroImage.length > 0 &&
        data.gallery.length > 0
      );
    },
    {
      message:
        "An active hotel must have a hero image and at least one gallery image.",
      path: ["heroImage"],
    }
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
        "Active hotels must have a proper SEO title and SEO description.",
      path: ["seoTitle"],
    }
  );

/* -------------------------------------------------------------------------- */
/*                              INFERRED TYPE                                 */
/* -------------------------------------------------------------------------- */

export type HotelValidator = z.infer<
  typeof hotelSchema
>;

/* -------------------------------------------------------------------------- */
/*                         PARTIAL UPDATE SCHEMA                              */
/* -------------------------------------------------------------------------- */

/**
 * Useful for admin edit/update APIs.
 *
 * Important:
 * hotelSchema contains cross-field refinements, so Zod 4
 * does not allow calling .partial() directly on hotelSchema.
 *
 * We therefore derive the update schema from the underlying
 * object shape and keep the update payload field-optional.
 */

const hotelUpdateBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Hotel name must be at least 3 characters.")
    .max(150, "Hotel name cannot exceed 150 characters."),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .max(180, "Slug cannot exceed 180 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and single hyphens.",
    ),

  destination: objectIdSchema,

  area: z
    .string()
    .trim()
    .max(150, "Area cannot exceed 150 characters."),

  address: z
    .string()
    .trim()
    .max(300, "Address cannot exceed 300 characters."),

  city: z
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters."),

  state: z
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters."),

  country: z
    .string()
    .trim()
    .min(2, "Country is required.")
    .max(100, "Country cannot exceed 100 characters."),

  starRating: z
    .number()
    .int("Star rating must be a whole number.")
    .min(1, "Star rating must be at least 1.")
    .max(5, "Star rating cannot exceed 5."),

  hotelType: z.enum([
    "hotel",
    "resort",
    "boutique",
    "homestay",
    "villa",
    "guesthouse",
    "camp",
    "other",
  ]),

  shortDescription: z
    .string()
    .trim()
    .min(20, "Short description must be at least 20 characters.")
    .max(300, "Short description cannot exceed 300 characters."),

  description: z
    .string()
    .trim()
    .min(50, "Hotel description must be at least 50 characters.")
    .max(10000, "Hotel description cannot exceed 10,000 characters."),

  heroImage: imageUrlSchema,

  gallery: z
    .array(imageUrlSchema)
    .max(
      30,
      "Hotel gallery cannot contain more than 30 images.",
    ),

  roomTypes: z
    .array(hotelRoomTypeSchema)
    .max(
      20,
      "A hotel cannot have more than 20 room types.",
    ),

  amenities: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Amenity cannot be empty.")
        .max(80, "Amenity cannot exceed 80 characters."),
    )
    .max(
      50,
      "A hotel cannot have more than 50 amenities.",
    ),

  policies: hotelPoliciesSchema,

  guestRating: z
    .number()
    .min(0, "Guest rating cannot be negative.")
    .max(5, "Guest rating cannot exceed 5.")
    .nullable(),

  reviewCount: z
    .number()
    .int("Review count must be a whole number.")
    .min(0, "Review count cannot be negative."),

  featured: z.boolean(),

  displayOrder: z
    .number()
    .int("Display order must be a whole number.")
    .min(0, "Display order cannot be negative."),

  status: z.enum([
    "active",
    "draft",
  ]),

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

export const hotelUpdateSchema =
  hotelUpdateBaseSchema.partial();

export type HotelUpdateValidator =
  z.infer<typeof hotelUpdateSchema>;