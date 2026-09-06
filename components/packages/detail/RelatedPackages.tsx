import Link from "next/link";

import PackageCard from "@/components/packages/listing/PackageCard";

import { ArrowRight } from "lucide-react";

import { Package } from "@/types/package";

interface RelatedPackagesProps {
  packages: Package[];
}



export default function RelatedPackages({
  packages,
}: RelatedPackagesProps) {
  if (!packages?.length) return null;

  

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              More Adventures
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              Related Packages
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Explore more unforgettable journeys that match your
              interests and travel style.
            </p>

          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600"
          >
            View All Packages

            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard
  key={pkg._id}
  packageData={pkg}
/>
          ))}
        </div>

      </div>
    </section>
  );
}