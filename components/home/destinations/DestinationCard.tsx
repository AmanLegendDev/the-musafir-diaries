"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

import type { HomeDestination } from "./DestinationsSection";

interface DestinationCardProps {
  destination: HomeDestination;
  featured?: boolean;
  priority?: boolean;
}

export default function DestinationCard({
  destination,
  featured = false,
  priority = false,
}: DestinationCardProps) {
  const image =
    destination.heroImage ||
    destination.gallery?.[0] ||
    "";

  const hasRating =
    destination.rating > 0 &&
    destination.reviewCount > 0;

  const hasPrice =
    destination.startingPrice > 0;

  const location = [
    destination.city,
    destination.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      aria-label={`Explore ${destination.name}`}
      className="group block h-full"
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={[
          "relative isolate h-full min-h-[390px] overflow-hidden rounded-[28px] bg-[#071A33] shadow-[0_18px_50px_rgba(7,26,51,0.12)]",
          featured
            ? "sm:min-h-[520px] lg:min-h-[580px]"
            : "sm:min-h-[420px] lg:min-h-[460px]",
        ].join(" ")}
      >
        {/* IMAGE */}
        {image ? (
          <Image
            src={image}
            alt={`${destination.name}, ${destination.state || destination.country}`}
            fill
            priority={priority}
            sizes={
              featured
                ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 58vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
            }
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0D2747]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(21,151,199,0.22),transparent_40%)]" />
          </div>
        )}

        {/* IMAGE TINT */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/30 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* TOP ACCENT */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 h-px w-10 bg-[#F59E0B] transition-all duration-500 group-hover:w-16"
        />

        {/* DESTINATION NUMBER */}
        <div className="absolute right-6 top-5">
          <span className="font-serif text-sm text-white/55">
            {featured ? "01" : "02"}
          </span>
        </div>

        {/* CONTENT */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
          {/* LOCATION */}
          {location && (
            <div className="mb-3 flex items-center gap-2 text-white/65">
              <MapPin className="h-3.5 w-3.5 text-[#1597C7]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                {location}
              </span>
            </div>
          )}

          {/* NAME */}
          <h3
            className={[
              "font-serif leading-[0.95] tracking-[-0.025em] text-white",
              featured
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-3xl sm:text-4xl",
            ].join(" ")}
          >
            {destination.name}
          </h3>

          {/* DESCRIPTION */}
          {destination.shortDescription && (
            <p
              className={[
                "mt-4 max-w-xl leading-6 text-white/70",
                featured
                  ? "text-sm sm:text-base"
                  : "line-clamp-2 text-sm",
              ].join(" ")}
            >
              {destination.shortDescription}
            </p>
          )}

          {/* META + CTA */}
          <div className="mt-6 flex items-end justify-between gap-5 border-t border-white/15 pt-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {destination.duration && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/85">
                    {destination.duration}
                  </p>
                </div>
              )}

              {hasPrice && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                    Starting from
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white">
                    ₹{destination.startingPrice.toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              {hasRating && (
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />

                  <span className="text-xs font-semibold text-white">
                    {destination.rating.toFixed(1)}
                  </span>

                  <span className="text-[10px] text-white/45">
                    ({destination.reviewCount})
                  </span>
                </div>
              )}
            </div>

            {/* ARROW */}
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAF9F5] text-[#071A33] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#087E8B] group-hover:text-white"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* HOVER BORDER */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/0 transition-colors duration-500 group-hover:border-white/20"
        />
      </motion.article>
    </Link>
  );
}