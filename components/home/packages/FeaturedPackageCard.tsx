"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { HomePackage } from "./FeaturedPackagesGrid";

interface FeaturedPackageCardProps {
  packageData: HomePackage;
  featured?: boolean;
  priority?: boolean;
  position: number;
}

export default function FeaturedPackageCard({
  packageData,
  featured = false,
  priority = false,
  position,
}: FeaturedPackageCardProps) {
  const image =
    packageData.heroImage ||
    packageData.gallery?.[0] ||
    "";

  const destinationName =
    packageData.destination?.name || "";

  const hasDiscount =
    packageData.discountedPrice > 0 &&
    packageData.originalPrice > 0 &&
    packageData.discountedPrice <
      packageData.originalPrice;

  const hasPrice =
    packageData.discountedPrice > 0 ||
    packageData.originalPrice > 0;

  const displayPrice =
    packageData.discountedPrice > 0
      ? packageData.discountedPrice
      : packageData.originalPrice;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((packageData.originalPrice -
          packageData.discountedPrice) /
          packageData.originalPrice) *
          100
      )
    : 0;

  const highlights =
    packageData.highlights?.filter(Boolean).slice(0, 2) || [];

  return (
    <Link
      href={`/packages/${packageData.slug}`}
      aria-label={`Explore ${packageData.name}`}
      className="group block h-full"
    >
      <article
        className={[
          "relative isolate h-full overflow-hidden rounded-[28px] bg-[#071A33]",
          "shadow-[0_18px_50px_rgba(7,26,51,0.12)]",
          featured
            ? "min-h-[540px] sm:min-h-[590px] lg:min-h-[620px]"
            : "min-h-[320px] sm:min-h-[350px] lg:min-h-[296px]",
        ].join(" ")}
      >
        {/* Image */}
        {image ? (
          <Image
            src={image}
            alt={`${packageData.name}${
              destinationName
                ? `, ${destinationName}`
                : ""
            }`}
            fill
            priority={priority}
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 58vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
            }
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0D2747]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(21,151,199,0.2),transparent_42%)]" />
          </div>
        )}

        {/* Cinematic overlay */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0",
            featured
              ? "bg-gradient-to-t from-[#071A33] via-[#071A33]/35 to-transparent"
              : "bg-gradient-to-t from-[#071A33] via-[#071A33]/45 to-transparent",
          ].join(" ")}
        />

        {/* Top accent */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 h-px w-10 bg-[#F59E0B] transition-all duration-500 group-hover:w-16"
        />

        {/* Number */}
        <span className="absolute right-6 top-5 font-serif text-sm text-white/50">
          {String(position).padStart(2, "0")}
        </span>

        {/* Featured badge */}
        {featured && (
          <div className="absolute left-6 top-10">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-[#071A33]/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
              Featured Journey
            </span>
          </div>
        )}

        {/* Content */}
        <div
          className={[
            "absolute inset-x-0 bottom-0",
            featured
              ? "p-6 sm:p-8 lg:p-9"
              : "p-5 sm:p-6",
          ].join(" ")}
        >
          {/* Destination */}
          {destinationName && (
            <div className="mb-3 flex items-center gap-2 text-white/65">
              <MapPin className="h-3.5 w-3.5 text-[#1597C7]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.18em]">
                {destinationName}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className={[
              "max-w-2xl font-serif leading-[0.95] tracking-[-0.025em] text-white",
              featured
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-2xl sm:text-3xl",
            ].join(" ")}
          >
            {packageData.name}
          </h3>

          {/* Description */}
          {packageData.shortDescription && (
            <p
              className={[
                "mt-4 leading-6 text-white/70",
                featured
                  ? "max-w-xl text-sm sm:text-base"
                  : "line-clamp-2 max-w-lg text-xs sm:text-sm",
              ].join(" ")}
            >
              {packageData.shortDescription}
            </p>
          )}

          {/* Bottom details */}
          <div
            className={[
              "flex gap-4 border-t border-white/15 pt-5",
              featured
                ? "mt-6 items-end justify-between"
                : "mt-5 items-center justify-between",
            ].join(" ")}
          >
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3">
              {/* Duration */}
              {packageData.duration && (
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/85">
                    {packageData.duration}
                  </p>
                </div>
              )}

              {/* Difficulty */}
              {packageData.difficulty && (
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Style
                  </p>

                  <p className="mt-1 text-xs font-medium capitalize text-white/85">
                    {packageData.difficulty}
                  </p>
                </div>
              )}

              {/* Price */}
              {hasPrice && (
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Starting from
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      ₹{displayPrice.toLocaleString("en-IN")}
                    </span>

                    {hasDiscount && (
                      <span className="text-[10px] text-white/40 line-through">
                        ₹{packageData.originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Arrow */}
            <span
              aria-hidden="true"
              className={[
                "flex shrink-0 items-center justify-center rounded-full",
                "bg-[#FAF9F5] text-[#071A33]",
                "transition-all duration-500",
                "group-hover:rotate-45 group-hover:bg-[#087E8B] group-hover:text-white",
                featured
                  ? "h-12 w-12"
                  : "h-10 w-10",
              ].join(" ")}
            >
              <ArrowUpRight
                className={
                  featured
                    ? "h-5 w-5"
                    : "h-4 w-4"
                }
              />
            </span>
          </div>

          {/* Highlights */}
          {featured && highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-medium text-white/65 backdrop-blur-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Discount */}
          {featured && discountPercentage > 0 && (
            <span className="absolute right-6 bottom-[88px] rounded-full bg-[#F59E0B] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#071A33]">
              {discountPercentage}% off
            </span>
          )}
        </div>

        {/* Hover border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/0 transition-colors duration-500 group-hover:border-white/20"
        />
      </article>
    </Link>
  );
}