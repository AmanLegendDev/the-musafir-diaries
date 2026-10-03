import type { Metadata } from "next";

import { InquiryPage } from "@/components/inquiry";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const INQUIRY_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/inquiry`;

const INQUIRY_IMAGE = `${SITE_URL.replace(
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
    "Plan Your Journey | Custom Himalayan Travel | The Musafir Diaries",

  description:
    "Tell The Musafir Diaries about your destination, travel dates, group size and preferences, and start planning a personalised Himalayan journey.",

  keywords: [
    "Plan Himalayan trip",
    "Himalayan trip enquiry",
    "Himachal trip planning",
    "Customised Himachal trip",
    "Himalayan travel planner",
    "Himachal travel enquiry",
    "Himachal tour packages",
    "Custom travel India",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: INQUIRY_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Plan Your Journey | The Musafir Diaries",

    description:
      "Share your travel plans and start a conversation about your personalised Himalayan journey.",

    url: INQUIRY_URL,

    images: [
      {
        url: INQUIRY_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "Plan your Himalayan journey with The Musafir Diaries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Plan Your Journey | The Musafir Diaries",

    description:
      "Share your destination, dates and travel preferences to start planning your Himalayan journey.",

    images: [INQUIRY_IMAGE],
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

export default function InquiryRoutePage() {
  /*
   * -------------------------------------------------------
   * WebPage structured data
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${INQUIRY_URL}#webpage`,

    name:
      "Plan Your Journey | The Musafir Diaries",

    description:
      "Start planning a personalised Himalayan journey with The Musafir Diaries.",

    url: INQUIRY_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: INQUIRY_IMAGE,
    },

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * WebSite structured data
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
   * Breadcrumb structured data
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${INQUIRY_URL}#breadcrumb`,

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

        name: "Plan Your Journey",

        item: INQUIRY_URL,
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
          INQUIRY PAGE
      ====================================================== */}

      <main>
        <InquiryPage />
      </main>
    </>
  );
}