import type { Metadata } from "next";
import { Suspense } from "react";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model"
import DestinationHero from "@/components/destinations/listing/DestinationHero";
import DestinationStats from "@/components/destinations/listing/DestinationStats";
import DestinationListing from "./DestinationListing";
import { getAllDestinations } from "@/lib/queries/destination.queries";
import { Footer } from "@/components/footer";

const destinations = await getAllDestinations();

export const metadata: Metadata = {
  title: "Explore Himalayan Destinations | Altitude Escapes",
  description:
    "Discover handpicked destinations across Himachal Pradesh and the Himalayas. Luxury stays, curated adventures, and unforgettable travel experiences with Altitude Escapes.",
  keywords: [
    "Himachal Destinations",
    "Shimla",
    "Manali",
    "Spiti Valley",
    "Kasol",
    "Luxury Travel",
    "Altitude Escapes",
  ],
};

async function getDestinations() {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
  })
    .sort({
      featuredOrder: 1,
      featured: -1,
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

  return (
    <main className="min-h-screen bg-slate-50">

     

      <div className="container mx-auto px-4 py-16 lg:px-8">

        

        <Suspense>

          <DestinationListing
            destinations={destinations}
            initialSearch={params.search ?? ""}
            initialState={params.state ?? "all"}
            initialFeatured={params.featured ?? "all"}
            initialSort={params.sort ?? "featured"}
          />
         

        </Suspense>

      </div>
       <Footer/>

    </main>
  );
}
