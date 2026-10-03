import type { Metadata } from "next";

import TermsPage from "@/components/terms/TermsPage";
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

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "Terms & Conditions | The Musafir Diaries",

  description:
    "Read the Terms & Conditions of The Musafir Diaries covering enquiries, bookings, pricing, payments, cancellations, itineraries, accommodation, transportation and travel conditions.",

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

    title:
      "Terms & Conditions | The Musafir Diaries",

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

    title:
      "Terms & Conditions | The Musafir Diaries",

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

    name:
      "Terms & Conditions | The Musafir Diaries",

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
      `${TERMS_URL}#breadcrumb`,

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

        name: "Terms & Conditions",

        item: TERMS_URL,
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
      webPageSchema,
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
          TERMS PAGE
      ====================================================== */}

      <main>
        <TermsPage />
      </main>
    </>
  );
}