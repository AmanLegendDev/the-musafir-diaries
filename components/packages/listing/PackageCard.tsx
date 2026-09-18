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
  return price > 0 ? `₹${price.toLocaleString("en-IN")}` : null;
}

export default function PackageCard({
  packageData,
  index,
}: PackageCardProps) {
  const discountedPrice = formatPrice(packageData.discountedPrice);

  const originalPrice =
    packageData.originalPrice > 0
      ? formatPrice(packageData.originalPrice)
      : null;

  const hasDiscount =
    packageData.originalPrice > 0 &&
    packageData.discountedPrice > 0 &&
    packageData.discountedPrice < packageData.originalPrice;

  return (
    <article
      className="
        group
        relative
        w-[calc(100%+48px)]
        -ml-6
        overflow-hidden
        rounded-[30px]
        bg-[#071A33]
        shadow-[0_18px_60px_rgba(7,26,51,0.10)]
        transition-transform
        duration-500
        hover:-translate-y-1
        sm:ml-0
        sm:w-full
      "
    >
      <Link
        href={`/packages/${packageData.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Explore ${packageData.name}`}
      />

      <div className="relative h-[520px] w-full sm:h-[560px] lg:h-[580px]">
        {/* Hero Image */}
        {packageData.heroImage ? (
          <Image
            src={packageData.heroImage}
            alt={packageData.name}
            fill
            priority={index < 2}
            quality={95}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.035]
            "
          />
        ) : (
          <div className="absolute inset-0 bg-[#0D2747]" />
        )}

        {/* Light cinematic overlay */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#071A33]/10
            via-transparent
            to-[#071A33]/95
          "
        />

        {/* Bottom readability gradient */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            bottom-0
            h-[64%]
            bg-gradient-to-t
            from-[#071A33]
            via-[#071A33]/65
            to-transparent
          "
        />

        {/* Top metadata */}
        <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
          <span className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/30 px-2.5 text-[10px] font-semibold tracking-[0.12em] text-white/85 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>

          {packageData.difficulty && (
            <span className="rounded-full border border-white/15 bg-[#071A33]/30 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
              {packageData.difficulty}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7 lg:p-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
            Curated Himalayan journey
          </p>

          <h2
            className="
              mt-3
              max-w-[96%]
              font-serif
              text-[29px]
              font-medium
              leading-[0.98]
              tracking-[-0.035em]
              text-white
              sm:text-[33px]
              lg:text-[35px]
            "
          >
            {packageData.name}
          </h2>

          {packageData.shortDescription && (
            <p className="mt-4 max-w-[96%] line-clamp-2 text-[14px] leading-6 text-white/70">
              {packageData.shortDescription}
            </p>
          )}

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-4">
            {packageData.duration && (
              <div className="flex items-center gap-2 text-[12px] text-white/70">
                <Clock3
                  className="h-4 w-4 shrink-0 text-[#1597C7]"
                  strokeWidth={1.7}
                />
                <span>{packageData.duration}</span>
              </div>
            )}

            {packageData.groupSize && (
              <div className="flex items-center gap-2 text-[12px] text-white/70">
                <Users
                  className="h-4 w-4 shrink-0 text-[#1597C7]"
                  strokeWidth={1.7}
                />
                <span>{packageData.groupSize}</span>
              </div>
            )}
          </div>

          {/* Price */}
          {discountedPrice && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[12px] text-white/60">
                From
              </span>

              <strong className="text-[15px] font-semibold text-white">
                {discountedPrice}
              </strong>

              {hasDiscount && originalPrice && (
                <span className="text-[11px] text-white/40 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          )}

          {/* Action */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 group-hover:text-white/80">
              Explore journey
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-all duration-300 group-hover:border-[#1597C7]/70 group-hover:bg-[#1597C7]">
              <ArrowUpRight
                className="h-[17px] w-[17px] transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={1.7}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}