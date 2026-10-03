import type { Metadata } from "next";

import AboutPage from "@/components/about/AboutPage";

import { getAboutFAQs } from "@/lib/queries/about.queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const PAGE_URL = `${SITE_URL}/about`;

const PAGE_TITLE =
  "About The Musafir Diaries";

const PAGE_DESCRIPTION =
  "Learn about The Musafir Diaries, a Shimla-based travel business creating meaningful journeys, curated stays and thoughtful travel experiences across Himachal Pradesh and India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "About The Musafir Diaries",
    "The Musafir Diaries Shimla",
    "Shimla travel company",
    "Shimla travel agency",
    "Himachal travel company",
    "Himachal Pradesh travel",
    "Himachal trip planning",
    "Himachal tour planning",
    "Spiti Valley travel",
    "Manali travel",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    url: PAGE_URL,

    images: [
      {
        url: "/images/home/hero/himalayan-hero.webp",
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan travel experiences",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description:
      "Discover the story, values and vision behind The Musafir Diaries.",

    images: [
      "/images/home/hero/himalayan-hero.webp",
    ],
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

export default async function AboutRoute() {
  /*
   * =========================================================
   * ABOUT FAQS
   * =========================================================
   *
   * Only FAQs actually rendered by AboutPage are included
   * in the FAQ structured data.
   */

  const faqs = await getAboutFAQs(5);

  /*
   * =========================================================
   * STRUCTURED DATA
   * =========================================================
   */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /*
       * =====================================================
       * ORGANIZATION
       * =====================================================
       */

      {
        "@type": "Organization",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        url: SITE_URL,

        logo: {
          "@type": "ImageObject",

          url: `${SITE_URL}/icon-512.png`,

          width: 512,

          height: 512,
        },

        image:
          `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
      },

      /*
       * =====================================================
       * WEBSITE
       * =====================================================
       */

      {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        name: SITE_NAME,

        url: SITE_URL,

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        inLanguage: "en-IN",
      },

      /*
       * =====================================================
       * ABOUT PAGE
       * =====================================================
       */

      {
        "@type": "AboutPage",

        "@id": `${PAGE_URL}#webpage`,

        name: PAGE_TITLE,

        description: PAGE_DESCRIPTION,

        url: PAGE_URL,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        about: {
          "@id": `${SITE_URL}/#organization`,
        },

        mainEntity: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${PAGE_URL}#breadcrumb`,
        },

        primaryImageOfPage: {
          "@type": "ImageObject",

          url:
            `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
        },

        inLanguage: "en-IN",
      },

      /*
       * =====================================================
       * BREADCRUMB
       * =====================================================
       */

      {
        "@type": "BreadcrumbList",

        "@id": `${PAGE_URL}#breadcrumb`,

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

            name: "About",

            item: PAGE_URL,
          },
        ],
      },

      /*
       * =====================================================
       * FAQ
       * =====================================================
       *
       * Only generated when actual About FAQs exist.
       */

      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",

              "@id": `${PAGE_URL}#faq`,

              mainEntity: faqs.map(
                (faq: {
                  question: string;
                  answer: string;
                }) => ({
                  "@type": "Question",

                  name: faq.question,

                  acceptedAnswer: {
                    "@type": "Answer",

                    text: faq.answer,
                  },
                }),
              ),
            },
          ]
        : []),
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
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* =====================================================
          ABOUT PAGE
      ====================================================== */}

      <AboutPage faqs={faqs} />
    </>
  );
}