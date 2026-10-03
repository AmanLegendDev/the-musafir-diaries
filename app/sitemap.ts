import type { MetadataRoute } from "next";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";
import Blog from "@/models/blog.model";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const BASE_URL = SITE_URL.replace(/\/$/, "");

/* =========================================================
   STATIC ROUTES
========================================================= */

const STATIC_ROUTES = [
  {
    path: "",
    changeFrequency: "weekly" as const,
    priority: 1,
  },

  {
    path: "/destinations",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },

  {
    path: "/packages",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },

  {
    path: "/hotels",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },

  {
    path: "/gallery",
    changeFrequency: "weekly" as const,
    priority: 0.7,
  },

  {
    path: "/blog",
    changeFrequency: "daily" as const,
    priority: 0.9,
  },

  {
    path: "/testimonials",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },

  {
    path: "/faqs",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },

  {
    path: "/about",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },

  {
    path: "/contact",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },

  {
    path: "/inquiry",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },

  {
    path: "/booking",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },

  {
    path: "/privacy-policy",
    changeFrequency: "yearly" as const,
    priority: 0.2,
  },

  {
    path: "/terms-and-conditions",
    changeFrequency: "yearly" as const,
    priority: 0.2,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function createUrl(path: string) {
  return `${BASE_URL}${path}`;
}

/* =========================================================
   SITEMAP
========================================================= */

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  /*
   * -------------------------------------------------------
   * Database connection
   * -------------------------------------------------------
   */

  await connectDB();

  /*
   * -------------------------------------------------------
   * Fetch all indexable CMS content in parallel
   * -------------------------------------------------------
   *
   * Only active/published content is included.
   * Admin/draft/inactive content must never enter
   * the public sitemap.
   * -------------------------------------------------------
   */

  const [
    destinations,
    packages,
    hotels,
    blogs,
  ] = await Promise.all([
    Destination.find({
      status: "active",
      slug: {
        $exists: true,
        $ne: "",
      },
    })
      .select("slug updatedAt createdAt")
      .lean(),

    Package.find({
      status: "active",
      slug: {
        $exists: true,
        $ne: "",
      },
    })
      .select("slug updatedAt createdAt")
      .lean(),

    Hotel.find({
      status: "active",
      slug: {
        $exists: true,
        $ne: "",
      },
    })
      .select("slug updatedAt createdAt")
      .lean(),

    Blog.find({
      status: "published",
      slug: {
        $exists: true,
        $ne: "",
      },
    })
      .select("slug updatedAt createdAt")
      .lean(),
  ]);

  /*
   * -------------------------------------------------------
   * Static pages
   * -------------------------------------------------------
   */

  const staticUrls: MetadataRoute.Sitemap =
    STATIC_ROUTES.map((route) => ({
      url: createUrl(route.path),

      changeFrequency:
        route.changeFrequency,

      priority: route.priority,
    }));

  /*
   * -------------------------------------------------------
   * Destination pages
   * -------------------------------------------------------
   */

  const destinationUrls: MetadataRoute.Sitemap =
    destinations
      .filter(
        (destination) =>
          Boolean(destination.slug),
      )
      .map((destination) => ({
        url: createUrl(
          `/destinations/${encodeURIComponent(
            destination.slug,
          )}`,
        ),

        lastModified:
          destination.updatedAt ||
          destination.createdAt,

        changeFrequency: "weekly" as const,

        priority: 0.85,
      }));

  /*
   * -------------------------------------------------------
   * Package pages
   * -------------------------------------------------------
   */

  const packageUrls: MetadataRoute.Sitemap =
    packages
      .filter(
        (pkg) =>
          Boolean(pkg.slug),
      )
      .map((pkg) => ({
        url: createUrl(
          `/packages/${encodeURIComponent(
            pkg.slug,
          )}`,
        ),

        lastModified:
          pkg.updatedAt ||
          pkg.createdAt,

        changeFrequency: "weekly" as const,

        priority: 0.85,
      }));

  /*
   * -------------------------------------------------------
   * Hotel pages
   * -------------------------------------------------------
   */

  const hotelUrls: MetadataRoute.Sitemap =
    hotels
      .filter(
        (hotel) =>
          Boolean(hotel.slug),
      )
      .map((hotel) => ({
        url: createUrl(
          `/hotels/${encodeURIComponent(
            hotel.slug,
          )}`,
        ),

        lastModified:
          hotel.updatedAt ||
          hotel.createdAt,

        changeFrequency: "monthly" as const,

        priority: 0.7,
      }));

  /*
   * -------------------------------------------------------
   * Blog pages
   * -------------------------------------------------------
   */

  const blogUrls: MetadataRoute.Sitemap =
    blogs
      .filter(
        (blog) =>
          Boolean(blog.slug),
      )
      .map((blog) => ({
        url: createUrl(
          `/blog/${encodeURIComponent(
            blog.slug,
          )}`,
        ),

        lastModified:
          blog.updatedAt ||
          blog.createdAt,

        changeFrequency: "monthly" as const,

        priority: 0.8,
      }));

  /*
   * -------------------------------------------------------
   * Final sitemap
   * -------------------------------------------------------
   *
   * Static + destinations + packages + hotels + blogs
   * -------------------------------------------------------
   */

  return [
    ...staticUrls,
    ...destinationUrls,
    ...packageUrls,
    ...hotelUrls,
    ...blogUrls,
  ];
}