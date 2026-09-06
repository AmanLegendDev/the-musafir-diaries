import PackageCard from "./PackageCard";

import type {
  PackageGridProps,
} from "./types";

export default function PackageGrid({
  packages,
}: PackageGridProps) {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {packages.map(
        (packageData, index) => (
          <PackageCard
            key={packageData._id}
            packageData={packageData}
            priority={index === 0}
            large={index === 0}
          />
        )
      )}
    </div>
  );
}