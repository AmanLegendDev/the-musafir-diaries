
import type { Metadata } from "next";

import { BookingPage } from "@/components/booking";
import BookingFAQ from "@/components/booking/BookingFAQ";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const BOOKING_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/booking`;

const BOOKING_IMAGE = `${SITE_URL.replace(
  /\/$/,
  "",
)}/og-image.jpg`;

const SITE_LOGO = `${SITE_URL.replace(
  /\/$/,
  "",
)}/icon-512.png`;

const PAGE_TITLE =
  "Book Your Himalayan Trip";

const PAGE_DESCRIPTION =
  "Plan your Himalayan trip with The Musafir Diaries. Share your destination, travel dates, group details and preferences to start planning your journey.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "Himalayan trip booking",
    "Himachal Pradesh trip booking",
    "Himachal travel booking",
    "Himalayan holiday packages",
    "customised Himachal trips",
    "customised Himalayan travel",
    "Himalayan tour booking",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: BOOKING_URL,
  },

  openGraph: {
    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    url: BOOKING_URL,

    siteName: SITE_NAME,

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: BOOKING_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "Book your Himalayan trip with The Musafir Diaries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description:
      "Start planning your Himalayan journey with The Musafir Diaries.",

    images: [BOOKING_IMAGE],
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
      "How can I book a Himalayan trip with The Musafir Diaries?",
    answer:
      "Choose your travel requirements in the booking flow, provide your traveller details, preferred travel date and other requested information, then submit your booking details.",
  },
  {
    question:
      "What information do I need to provide for a booking?",
    answer:
      "You may need to provide your selected package, name, phone number, email address, travel date, number of adults and children, pickup location and any special requests.",
  },
  {
    question:
      "Can I book a customised Himalayan trip?",
    answer:
      "Yes. You can share your travel requirements and preferences so the trip details can be planned around your destination, dates, group size and requirements.",
  },
  {
    question:
      "Can I book a Himachal Pradesh travel package?",
    answer:
      "Yes. The booking flow can be used for available Himachal Pradesh and Himalayan travel packages listed by The Musafir Diaries.",
  },
  {
    question:
      "Can I mention special requests during booking?",
    answer:
      "Yes. The booking form includes a special request section where you can provide additional information or requirements related to your journey.",
  },
  {
    question:
      "Is submitting the booking form the final confirmation?",
    answer:
      "Submitting your booking details starts the booking process. Final confirmation depends on the applicable package details, availability and confirmation from The Musafir Diaries.",
  },
];

/* =========================================================
   STRUCTURED DATA
========================================================= */

const webPageSchema = {
  "@type": "WebPage",

  "@id": `${BOOKING_URL}#webpage`,

  name: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  url: BOOKING_URL,

  isPartOf: {
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",

    url: BOOKING_IMAGE,
  },

  inLanguage: "en-IN",
};

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

const breadcrumbSchema = {
  "@type": "BreadcrumbList",

  "@id": `${BOOKING_URL}#breadcrumb`,

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

      name: "Book Your Trip",

      item: BOOKING_URL,
    },
  ],
};

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${BOOKING_URL}#faq`,

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

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    websiteSchema,
    webPageSchema,
    breadcrumbSchema,
    faqSchema,
  ],
};

/* =========================================================
   PAGE
========================================================= */

export default function Page() {
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
          BOOKING FLOW
      ====================================================== */}

      <BookingPage />

      {/* =====================================================
          FAQ
      ====================================================== */}

      <BookingFAQ
        items={faqItems}
      />
    </>
  );
}

