import type { Metadata } from "next";

import PackageHero from "@/components/packages/listing/PackageHero";
import PackageListing from "@/components/packages/listing/PackageListing";
import PackageFAQ from "@/components/packages/listing/PackageFAQ";

import { getAllPackages } from "@/lib/queries/package.queries";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const PACKAGES_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/packages`;

const PACKAGES_IMAGE = `${SITE_URL.replace(
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

  title: "Himalayan Travel Packages Custom Trips",

  description:
    "Explore thoughtfully crafted Himalayan travel packages with beautiful stays, meaningful experiences and journeys designed around your pace.",

  keywords: [
    "Himalayan travel packages",
    "Himachal Pradesh tour packages",
    "Himachal travel packages",
    "Himachal holiday packages",
    "Shimla Manali packages",
    "Spiti Valley packages",
    "Himalayan tour packages",
    "Himachal customised trips",
    "India mountain tours",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: PACKAGES_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Himalayan Travel Packages | The Musafir Diaries",

    description:
      "Explore thoughtfully crafted Himalayan travel packages with beautiful stays, meaningful experiences and journeys designed around your pace.",

    url: PACKAGES_URL,

    images: [
      {
        url: PACKAGES_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan travel packages",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Himalayan Travel Packages | The Musafir Diaries",

    description:
      "Discover curated Himalayan journeys, beautiful stays and meaningful travel experiences with The Musafir Diaries.",

    images: [PACKAGES_IMAGE],
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

export default async function PackagesPage() {
  const packages = await getAllPackages();

  /* =======================================================
     PACKAGE COLLECTION ITEMS
  ======================================================== */

  const packageItems = packages
    .filter(
      (pkg: {
        name?: string;
        slug?: string;
      }) =>
        Boolean(
          pkg.name &&
          pkg.slug,
        ),
    )
    .map(
      (
        pkg: {
          name?: string;
          slug?: string;
          shortDescription?: string;
          heroImage?: string;
        },
        index: number,
      ) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
          "@type": "TouristTrip",

          name: pkg.name,

          url: `${SITE_URL.replace(
            /\/$/,
            "",
          )}/packages/${pkg.slug}`,

          ...(pkg.shortDescription
            ? {
                description:
                  pkg.shortDescription,
              }
            : {}),

          ...(pkg.heroImage
            ? {
                image: pkg.heroImage,
              }
            : {}),
        },
      }),
    );

  /* =======================================================
     FAQ CONTENT
  ======================================================== */

  const faqItems = [
    {
      question:
        "What types of Himalayan travel packages are available?",

      answer:
        "The Musafir Diaries offers thoughtfully curated Himalayan journeys covering destinations, mountain experiences, stays and customised travel plans based on your preferences.",
    },

    {
      question:
        "Can I customise a Himalayan travel package?",

      answer:
        "Yes. Himalayan trips can be customised around your preferred destinations, travel dates, trip duration, experiences, stays and travel requirements.",
    },

    {
      question:
        "Which destinations are covered in the travel packages?",

      answer:
        "Packages can cover destinations across the Himalayas including Shimla, Manali, Spiti Valley, Dharamshala, Dalhousie and other destinations featured by The Musafir Diaries.",
    },

    {
      question:
        "Are hotels included in the Himalayan travel packages?",

      answer:
        "Package inclusions depend on the individual journey. Selected packages can include thoughtfully chosen stays, while the exact accommodation details are provided with each package.",
    },

    {
      question:
        "How many days do I need for a Himalayan trip?",

      answer:
        "The ideal duration depends on the destination and itinerary. Short Himalayan escapes can take around four to five days, while longer journeys such as Spiti Valley trips may require more time.",
    },

    {
      question:
        "How can I enquire about a Himalayan travel package?",

      answer:
        "You can explore the available packages and submit an enquiry for the journey you are interested in. The Musafir Diaries team can then help you plan the trip around your requirements.",
    },
  ];

  /* =======================================================
     COLLECTION PAGE SCHEMA
  ======================================================== */

  const collectionPageSchema = {
    "@type": "CollectionPage",

    "@id": `${PACKAGES_URL}#webpage`,

    name:
      "Himalayan Travel Packages | The Musafir Diaries",

    description:
      "Explore thoughtfully crafted Himalayan travel packages with beautiful stays, meaningful experiences and journeys designed around your pace.",

    url: PACKAGES_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: PACKAGES_IMAGE,
    },

    ...(packageItems.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",

            "@id": `${PACKAGES_URL}#package-list`,

            name:
              "Himalayan Travel Packages",

            numberOfItems:
              packageItems.length,

            itemListElement:
              packageItems,
          },
        }
      : {}),

    inLanguage: "en-IN",
  };

  /* =======================================================
     WEBSITE SCHEMA
  ======================================================== */

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

  /* =======================================================
     BREADCRUMB SCHEMA
  ======================================================== */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${PACKAGES_URL}#breadcrumb`,

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

        name: "Packages",

        item: PACKAGES_URL,
      },
    ],
  };

  /* =======================================================
     FAQ SCHEMA
  ======================================================== */

  const faqSchema = {
    "@type": "FAQPage",

    "@id": `${PACKAGES_URL}#faq`,

    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",

      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: faq.answer,
      },
    })),
  };

  /* =======================================================
     COMBINED STRUCTURED DATA
  ======================================================== */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      websiteSchema,
      collectionPageSchema,
      breadcrumbSchema,
      faqSchema,
    ],
  };

  /* =======================================================
     PAGE
  ======================================================== */

  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      ==================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      {/* ===================================================
          PACKAGES PAGE
      ==================================================== */}

      <main className="min-h-screen bg-[#FAF9F5]">

        {/* =================================================
            CINEMATIC PACKAGE HERO
        ================================================== */}

        <PackageHero />

        {/* =================================================
            PACKAGE DISCOVERY
        ================================================== */}

        <section
          id="packages"
          aria-labelledby="packages-heading"
          className="scroll-mt-24 bg-[#FAF9F5] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
            <PackageListing
              packages={packages}
            />
          </div>
        </section>

        {/* =================================================
            PACKAGE FAQ
        ================================================== */}

        <PackageFAQ
          items={faqItems}
        />

      </main>
    </>
  );
}