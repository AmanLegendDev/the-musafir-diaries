import type { IPackage } from "@/models/package.model";

import PackageCard from "./PackageCard";
import PackageEmpty from "./PackageEmpty";

interface PackageGridProps {
  packages: IPackage[];
  onClear?: () => void;
}

export default function PackageGrid({
  packages,
  onClear,
}: PackageGridProps) {
  if (packages.length === 0) {
    return <PackageEmpty onClear={onClear} />;
  }

  return (
    <div
      id="packages"
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {packages.map((packageData, index) => (
        <PackageCard
          key={packageData._id.toString()}
          packageData={packageData}
          index={index}
        />
      ))}
    </div>
  );
}