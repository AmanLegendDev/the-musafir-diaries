
import type { MetadataRoute } from "next";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com"
).replace(/\/+$/, "");

/* =========================================================
   ROBOTS.TXT
========================================================= */

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.NODE_ENV === "production" &&
    new URL(SITE_URL).hostname ===
      "www.themusafirdiaries.com";

  /*
   * Prevent staging and preview environments
   * from being crawled.
   *
   * NOTE: Production robots.txt does not
   * protect staging sites. Use authentication
   * for private preview deployments.
   */

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          // Admin dashboard
          "/admin",
          "/admin/",

          // Internal API endpoints
          "/api/",

          // Next.js internal assets
          "/_next/data/",

          // Authentication routes
          "/login",
          "/register",

          // Internal search results
          "/search",
        ],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,

    host: new URL(SITE_URL).host,
  };
}