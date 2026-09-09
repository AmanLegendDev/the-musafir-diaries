"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Mountain,
  Star,
} from "lucide-react";

import type { Destination } from "@/lib/types/destination";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export default function DestinationCard({
  destination,
  index,
}: DestinationCardProps) {
  const hasRating =
    destination.rating > 0 &&
    destination.reviewCount > 0;

  const hasPrice =
    destination.startingPrice > 0;

  const number = String(index + 1).padStart(2, "0");

  /*
   * The first destination gets the strongest editorial treatment.
   * On larger screens, subsequent destinations occupy the right column.
   */
  const isFeaturedLayout = index === 0;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative overflow-hidden rounded-[28px] bg-[#071A33]",
        isFeaturedLayout
          ? "min-h-[560px] lg:col-span-7 lg:min-h-[700px]"
          : "min-h-[420px] lg:col-span-5 lg:min-h-[338px]",
      ].join(" ")}
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Explore ${destination.name}`}
      />

      {/* Image */}
      {destination.heroImage ? (
        <Image
          src={destination.heroImage}
          alt={`${destination.name} destination`}
          fill
          sizes={
            isFeaturedLayout
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D2747]" />
      )}

      {/* Cinematic overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/35 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#071A33]/10 transition-colors duration-500 group-hover:bg-[#071A33]/0"
      />

      {/* Top meta */}
      <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/30 px-2 text-[10px] font-semibold tracking-[0.12em] text-white/80 backdrop-blur-md">
            {number}
          </span>

          {destination.featured && (
            <span className="rounded-full border border-[#F59E0B]/30 bg-[#071A33]/35 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#F59E0B] backdrop-blur-md">
              Featured
            </span>
          )}
        </div>

        {hasRating && (
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#071A33]/35 px-3 py-2 text-xs text-white backdrop-blur-md">
            <Star
              className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]"
              strokeWidth={1.5}
            />

            <span className="font-semibold">
              {destination.rating.toFixed(1)}
            </span>

            <span className="text-white/40">
              ({destination.reviewCount})
            </span>
          </div>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-7">
        {/* Location */}
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1597C7]">
          <span>{destination.state || destination.country}</span>

          {destination.city && (
            <>
              <span className="h-1 w-1 rounded-full bg-[#F59E0B]" />
              <span className="text-white/50">
                {destination.city}
              </span>
            </>
          )}
        </div>

        {/* Name */}
        <h3
          className={[
            "mt-3 max-w-2xl font-serif font-medium leading-[0.98] tracking-[-0.035em] text-white",
            isFeaturedLayout
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl",
          ].join(" ")}
        >
          {destination.name}
        </h3>

        {/* Description */}
        {destination.shortDescription && (
          <p
            className={[
              "mt-4 max-w-xl text-sm leading-6 text-white/60",
              isFeaturedLayout ? "lg:max-w-lg" : "line-clamp-2",
            ].join(" ")}
          >
            {destination.shortDescription}
          </p>
        )}

        {/* Bottom details */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-4">
          {destination.duration && (
            <div className="flex items-center gap-2 text-xs text-white/65">
              <Clock3
                className="h-3.5 w-3.5 text-[#1597C7]"
                strokeWidth={1.7}
              />

              <span>{destination.duration}</span>
            </div>
          )}

          {destination.altitude && (
            <div className="flex items-center gap-2 text-xs text-white/65">
              <Mountain
                className="h-3.5 w-3.5 text-[#1597C7]"
                strokeWidth={1.7}
              />

              <span>{destination.altitude}</span>
            </div>
          )}

          {hasPrice && (
            <div className="text-xs text-white/65">
              From{" "}
              <span className="font-semibold text-white">
                ₹{destination.startingPrice.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>

        {/* Explore indicator */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
            Explore destination
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:border-[#1597C7]/60 group-hover:bg-[#1597C7] group-hover:text-white">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
              strokeWidth={1.8}
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}