
import type { Metadata } from "next";

import TermsPage from "@/components/terms/TermsPage";
import TermsFAQ from "@/components/terms/TermsFAQ";
import { TERMS_CONFIG } from "@/lib/config/terms";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  TERMS_CONFIG.website ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const TERMS_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/terms-and-conditions`;

const TERMS_IMAGE = `${SITE_URL.replace(
  /\/$/,
  "",
)}/images/home/hero/himalayan-hero.webp`;

const SITE_LOGO = `${SITE_URL.replace(
  /\/$/,
  "",
)}/icon-512.png`;

const PAGE_TITLE =
  "Terms & Conditions";

const PAGE_DESCRIPTION =
  "Read the Terms & Conditions of The Musafir Diaries covering enquiries, bookings, pricing, payments, cancellations, itineraries, accommodation, transportation and travel conditions.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "The Musafir Diaries Terms and Conditions",
    "Travel Terms and Conditions",
    "Himachal Travel Terms",
    "Shimla Travel Terms",
    "Travel Booking Terms",
    "Himachal Tour Terms",
    "Travel Booking Conditions",
  ],

  alternates: {
    canonical: TERMS_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title: PAGE_TITLE,

    description:
      "Terms covering travel enquiries, bookings, payments, cancellations, itineraries and related travel services.",

    url: TERMS_URL,

    images: [
      {
        url: TERMS_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan travel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description:
      "Read the Terms & Conditions for The Musafir Diaries.",

    images: [TERMS_IMAGE],
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
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "Where can I read the Terms & Conditions for The Musafir Diaries?",
    answer:
      "The complete Terms & Conditions are available on this page and cover travel enquiries, bookings, pricing, payments, cancellations, itineraries, accommodation, transportation and related travel conditions.",
  },
  {
    question:
      "Do the Terms & Conditions apply to travel bookings?",
    answer:
      "Yes. The Terms & Conditions explain the conditions that apply to enquiries, bookings and related travel arrangements made through The Musafir Diaries.",
  },
  {
    question:
      "Do the Terms cover cancellation and payment conditions?",
    answer:
      "Yes. The Terms & Conditions include provisions relating to pricing, payments and cancellations. Please review the complete terms on this page before confirming a booking.",
  },
  {
    question:
      "Do the Terms cover accommodation and transportation?",
    answer:
      "Yes. The Terms & Conditions address accommodation, transportation, itineraries and other travel-related arrangements where applicable.",
  },
  {
    question:
      "Should I read the Terms before making a booking?",
    answer:
      "Yes. Travellers should review the complete Terms & Conditions before submitting or confirming a booking so they understand the applicable travel conditions.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function TermsAndConditionsPage() {
  /*
   * -------------------------------------------------------
   * WebPage schema
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${TERMS_URL}#webpage`,

    name: PAGE_TITLE,

    description:
      "Terms and Conditions for The Musafir Diaries.",

    url: TERMS_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: TERMS_IMAGE,
    },

    ...(TERMS_CONFIG.lastUpdated
      ? {
          dateModified:
            TERMS_CONFIG.lastUpdated,
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

    "@id": `${TERMS_URL}#breadcrumb`,

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

        name: "Terms & Conditions",

        item: TERMS_URL,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * FAQ schema
   * -------------------------------------------------------
   */

  const faqSchema = {
    "@type": "FAQPage",

    "@id": `${TERMS_URL}#faq`,

    mainEntity: faqItems.map(
      (faq) => ({
        "@type": "Question",

        name: faq.question,

        acceptedAnswer: {
          "@type": "Answer",

          text: faq.answer,
        },
      }),
    ),
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
      webPageSchema,
      breadcrumbSchema,
      faqSchema,
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
          TERMS PAGE
      ====================================================== */}

      <main>
        <TermsPage />

        <TermsFAQ
          items={faqItems}
        />
      </main>
    </>
  );
}

