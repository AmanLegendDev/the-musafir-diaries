import type { Metadata } from "next";

import PrivacyPage from "@/components/privacy-policy/PrivacyPage";
import { PRIVACY_CONFIG } from "@/lib/config/privacy";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  PRIVACY_CONFIG.website ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const PRIVACY_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/privacy-policy`;

const PRIVACY_IMAGE = `${SITE_URL.replace(
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
    "Privacy Policy | The Musafir Diaries",

  description:
    "Read the Privacy Policy of The Musafir Diaries and learn how we collect, use, share and protect information provided through our website and travel-related communications.",

  keywords: [
    "The Musafir Diaries Privacy Policy",
    "Travel Privacy Policy",
    "Himachal Travel Privacy",
    "Shimla Travel Privacy Policy",
    "Travel Website Privacy Policy",
  ],

  alternates: {
    canonical: PRIVACY_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Privacy Policy | The Musafir Diaries",

    description:
      "Learn how The Musafir Diaries handles information shared through its website and travel-related communications.",

    url: PRIVACY_URL,

    images: [
      {
        url: PRIVACY_IMAGE,
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
      "Privacy Policy | The Musafir Diaries",

    description:
      "Learn how The Musafir Diaries handles personal information.",

    images: [PRIVACY_IMAGE],
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

export default function PrivacyPolicyPage() {
  /*
   * -------------------------------------------------------
   * WebPage schema
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${PRIVACY_URL}#webpage`,

    name:
      "Privacy Policy | The Musafir Diaries",

    description:
      "Privacy Policy for The Musafir Diaries.",

    url: PRIVACY_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id":
        `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

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

    primaryImageOfPage: {
      "@type":
        "ImageObject",

      url: PRIVACY_IMAGE,
    },

    ...(PRIVACY_CONFIG.lastUpdated
      ? {
          dateModified:
            PRIVACY_CONFIG.lastUpdated,
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
      `${PRIVACY_URL}#breadcrumb`,

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

        name: "Privacy Policy",

        item: PRIVACY_URL,
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
          PRIVACY POLICY
      ====================================================== */}

      <main>
        <PrivacyPage />
      </main>
    </>
  );
}