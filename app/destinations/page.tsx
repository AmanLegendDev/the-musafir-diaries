import type { Metadata } from "next";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import DestinationHero from "@/components/destinations/listing/DestinationHero";
import DestinationListing from "./DestinationListing";
import DestinationCTA from "@/components/destinations/listing/DestinationCTA";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

export const metadata: Metadata = {
  title: "Explore Himalayan Destinations | The Musafir Diaries",

  description:
    "Explore thoughtfully chosen Himalayan destinations, from Shimla and Manali to the remote landscapes of Spiti Valley. Discover places, journeys and experiences worth remembering.",

  alternates: {
    canonical: `${SITE_URL}/destinations`,
  },

  openGraph: {
    title:
      "Explore Himalayan Destinations | The Musafir Diaries",

    description:
      "Discover thoughtfully chosen destinations across the Himalayas with The Musafir Diaries.",

    url: `${SITE_URL}/destinations`,

    siteName: "The Musafir Diaries",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Explore Himalayan Destinations | The Musafir Diaries",

    description:
      "Discover thoughtfully chosen destinations across the Himalayas with The Musafir Diaries.",
  },

  robots: {
    index: true,
    follow: true,
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

  return JSON.parse(
    JSON.stringify(destinations)
  );
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

  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      {/* Navbar */}
      <Navbar />

      {/* Cinematic destination introduction */}
      <DestinationHero />

      {/* Search + filtering + results */}
      <DestinationListing
        destinations={destinations}
        initialSearch={params.search ?? ""}
        initialState={params.state ?? "all"}
        initialFeatured={params.featured ?? "all"}
        initialSort={params.sort ?? "featured"}
      />

      {/* Final journey CTA */}
      <DestinationCTA />

      {/* Global footer */}
      <Footer />
    </main>
  );
}