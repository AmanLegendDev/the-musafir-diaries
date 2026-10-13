
import DestinationCard from "./DestinationCard";
import type { HomeDestination } from "./DestinationsSection";

interface DestinationGridProps {
  destinations: HomeDestination[];
}

export default function DestinationGrid({
  destinations,
}: DestinationGridProps) {
  if (destinations.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
      {destinations.map((destination, index) => {
        // Keep the first destination's large editorial layout.
        const isFeatured = index === 0;

        return (
          <div
            key={destination._id}
            className={
              isFeatured
                ? "md:col-span-2 lg:col-span-7"
                : "md:col-span-1 lg:col-span-5"
            }
          >
            <DestinationCard
              destination={destination}
              featured={isFeatured}
            />
          </div>
        );
      })}
    </div>
  );
}
