import { Metadata } from "next";

import PackageListing from "@/components/packages/listing/PackageListing";

import { getAllPackages } from "@/lib/queries/package.queries";
import { getAllCategories } from "@/lib/queries/category.queries";
import { getAllDestinations } from "@/lib/queries/destination.queries";

export const metadata: Metadata = {
  title: "Travel Packages | Altitude Escapes",
  description:
    "Explore luxury Himalayan tour packages across Himachal Pradesh, Uttarakhand, Kashmir, Ladakh and more. Adventure, family vacations, honeymoon trips and customized travel experiences.",
  keywords: [
    "Himachal Tour Packages",
    "Luxury Travel Packages",
    "Himalayan Tours",
    "Adventure Tours",
    "Family Vacation",
    "Honeymoon Packages",
    "Altitude Escapes",
  ],
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Travel Packages | Altitude Escapes",
    description:
      "Discover premium travel packages curated for unforgettable Himalayan adventures.",
    url: "/packages",
    siteName: "Altitude Escapes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Packages | Altitude Escapes",
    description:
      "Premium Himalayan travel experiences crafted for every traveler.",
  },
};

export default async function PackagesPage() {
  const [
    packages,
    categories,
    destinations,
  ] = await Promise.all([
    getAllPackages(),
    getAllCategories(),
    getAllDestinations(),
  ]);

  return (
    <PackageListing
      packages={packages}
      categories={categories}
      destinations={destinations}
    />
  );
}