import type { Metadata } from "next";

import FAQHero from "@/components/faqs/FAQHero";
import FAQIntro from "@/components/faqs/FAQIntro";
import FAQFeatured from "@/components/faqs/FAQFeatured";
import FAQListing from "@/components/faqs/FAQListing";
import FAQCTA from "@/components/faqs/FAQCTA";

import {
  getActiveFAQs,
  getFeaturedFAQs,
  getFAQCategories,
} from "@/lib/queries/faq.queries";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const FAQ_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/faqs`;

const FAQ_IMAGE = `${SITE_URL.replace(
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
    "Frequently Asked Questions | Travel & Trip Planning | The Musafir Diaries",

  description:
    "Find answers about destinations, trip planning, bookings, stays, custom itineraries and Himalayan journeys with The Musafir Diaries.",

  keywords: [
    "The Musafir Diaries FAQs",
    "Himachal travel FAQs",
    "Himachal trip planning",
    "Himalayan travel FAQs",
    "Himachal tour packages FAQs",
    "travel booking FAQs",
    "Himachal travel agency FAQs",
    "Spiti Valley travel FAQs",
    "Manali travel FAQs",
    "Shimla travel FAQs",
  ],

  alternates: {
    canonical: FAQ_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Frequently Asked Questions | The Musafir Diaries",

    description:
      "Everything you need to know before planning your journey with The Musafir Diaries.",

    url: FAQ_URL,

    images: [
      {
        url: FAQ_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan travel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Frequently Asked Questions | The Musafir Diaries",

    description:
      "Answers about destinations, travel planning, bookings and stays with The Musafir Diaries.",

    images: [FAQ_IMAGE],
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
   TYPES
========================================================= */

type FAQSchemaItem = {
  question?: string;
  answer?: string;
};

/* =========================================================
   PAGE
========================================================= */

export default async function FAQPage() {
  /*
   * -------------------------------------------------------
   * Fetch all FAQ page data in parallel
   * -------------------------------------------------------
   */

  const [
    activeFAQs,
    featuredFAQs,
    categories,
  ] = await Promise.all([
    getActiveFAQs(),
    getFeaturedFAQs(5),
    getFAQCategories(),
  ]);

  /*
   * -------------------------------------------------------
   * FAQ structured data
   * -------------------------------------------------------
   *
   * Only include FAQs that contain both a question and answer.
   *
   * These are the same active FAQs supplied to the listing,
   * so the structured data represents real page content.
   */

  const faqEntities = (
    activeFAQs as FAQSchemaItem[]
  )
    .filter(
      (faq) =>
        Boolean(faq.question?.trim()) &&
        Boolean(faq.answer?.trim()),
    )
    .map((faq) => ({
      "@type": "Question",

      name: faq.question!.trim(),

      acceptedAnswer: {
        "@type": "Answer",

        text: faq.answer!.trim(),
      },
    }));

  /*
   * -------------------------------------------------------
   * FAQPage schema
   * -------------------------------------------------------
   */

  const faqPageSchema =
    faqEntities.length > 0
      ? {
          "@type": "FAQPage",

          "@id": `${FAQ_URL}#faq`,

          name:
            "Frequently Asked Questions | The Musafir Diaries",

          description:
            "Frequently asked questions about travelling with The Musafir Diaries.",

          url: FAQ_URL,

          mainEntity: faqEntities,
        }
      : null;

  /*
   * -------------------------------------------------------
   * WebPage schema
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${FAQ_URL}#webpage`,

    name:
      "Frequently Asked Questions | The Musafir Diaries",

    description:
      "Frequently asked questions about destinations, travel planning, bookings, stays and Himalayan journeys.",

    url: FAQ_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: FAQ_IMAGE,
    },

    ...(faqPageSchema
      ? {
          mainEntity: {
            "@id": `${FAQ_URL}#faq`,
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

    "@id": `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,

    publisher: {
      "@type": "Organization",

      "@id": `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: {
        "@type": "ImageObject",

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
    "@type": "BreadcrumbList",

    "@id": `${FAQ_URL}#breadcrumb`,

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: SITE_URL,
      },

      {
        "@type": "ListItem",

        position: 2,

        name: "FAQs",

        item: FAQ_URL,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * Combined structured data
   * -------------------------------------------------------
   */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      websiteSchema,
      webPageSchema,
      breadcrumbSchema,
      ...(faqPageSchema
        ? [faqPageSchema]
        : []),
    ],
  };

  /*
   * -------------------------------------------------------
   * PAGE
   * -------------------------------------------------------
   */

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
          FAQ PAGE
      ====================================================== */}

      <main>
        {/* ===================================================
            HERO
        ==================================================== */}

        <FAQHero />

        {/* ===================================================
            INTRO
        ==================================================== */}

        <FAQIntro />

        {/* ===================================================
            FEATURED FAQs
        ==================================================== */}

        {featuredFAQs.length > 0 && (
          <FAQFeatured
            faqs={featuredFAQs}
          />
        )}

        {/* ===================================================
            ALL ACTIVE FAQs
        ==================================================== */}

        <FAQListing
          faqs={activeFAQs}
          categories={categories}
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <FAQCTA />
      </main>
    </>
  );
}