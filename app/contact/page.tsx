import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ContactIntro from "@/components/contact/ContactIntro";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactForm from "@/components/contact/ContactForm";
import ContactAside from "@/components/contact/ContactAside";
import ContactTrust from "@/components/contact/ContactTrust";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

import { getActiveFAQs } from "@/lib/queries/faq.queries";
import { CONTACT_CONFIG } from "@/lib/config/contact";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  CONTACT_CONFIG.site.url ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const CONTACT_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/contact`;

const CONTACT_IMAGE = `${SITE_URL.replace(
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
    "Contact Us | Plan Himalayan Journey",

  description:
    "Get in touch with The Musafir Diaries to discuss your destination, travel dates, group size and Himalayan travel plans. Start planning your personalised journey.",

  keywords: [
    "Contact The Musafir Diaries",
    "Himachal Travel Agency",
    "Himachal Travel Planner",
    "Shimla Travel Agency",
    "Himachal Tour Packages",
    "Spiti Valley Travel",
    "Manali Travel",
    "Himachal Trip Planning",
    "Himalayan Travel Planner",
    "Customised Himachal Trips",
  ],

  alternates: {
    canonical: CONTACT_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Contact Us | Plan Your Himalayan Journey | The Musafir Diaries",

    description:
      "Let's talk about where you're going. Start planning your next Himalayan journey with The Musafir Diaries.",

    url: CONTACT_URL,

    images: [
      {
        url: CONTACT_IMAGE,
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
      "Contact Us | The Musafir Diaries",

    description:
      "Start a conversation about your next Himalayan journey with The Musafir Diaries.",

    images: [CONTACT_IMAGE],
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

type ContactFAQData = {
  _id: unknown;
  question: string;
  answer: string;
  category?: string;
};

/* =========================================================
   PAGE
========================================================= */

export default async function ContactPage() {
  /*
   * -------------------------------------------------------
   * Fetch active FAQs
   * -------------------------------------------------------
   */

  const faqs = await getActiveFAQs();

  /*
   * -------------------------------------------------------
   * Prepare FAQ data for UI
   * -------------------------------------------------------
   */

  const faqItems = (
    faqs as ContactFAQData[]
  )
    .slice(0, 5)
    .map((faq) => ({
      _id: String(faq._id),

      question: faq.question,

      answer: faq.answer,

      category: faq.category || "",
    }));

  /*
   * -------------------------------------------------------
   * FAQ structured data
   * -------------------------------------------------------
   *
   * Only include FAQs that are actually rendered on the page.
   */

  const faqSchema =
    faqItems.length > 0
      ? {
          "@type": "FAQPage",

          "@id": `${CONTACT_URL}#faq`,

          mainEntity:
            faqItems.map((faq) => ({
              "@type": "Question",

              name: faq.question,

              acceptedAnswer: {
                "@type": "Answer",

                text: faq.answer,
              },
            })),
        }
      : null;

  /*
   * -------------------------------------------------------
   * ContactPage structured data
   * -------------------------------------------------------
   */

  const contactPageSchema = {
    "@type": "ContactPage",

    "@id": `${CONTACT_URL}#contactpage`,

    name:
      "Contact The Musafir Diaries",

    description:
      "Contact The Musafir Diaries to discuss travel plans, destinations and Himalayan journeys.",

    url: CONTACT_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: CONTACT_IMAGE,
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

    "@id": `${CONTACT_URL}#breadcrumb`,

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

        name: "Contact",

        item: CONTACT_URL,
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
      contactPageSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
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
          PAGE
      ====================================================== */}

      <main className="overflow-x-hidden bg-white">
        {/* ===================================================
            HERO
        ==================================================== */}

        <ContactHero />

        {/* ===================================================
            INTRODUCTION
        ==================================================== */}

        <ContactIntro />

        {/* ===================================================
            DIRECT CONTACT OPTIONS
        ==================================================== */}

        <ContactMethods />

        {/* ===================================================
            MAIN ENQUIRY AREA
        ==================================================== */}

        <section
          aria-labelledby="contact-enquiry-heading"
          className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:gap-10">
              <ContactForm />

              <ContactAside />
            </div>
          </div>
        </section>

        {/* ===================================================
            TRUST / PROCESS
        ==================================================== */}

        <ContactTrust />

        {/* ===================================================
            FAQ
        ==================================================== */}

        {faqItems.length > 0 && (
          <ContactFAQ
            faqs={faqItems}
          />
        )}

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <ContactCTA />
      </main>
    </>
  );
}