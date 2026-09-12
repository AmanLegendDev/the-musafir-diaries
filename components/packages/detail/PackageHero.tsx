import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface PackageHeroProps {
  packageData: IPackage;
  destinationName: string;
}

function formatPrice(price: number) {
  if (!price || price <= 0) return null;

  return `₹${price.toLocaleString("en-IN")}`;
}

export default function PackageHero({
  packageData,
  destinationName,
}: PackageHeroProps) {
  const discountedPrice = formatPrice(
    packageData.discountedPrice,
  );

  const originalPrice = formatPrice(
    packageData.originalPrice,
  );

  const hasDiscount =
    packageData.originalPrice > 0 &&
    packageData.discountedPrice > 0 &&
    packageData.discountedPrice <
      packageData.originalPrice;

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#071A33] sm:min-h-[720px] lg:min-h-[760px]">
      {/* Package image */}
      {packageData.heroImage ? (
        <Image
          src={packageData.heroImage}
          alt={packageData.name}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D2747]" />
      )}

      {/* Cinematic treatment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#071A33]/25"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#071A33]/55 to-[#071A33]/10"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#071A33]/90 via-[#071A33]/20 to-transparent"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[680px] max-w-[1600px] items-end px-6 pb-12 pt-38 sm:min-h-[720px] sm:px-10 sm:pb-14 lg:min-h-[760px] lg:px-16 lg:pb-16 xl:px-20">
        <div className="w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Main package copy */}
            <div className="lg:col-span-8 xl:col-span-7">
              {/* Eyebrow */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Curated Himalayan journey
                </span>

                {packageData.featured && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                      Featured journey
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="max-w-4xl font-serif text-6xl font-medium leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
                {packageData.name}
              </h1>

              {/* Description */}
              {packageData.shortDescription && (
                <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
                  {packageData.shortDescription}
                </p>
              )}

              {/* Journey metadata */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {destinationName && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <MapPin
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{destinationName}</span>
                  </div>
                )}

                {packageData.duration && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <Clock3
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{packageData.duration}</span>
                  </div>
                )}

                {packageData.groupSize && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <Users
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{packageData.groupSize}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`/inquiry?package=${encodeURIComponent(
                    packageData.slug,
                  )}`}
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:bg-[#FAF9F5]"
                >
                  Plan this journey

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </Link>

                <Link
                  href="#itinerary"
                  className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  View itinerary
                </Link>
              </div>
            </div>

            {/* Pricing panel */}
            <div className="lg:col-span-4 lg:flex lg:justify-end xl:col-span-5">
              <div className="w-full max-w-[340px] rounded-[28px] border border-white/15 bg-[#071A33]/45 p-5 backdrop-blur-xl sm:p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  Journey from
                </p>

                <div className="mt-3 flex items-end gap-3">
                  {discountedPrice ? (
                    <span className="font-serif text-4xl text-white">
                      {discountedPrice}
                    </span>
                  ) : (
                    <span className="font-serif text-3xl text-white/80">
                      Price on enquiry
                    </span>
                  )}

                  {hasDiscount && originalPrice && (
                    <span className="pb-1 text-sm text-white/35 line-through">
                      {originalPrice}
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <span className="mt-2 inline-flex rounded-full bg-[#F59E0B]/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F59E0B]">
                    Special journey price
                  </span>
                )}

                <div className="mt-6 grid grid-cols-2 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                      Difficulty
                    </p>

                    <p className="mt-1 text-sm capitalize text-white/75">
                      {packageData.difficulty || "Easy"}
                    </p>
                  </div>

                  <div className="border-l border-white/10 pl-5">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                      Group
                    </p>

                    <p className="mt-1 text-sm text-white/75">
                      {packageData.groupSize || "Flexible"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[10px] leading-5 text-white/40">
                    Final pricing may vary based on dates, stay
                    selection, group size and customisation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom editorial rail */}
          <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 sm:mt-14">
            <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Explore · Experience · Belong
            </div>

            <a
              href="#overview"
              aria-label={`Explore ${packageData.name}`}
              className="group flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
            >
              Discover

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#1597C7]/60 group-hover:bg-[#1597C7]/10">
                <ArrowDown
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.7}
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}