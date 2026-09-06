import DestinationCard from "./DestinationCard";

import type {
  DestinationGridProps,
} from "./types";

export default function DestinationGrid({
  destinations,
}: DestinationGridProps) {
  return (
    <div
className="
grid
gap-8
md:grid-cols-2
xl:grid-cols-3
"
>
 {destinations.map((destination, index) => (
  <div
    key={destination._id}
  >
    <DestinationCard
      destination={destination}
      priority={index === 0}
    />
  </div>
))}
</div>
  );
}