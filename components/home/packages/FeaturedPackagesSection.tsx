import FeaturedPackagesHeader from "./FeaturedPackagesHeader";
import FeaturedPackagesGrid from "./FeaturedPackagesGrid";

import type { HomePackage } from "./FeaturedPackagesGrid";

interface FeaturedPackagesSectionProps {
  packages: HomePackage[];
}

export default function FeaturedPackagesSection({
  packages,
}: FeaturedPackagesSectionProps) {
  if (packages.length === 0) {
    return null;
  }

  return (
    <section
      id="packages"
      aria-labelledby="featured-packages-heading"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
    >
      {/* Decorative line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-28 h-px w-32 bg-[#087E8B]/20 sm:w-48"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-0 h-px w-40 bg-[#F59E0B]/20 sm:w-64"
      />

      {/* Subtle ambient detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#1597C7]/[0.035] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[#F59E0B]/[0.035] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <FeaturedPackagesHeader />

        <div className="mt-14 lg:mt-16">
          <FeaturedPackagesGrid packages={packages} />
        </div>
      </div>
    </section>
  );
}