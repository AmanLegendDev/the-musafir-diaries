
import type { Metadata } from "next";

import { InquiryPage } from "@/components/inquiry";
import InquiryFAQ from "@/components/inquiry/InquiryFAQ";

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
   PAGE CONTENT
========================================================= */

const PAGE_TITLE =
  "Plan Your Trip | The Musafir Diaries";

const PAGE_DESCRIPTION =
  "Tell The Musafir Diaries about your destination, travel dates, group size and preferences, and start planning a personalised Himalayan journey.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

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

    title: PAGE_TITLE,

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

    title: PAGE_TITLE,

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
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "How can I enquire about a Himalayan trip?",
    answer:
      "You can submit your travel requirements through The Musafir Diaries enquiry form by sharing your destination, travel dates, group size and preferences.",
  },
  {
    question:
      "Can I request a customised Himalayan trip?",
    answer:
      "Yes. You can share your preferred destination, dates, group size and travel preferences so your journey requirements can be understood before planning.",
  },
  {
    question:
      "What information should I provide in my enquiry?",
    answer:
      "Useful details include your preferred destination, travel dates, number of travellers, trip preferences and any specific requirements you may have.",
  },
  {
    question:
      "Can I enquire about Himachal Pradesh travel?",
    answer:
      "Yes. You can use the enquiry page to share your requirements for travel to Himachal Pradesh and other Himalayan destinations covered by The Musafir Diaries.",
  },
  {
    question:
      "Can I ask about travel packages through the enquiry form?",
    answer:
      "Yes. You can mention the destination, approximate travel dates, group size and package requirements in your enquiry so the relevant travel options can be discussed.",
  },
  {
    question:
      "Is the enquiry the same as a confirmed booking?",
    answer:
      "No. An enquiry is a request to discuss your travel requirements. A booking is confirmed separately after the applicable trip details and arrangements are agreed.",
  },
];

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

    name: PAGE_TITLE,

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
   * FAQ structured data
   * -------------------------------------------------------
   */

  const faqSchema = {
    "@type": "FAQPage",

    "@id": `${INQUIRY_URL}#faq`,

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
    "@context": "https://schema.org",

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
          INQUIRY PAGE
      ====================================================== */}

      <main>
        <InquiryPage />

        <InquiryFAQ
          items={faqItems}
        />
      </main>
    </>
  );
}

