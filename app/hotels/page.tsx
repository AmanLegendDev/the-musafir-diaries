import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { Suspense } from "react";

import HotelHero from "@/components/hotels/listing/HotelHero";
import HotelListing from "@/components/hotels/listing/HotelListing";
import HotelCTA from "@/components/hotels/listing/HotelCTA";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";
import "@/models/destination.model";

export const metadata: Metadata = {
  title: "Hotels & Stays in Himachal Pradesh | The Musafir Diaries",
  description:
    "Discover thoughtfully selected hotels, resorts, boutique stays, homestays and mountain retreats across Himachal Pradesh with The Musafir Diaries.",
  keywords: [
    "Himachal Pradesh hotels",
    "Shimla hotels",
    "Manali hotels",
    "Spiti hotels",
    "Himachal stays",
    "mountain resorts",
    "boutique stays Himachal",
    "The Musafir Diaries",
  ],
  alternates: {
    canonical: "/hotels",
  },
  openGraph: {
    title: "Hotels & Stays in Himachal Pradesh | The Musafir Diaries",
    description:
      "Find beautiful stays across the Himalayas, thoughtfully selected for your journey.",
    type: "website",
  },
};

async function getHotels() {
  await connectDB();

  const hotels = await Hotel.find({
    status: "active",
  })
    .populate(
      "destination",
      "name slug state"
    )
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(
    JSON.stringify(hotels)
  );
}

export default async function HotelsPage() {
  const hotels = await getHotels();

  /*
   * Use the first featured/ordered hotel image
   * for the cinematic listing hero.
   *
   * If no hotel has an image yet, HotelHero
   * automatically falls back to the brand Himalayan hero.
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
    <>
     

      <main>
        {/* Cinematic stay introduction */}
        <HotelHero heroImage={heroImage} />

        {/* Search + filters + hotel collection */}
        <Suspense fallback={null}>
  <HotelListing hotels={hotels} />
</Suspense>

        {/* Conversion section */}
        <HotelCTA />
      </main>

      
    </>
  );
}