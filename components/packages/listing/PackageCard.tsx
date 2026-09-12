import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Users,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface PackageCardProps {
  packageData: IPackage;
  index: number;
}

function formatPrice(price: number) {
  return price > 0
    ? `₹${price.toLocaleString("en-IN")}`
    : null;
}

export default function PackageCard({
  packageData,
  index,
}: PackageCardProps) {
  const discountedPrice = formatPrice(
    packageData.discountedPrice
  );

  const originalPrice =
    packageData.originalPrice > 0
      ? formatPrice(packageData.originalPrice)
      : null;

  const hasDiscount =
    packageData.originalPrice > 0 &&
    packageData.discountedPrice > 0 &&
    packageData.discountedPrice <
      packageData.originalPrice;

  return (
    <article className="group relative overflow-hidden rounded-[28px] bg-[#071A33]">
      <Link
        href={`/packages/${packageData.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Explore ${packageData.name}`}
      />

      <div className="relative min-h-[500px] sm:min-h-[560px]">
        {packageData.heroImage ? (
          <Image
            src={packageData.heroImage}
            alt={packageData.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0D2747]" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/40 to-transparent"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#071A33]/10 transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Top metadata */}
        <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
          <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/30 px-2 text-[10px] font-semibold tracking-[0.12em] text-white/75 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>

          {packageData.difficulty && (
            <span className="rounded-full border border-white/15 bg-[#071A33]/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
              {packageData.difficulty}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#1597C7]">
            Curated Himalayan journey
          </p>

          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-4xl">
            {packageData.name}
          </h2>

          {packageData.shortDescription && (
            <p className="mt-4 line-clamp-2 max-w-xl text-sm leading-6 text-white/55">
              {packageData.shortDescription}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-4">
            {packageData.duration && (
              <div className="flex items-center gap-2 text-xs text-white/65">
                <Clock3
                  className="h-3.5 w-3.5 text-[#1597C7]"
                  strokeWidth={1.7}
                />
                {packageData.duration}
              </div>
            )}

            {packageData.groupSize && (
              <div className="flex items-center gap-2 text-xs text-white/65">
                <Users
                  className="h-3.5 w-3.5 text-[#1597C7]"
                  strokeWidth={1.7}
                />
                {packageData.groupSize}
              </div>
            )}

            {discountedPrice && (
              <span className="text-xs text-white/65">
                From{" "}
                <strong className="text-white">
                  {discountedPrice}
                </strong>
              </span>
            )}
          </div>

          {hasDiscount && originalPrice && (
            <div className="mt-2 text-[11px] text-white/35 line-through">
              {originalPrice}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
              Explore journey
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:border-[#1597C7]/60 group-hover:bg-[#1597C7]">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={1.7}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}