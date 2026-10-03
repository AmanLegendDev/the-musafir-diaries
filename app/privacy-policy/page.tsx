
import type { Metadata } from "next";

import PrivacyPage from "@/components/privacy-policy/PrivacyPage";
import PrivacyFAQ from "@/components/privacy-policy/PrivacyFAQ";
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

const PAGE_TITLE =
  "Privacy Policy | The Musafir Diaries";

const PAGE_DESCRIPTION =
  "Read the Privacy Policy of The Musafir Diaries and learn how we collect, use, share and protect information provided through our website and travel-related communications.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

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

    title: PAGE_TITLE,

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

    title: PAGE_TITLE,

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
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "What does The Musafir Diaries Privacy Policy cover?",
    answer:
      "The Privacy Policy explains how The Musafir Diaries handles information provided through its website and travel-related communications.",
  },
  {
    question:
      "What information may be collected through the website?",
    answer:
      "Information may be provided when you use website forms, make travel enquiries, submit booking details or communicate with The Musafir Diaries. Please refer to the complete Privacy Policy for the applicable details.",
  },
  {
    question:
      "How does The Musafir Diaries use information?",
    answer:
      "Information may be used to respond to enquiries, support travel-related communications, process relevant requests and provide website or travel services as described in the Privacy Policy.",
  },
  {
    question:
      "How is personal information protected?",
    answer:
      "The Privacy Policy explains the measures and practices used by The Musafir Diaries to handle and protect information shared through its website and related communications.",
  },
  {
    question:
      "Can I learn more about how my information is handled?",
    answer:
      "Yes. The complete Privacy Policy on this page provides the applicable information about collection, use, sharing and protection of information.",
  },
];

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

    name: PAGE_TITLE,

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
   * FAQ schema
   * -------------------------------------------------------
   */

  const faqSchema = {
    "@type": "FAQPage",

    "@id":
      `${PRIVACY_URL}#faq`,

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
          PRIVACY POLICY
      ====================================================== */}

      <main>
        <PrivacyPage />

        <PrivacyFAQ
          items={faqItems}
        />
      </main>
    </>
  );
}

