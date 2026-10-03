import type { Metadata } from "next";

import PackageHero from "@/components/packages/listing/PackageHero";
import PackageListing from "@/components/packages/listing/PackageListing";

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

  title:
    "Himalayan Travel Packages | Himachal Tours & Custom Trips | The Musafir Diaries",

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

  /*
   * -------------------------------------------------------
   * Package collection schema
   * -------------------------------------------------------
   *
   * The package query is the source of truth.
   * Only packages returned by getAllPackages() are represented.
   */

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

  /*
   * -------------------------------------------------------
   * CollectionPage schema
   * -------------------------------------------------------
   */

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

      "@id": `${SITE_URL}/#organization`,

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

    "@id": `${PACKAGES_URL}#breadcrumb`,

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

        name: "Packages",

        item: PACKAGES_URL,
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
      collectionPageSchema,
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
          PACKAGES PAGE
      ====================================================== */}

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* ===================================================
            CINEMATIC PACKAGE HERO
        ==================================================== */}

        <PackageHero />

        {/* ===================================================
            PACKAGE DISCOVERY
        ==================================================== */}

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
      </main>
    </>
  );
}