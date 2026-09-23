import type { Metadata } from "next";
import { Suspense } from "react";

import HotelHero from "@/components/hotels/listing/HotelHero";
import HotelListing from "@/components/hotels/listing/HotelListing";
import HotelCTA from "@/components/hotels/listing/HotelCTA";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";
import Destination from "@/models/destination.model";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hotels & Stays | The Musafir Diaries",
  description:
    "Discover thoughtfully selected hotels, resorts, boutique stays, homestays and mountain retreats across destinations with The Musafir Diaries.",
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
    "The Musafir Diaries",
  ],
  alternates: {
    canonical: "/hotels",
  },
  openGraph: {
    title: "Hotels & Stays | The Musafir Diaries",
    description:
      "Find beautiful stays across India, thoughtfully selected for your journey.",
    type: "website",
  },
};

async function getHotelPageData() {
  await connectDB();

  const [hotels, destinations] = await Promise.all([
    Hotel.find({
      status: "active",
    })
      .populate("destination", "name slug state")
      .sort({
        featured: -1,
        displayOrder: 1,
        createdAt: -1,
      })
      .lean(),

    Destination.find({
      status: "active",
    })
      .select("name slug state featured featuredOrder")
      .sort({
        featuredOrder: 1,
        name: 1,
      })
      .lean(),
  ]);

  return {
    hotels: JSON.parse(JSON.stringify(hotels)),
    destinations: JSON.parse(JSON.stringify(destinations)),
  };
}

export default async function HotelsPage() {
  const { hotels, destinations } =
    await getHotelPageData();

  /*
   * Use the first featured hotel with an image
   * for the cinematic listing hero.
   */
  const heroHotel = hotels.find(
    (hotel: {
      featured?: boolean;
      heroImage?: string;
    }) =>
      hotel.featured &&
      Boolean(hotel.heroImage)
  );

  const heroImage =
    heroHotel?.heroImage || undefined;

  return (
    <main>
      {/* Cinematic stay introduction */}
      <HotelHero heroImage={heroImage} />

      {/* Search + destination collection + hotels */}
      <Suspense fallback={null}>
        <HotelListing
          hotels={hotels}
          destinations={destinations}
        />
      </Suspense>

      {/* Conversion section */}
      <HotelCTA />
    </main>
  );
}