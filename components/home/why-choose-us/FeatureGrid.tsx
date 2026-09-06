import FeatureCard from "./FeatureCard";

import type {
  FeatureGridProps,
} from "./types";

export default function FeatureGrid({
  features,
}: FeatureGridProps) {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
        />
      ))}
    </div>
  );
}