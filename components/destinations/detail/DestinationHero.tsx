import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Mountain,
  MapPin,
} from "lucide-react";

import type { Destination } from "@/lib/types/destination";

interface DestinationHeroProps {
  destination: Destination;
}

export default function DestinationHero({
  destination,
}: DestinationHeroProps) {
  const locationParts = [
    destination.city,
    destination.state,
    destination.country,
  ].filter(Boolean);

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#071A33] sm:min-h-[720px] lg:min-h-[760px]">
      {/* Destination image */}
      {destination.heroImage ? (
        <Image
          src={destination.heroImage}
          alt={`${destination.name} - ${locationParts.join(", ")}`}
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
      <div className="relative mx-auto flex min-h-[680px] max-w-[1600px] items-end px-6 pb-12 pt-28 sm:min-h-[720px] sm:px-10 sm:pb-14 lg:min-h-[760px] lg:px-16 lg:pb-16 xl:px-20">
        <div className="w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Main destination copy */}
            <div className="lg:col-span-8 xl:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  {destination.state || destination.country}
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-6xl font-medium leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
                {destination.name}
              </h1>

              {destination.shortDescription && (
                <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
                  {destination.shortDescription}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {destination.city && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <MapPin
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{destination.city}</span>
                  </div>
                )}

                {destination.altitude && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <Mountain
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{destination.altitude}</span>
                  </div>
                )}

                {destination.duration && (
                  <div className="flex items-center gap-2 text-xs text-white/65">
                    <Clock3
                      className="h-4 w-4 text-[#1597C7]"
                      strokeWidth={1.7}
                    />

                    <span>{destination.duration}</span>
                  </div>
                )}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#packages"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:bg-[#FAF9F5]"
                >
                  Explore journeys

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Editorial detail */}
            <div className="hidden lg:col-span-4 lg:flex lg:justify-end xl:col-span-5">
              <div className="max-w-[280px] border-l border-white/20 pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                  The Musafir Diaries
                </p>

                <p className="mt-4 font-serif text-2xl leading-8 text-white/90">
                  {destination.bestTime
                    ? `Best experienced ${destination.bestTime}.`
                    : "A place worth taking your time with."}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 sm:mt-14">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              <span>{destination.country}</span>

              <span className="h-1 w-1 rounded-full bg-[#F59E0B]" />

              <span>The Himalayas</span>
            </div>

            <a
              href="#overview"
              aria-label={`Explore ${destination.name}`}
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