import type { Metadata } from "next";

import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import TestimonialsIntro from "@/components/testimonials/TestimonialsIntro";
import FeaturedTestimonials from "@/components/testimonials/FeaturedTestimonials";
import TestimonialRatingStrip from "@/components/testimonials/TestimonialRatingStrip";
import TestimonialsListing from "@/components/testimonials/TestimonialsListing";
import TestimonialsCTA from "@/components/testimonials/TestimonialsCTA";

import {
  getActiveTestimonials,
  getFeaturedTestimonials,
} from "@/lib/queries/testimonial.queries";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const TESTIMONIALS_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/testimonials`;

const TESTIMONIALS_IMAGE = `${SITE_URL.replace(
  /\/$/,
  "",
)}/images/home/hero/himalayan-hero.webp`;

const SITE_LOGO = `${SITE_URL.replace(
  /\/$/,
  "",
)}/icon-512.png`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "Guest Stories & Travel Experiences | The Musafir Diaries",

  description:
    "Read traveller stories, experiences and memories shared by guests who explored Himalayan destinations and journeys with The Musafir Diaries.",

  keywords: [
    "The Musafir Diaries reviews",
    "The Musafir Diaries testimonials",
    "Himachal travel reviews",
    "Himachal tour reviews",
    "Himalayan travel experiences",
    "Himachal trip experiences",
    "Traveller stories Himachal",
    "Himalayan travel reviews",
    "Guest travel stories",
  ],

  alternates: {
    canonical: TESTIMONIALS_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Guest Stories & Travel Experiences | The Musafir Diaries",

    description:
      "Discover traveller experiences and memories from journeys with The Musafir Diaries.",

    url: TESTIMONIALS_URL,

    images: [
      {
        url: TESTIMONIALS_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — guest travel stories",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Guest Stories | The Musafir Diaries",

    description:
      "Real traveller stories and experiences from journeys with The Musafir Diaries.",

    images: [TESTIMONIALS_IMAGE],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   PAGE
========================================================= */

export default async function TestimonialsPage() {
  /*
   * -------------------------------------------------------
   * Fetch testimonials in parallel
   * -------------------------------------------------------
   */

  const [
    testimonials,
    featuredTestimonials,
  ] = await Promise.all([
    getActiveTestimonials(),
    getFeaturedTestimonials(4),
  ]);

  /*
   * -------------------------------------------------------
   * Testimonial collection items
   * -------------------------------------------------------
   *
   * We only use actual CMS testimonial data.
   * No fake reviews, ratings or author information
   * are generated here.
   */

  const testimonialItems = testimonials
    .filter(
      (testimonial: {
        _id?: unknown;
        name?: string;
        review?: string;
      }) =>
        Boolean(
          testimonial.name &&
          testimonial.review,
        ),
    )
    .map(
      (
        testimonial: {
          _id?: unknown;
          name?: string;
          review?: string;
          location?: string;
          trip?: string;
          rating?: number;
        },
        index: number,
      ) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
          "@type": "Review",

          ...(testimonial._id
            ? {
                "@id": `${TESTIMONIALS_URL}#review-${String(
                  testimonial._id,
                )}`,
              }
            : {}),

          ...(testimonial.review
            ? {
                reviewBody:
                  testimonial.review,
              }
            : {}),

          ...(testimonial.name
            ? {
                author: {
                  "@type": "Person",

                  name:
                    testimonial.name,
                },
              }
            : {}),

          ...(testimonial.rating
            ? {
                reviewRating: {
                  "@type":
                    "Rating",

                  ratingValue:
                    testimonial.rating,

                  bestRating: 5,

                  worstRating: 1,
                },
              }
            : {}),

          ...(testimonial.location
            ? {
                contentLocation: {
                  "@type":
                    "Place",

                  name:
                    testimonial.location,
                },
              }
            : {}),

          ...(testimonial.trip
            ? {
                itemReviewed: {
                  "@type":
                    "TouristTrip",

                  name:
                    testimonial.trip,
                },
              }
            : {}),
        },
      }),
    );

  /*
   * -------------------------------------------------------
   * CollectionPage schema
   * -------------------------------------------------------
   */

  const collectionPageSchema = {
    "@type":
      "CollectionPage",

    "@id":
      `${TESTIMONIALS_URL}#webpage`,

    name:
      "Guest Stories | The Musafir Diaries",

    description:
      "Traveller stories and experiences from The Musafir Diaries.",

    url: TESTIMONIALS_URL,

    isPartOf: {
      "@type":
        "WebSite",

      "@id":
        `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type":
        "ImageObject",

      url: TESTIMONIALS_IMAGE,
    },

    ...(testimonialItems.length > 0
      ? {
          mainEntity: {
            "@type":
              "ItemList",

            "@id":
              `${TESTIMONIALS_URL}#reviews`,

            name:
              "Guest Travel Stories",

            numberOfItems:
              testimonialItems.length,

            itemListElement:
              testimonialItems,
          },
        }
      : {}),

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * WebSite schema
   * -------------------------------------------------------
   */

  const websiteSchema = {
    "@type": "WebSite",

    "@id":
      `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,

    publisher: {
      "@type":
        "Organization",

      "@id":
        `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: {
        "@type":
          "ImageObject",

        url: SITE_LOGO,

        width: 512,

        height: 512,
      },
    },

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * Breadcrumb schema
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id":
      `${TESTIMONIALS_URL}#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name: "Home",

        item: SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name: "Guest Stories",

        item: TESTIMONIALS_URL,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * Combined structured data
   * -------------------------------------------------------
   */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      websiteSchema,
      collectionPageSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      {/* =====================================================
          TESTIMONIALS PAGE
      ====================================================== */}

      <main>
        {/* ===================================================
            HERO
        ==================================================== */}

        <TestimonialsHero />

        {/* ===================================================
            INTRO
        ==================================================== */}

        <TestimonialsIntro />

        {/* ===================================================
            FEATURED TESTIMONIALS
        ==================================================== */}

        {featuredTestimonials.length >
          0 && (
          <FeaturedTestimonials
            testimonials={
              featuredTestimonials
            }
          />
        )}

        {/* ===================================================
            RATING STRIP
        ==================================================== */}

        <TestimonialRatingStrip
          testimonials={
            testimonials
          }
        />

        {/* ===================================================
            ALL TESTIMONIALS
        ==================================================== */}

        <TestimonialsListing
          testimonials={
            testimonials
          }
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <TestimonialsCTA />
      </main>
    </>
  );
}