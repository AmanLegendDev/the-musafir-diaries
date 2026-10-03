import type { Metadata } from "next";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

import DestinationHero from "@/components/destinations/listing/DestinationHero";
import DestinationListing from "./DestinationListing";
import DestinationCTA from "@/components/destinations/listing/DestinationCTA";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const PAGE_URL = `${SITE_URL}/destinations`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Himalayan Destinations & Travel Guide | The Musafir Diaries",

  description:
    "Explore Himalayan destinations including Shimla, Manali, Spiti Valley, Dharamshala, Dalhousie and more with The Musafir Diaries. Discover places, travel experiences and thoughtfully planned journeys.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title:
      "Himalayan Destinations & Travel Guide | The Musafir Diaries",

    description:
      "Explore Himalayan destinations, mountain landscapes and memorable travel experiences with The Musafir Diaries.",

    url: PAGE_URL,

    siteName: "The Musafir Diaries",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Himalayan Destinations & Travel Guide | The Musafir Diaries",

    description:
      "Explore Himalayan destinations, mountain landscapes and thoughtfully planned journeys with The Musafir Diaries.",
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

async function getDestinations() {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
  })
    .sort({
      featured: -1,
      featuredOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(destinations));
}

interface DestinationsPageProps {
  searchParams?: Promise<{
    search?: string;
    state?: string;
    featured?: string;
    sort?: string;
  }>;
}

export default async function DestinationsPage({
  searchParams,
}: DestinationsPageProps) {
  const params = (await searchParams) ?? {};

  const destinations = await getDestinations();

  const destinationItems = destinations.map(
    (destination: {
      _id: string;
      name: string;
      slug: string;
      shortDescription?: string;
      heroImage?: string;
      state?: string;
      city?: string;
    }, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: destination.name,
      url: `${PAGE_URL}/${destination.slug}`,
    }),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name:
          "Himalayan Destinations & Travel Guide | The Musafir Diaries",
        description:
          "Explore Himalayan destinations, mountain landscapes and thoughtfully planned travel experiences with The Musafir Diaries.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          url: SITE_URL,
          name: "The Musafir Diaries",
        },
        breadcrumb: {
          "@id": `${PAGE_URL}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${PAGE_URL}#destination-list`,
        },
      },

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
            name: "Destinations",
            item: PAGE_URL,
          },
        ],
      },

      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#destination-list`,
        name: "The Musafir Diaries Destinations",
        description:
          "Destinations available to explore through The Musafir Diaries.",
        numberOfItems: destinationItems.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: destinationItems,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      {/* =====================================================
          SEO STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* =====================================================
          DESTINATION INTRO
      ====================================================== */}

      <DestinationHero />

      {/* =====================================================
          DESTINATION SEARCH / FILTER / LISTING
      ====================================================== */}

      <DestinationListing
        destinations={destinations}
        initialSearch={params.search ?? ""}
        initialState={params.state ?? "all"}
        initialFeatured={params.featured ?? "all"}
        initialSort={params.sort ?? "featured"}
      />

      {/* =====================================================
          FINAL JOURNEY CTA
      ====================================================== */}

      <DestinationCTA />
    </main>
  );
}