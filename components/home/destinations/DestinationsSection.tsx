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
    .sort(
      (a, b) => a.featuredOrder - b.featuredOrder
    );

  if (visibleDestinations.length === 0) {
    return null;
  }

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="relative overflow-hidden bg-[#FAF9F5] py-24 sm:py-28 lg:py-36"
    >
      {/* Subtle editorial decoration */}
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

        <DestinationGrid
          destinations={visibleDestinations}
        />
      </div>
    </section>
  );
}