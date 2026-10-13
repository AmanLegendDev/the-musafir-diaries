
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import DestinationsHeader from "./DestinationsHeader";
import DestinationGrid from "./DestinationGrid";

export interface HomeDestination {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  country: string;
  state: string;
  city: string;
  bestTime: string;
  altitude: string;
  heroImage: string;
  gallery: string[];
  startingPrice: number;
  duration: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  featuredOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  status: "active" | "draft";
}

interface DestinationsSectionProps {
  destinations: HomeDestination[];
}

export default function DestinationsSection({
  destinations,
}: DestinationsSectionProps) {
  const visibleDestinations = destinations
    .filter((destination) => destination.status === "active")
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, 4);

  if (visibleDestinations.length === 0) {
    return null;
  }

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="relative overflow-hidden bg-[#FAF9F5] py-24 sm:py-28 lg:py-36"
    >
      {/* Decorative elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-28 h-px w-32 bg-[#087E8B]/20 sm:w-48"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-0 h-px w-40 bg-[#F59E0B]/20 sm:w-64"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#1597C7]/[0.035] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[#F59E0B]/[0.035] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <DestinationsHeader />

        <DestinationGrid destinations={visibleDestinations} />

        <div className="mt-14 flex justify-center sm:mt-16 lg:mt-20">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-4 rounded-full text-sm font-semibold tracking-[0.02em] text-[#071A33] transition-colors duration-200 hover:text-[#087E8B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#087E8B]/20"
          >
            <span className="relative pb-1">
              Explore all destinations
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#071A33]/30 transition-transform duration-300 group-hover:scale-x-0 group-hover:bg-[#087E8B]"
              />
            </span>

            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071A33]/15 bg-white transition-colors duration-200 group-hover:border-[#087E8B]/40 group-hover:bg-[#087E8B] group-hover:text-white"
            >
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
