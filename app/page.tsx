import NavBaar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero/Hero";
import Story from "@/components/home/story/StorySection";

import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FeaturedPackagesSection from "@/components/home/packages/FeaturedPackagesSection";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";
import Package from "@/models/package.model";

import type { HomeDestination } from "@/components/home/destinations/DestinationsSection";
import type { HomePackage } from "@/components/home/packages/FeaturedPackagesGrid";

import TravelExperiencesSection from "@/components/home/experiences/TravelExperiencesSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Musafir Diaries | Coming Soon",

  description:
    "The Musafir Diaries is crafting a beautiful new travel experience from Shimla, Himachal Pradesh.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "The Musafir Diaries | Coming Soon",

    description:
      "A new travel experience is being crafted. The Musafir Diaries — Explore • Experience • Memories.",

    url: SITE_URL,

    siteName: "The Musafir Diaries",

    type: "website",
  },
};

export default async function Home() {
  await connectDB();

  // ─────────────────────────────────────
  // DESTINATIONS
  // ─────────────────────────────────────

  const destinationsFromDB = await Destination.find({
    status: "active",
  })
    .sort({
      featured: -1,
      featuredOrder: 1,
      createdAt: -1,
    })
    .lean();

  // ─────────────────────────────────────
  // FEATURED PACKAGES
  // ─────────────────────────────────────

  const packagesFromDB = await Package.find({
    status: "active",
    featured: true,
  })
    .populate("destination", "_id name slug")
    .sort({
      createdAt: -1,
    })
    .limit(3)
    .lean();

  // ─────────────────────────────────────
  // SERIALIZE MONGODB DATA
  // ─────────────────────────────────────

  const destinations =
    JSON.parse(
      JSON.stringify(destinationsFromDB)
    ) as HomeDestination[];

  const packages =
    JSON.parse(
      JSON.stringify(packagesFromDB)
    ) as HomePackage[];

  return (
    <>
      <NavBaar />

      <Hero />

      <Story />

      <DestinationsSection
        destinations={destinations}
      />

      <FeaturedPackagesSection
        packages={packages}
      />

      <TravelExperiencesSection />
    </>
  );
}