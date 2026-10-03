import type { Metadata } from "next";
import { Suspense } from "react";

import HotelHero from "@/components/hotels/listing/HotelHero";
import HotelListing from "@/components/hotels/listing/HotelListing";
import HotelCTA from "@/components/hotels/listing/HotelCTA";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";
import Destination from "@/models/destination.model";

/* =========================================================
   PAGE CONFIG
========================================================= */

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const HOTELS_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/hotels`;

const DEFAULT_HERO_IMAGE = `${SITE_URL.replace(
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
    "Hotels & Stays | Handpicked Hotels, Resorts & Mountain Stays | The Musafir Diaries",

  description:
    "Discover thoughtfully selected hotels, resorts, boutique stays, homestays and mountain retreats across India with The Musafir Diaries.",

  keywords: [
    "India hotels",
    "Himachal Pradesh hotels",
    "Shimla hotels",
    "Manali hotels",
    "Spiti hotels",
    "Kerala hotels",
    "Meghalaya hotels",
    "Ladakh hotels",
    "mountain resorts",
    "boutique stays",
    "Himalayan stays",
    "Himachal resorts",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: HOTELS_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Hotels & Stays | The Musafir Diaries",

    description:
      "Find thoughtfully selected hotels, resorts, boutique stays and mountain retreats across destinations with The Musafir Diaries.",

    url: HOTELS_URL,

    images: [
      {
        url: DEFAULT_HERO_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — hotels and stays",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Hotels & Stays | The Musafir Diaries",

    description:
      "Explore handpicked stays across Himalayan and Indian destinations with The Musafir Diaries.",

    images: [DEFAULT_HERO_IMAGE],
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
   DATA
========================================================= */

async function getHotelPageData() {
  await connectDB();

  const [hotels, destinations] =
    await Promise.all([
      Hotel.find({
        status: "active",
      })
        .populate(
          "destination",
          "name slug state",
        )
        .sort({
          featured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .lean(),

      Destination.find({
        status: "active",
      })
        .select(
          "name slug state featured featuredOrder",
        )
        .sort({
          featuredOrder: 1,
          name: 1,
        })
        .lean(),
    ]);

  return {
    hotels: JSON.parse(
      JSON.stringify(hotels),
    ),

    destinations: JSON.parse(
      JSON.stringify(destinations),
    ),
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function HotelsPage() {
  const {
    hotels,
    destinations,
  } = await getHotelPageData();

  /*
   * -------------------------------------------------------
   * Hero image
   * -------------------------------------------------------
   *
   * Prefer the first featured hotel with an image.
   * Fall back to the site's Himalayan hero image.
   */

  const heroHotel = hotels.find(
    (hotel: {
      featured?: boolean;
      heroImage?: string;
    }) =>
      hotel.featured &&
      Boolean(hotel.heroImage),
  );

  const heroImage =
    heroHotel?.heroImage ||
    DEFAULT_HERO_IMAGE;

  /*
   * -------------------------------------------------------
   * Hotel collection schema
   * -------------------------------------------------------
   *
   * Only active hotels are already present in `hotels`.
   */

  const hotelItems = hotels
    .filter(
      (hotel: {
        _id?: string;
        name?: string;
        slug?: string;
        heroImage?: string;
        shortDescription?: string;
      }) =>
        Boolean(
          hotel.name &&
          hotel.slug,
        ),
    )
    .map(
      (
        hotel: {
          _id?: string;
          name?: string;
          slug?: string;
          heroImage?: string;
          shortDescription?: string;
        },
        index: number,
      ) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
          "@type": "Hotel",

          "@id": `${SITE_URL.replace(
            /\/$/,
            "",
          )}/hotels/${hotel.slug}#hotel`,

          name: hotel.name,

          url: `${SITE_URL.replace(
            /\/$/,
            "",
          )}/hotels/${hotel.slug}`,

          ...(hotel.heroImage
            ? {
                image: hotel.heroImage,
              }
            : {}),

          ...(hotel.shortDescription
            ? {
                description:
                  hotel.shortDescription,
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

    "@id": `${HOTELS_URL}#webpage`,

    name:
      "Hotels & Stays | The Musafir Diaries",

    description:
      "Discover thoughtfully selected hotels, resorts, boutique stays, homestays and mountain retreats across destinations with The Musafir Diaries.",

    url: HOTELS_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: heroImage,
    },

    ...(hotelItems.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",

            "@id": `${HOTELS_URL}#hotel-list`,

            name:
              "Hotels & Stays",

            numberOfItems:
              hotelItems.length,

            itemListElement:
              hotelItems,
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
   * Breadcrumb schema
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${HOTELS_URL}#breadcrumb`,

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

        name: "Hotels & Stays",

        item: HOTELS_URL,
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
          PAGE
      ====================================================== */}

      <main>
        {/* ===================================================
            CINEMATIC HERO
        ==================================================== */}

        <HotelHero
          heroImage={heroImage}
        />

        {/* ===================================================
            SEARCH + DESTINATIONS + HOTELS
        ==================================================== */}

        <Suspense fallback={null}>
          <HotelListing
            hotels={hotels}
            destinations={destinations}
          />
        </Suspense>

        {/* ===================================================
            CONVERSION CTA
        ==================================================== */}

        <HotelCTA />
      </main>
    </>
  );
}