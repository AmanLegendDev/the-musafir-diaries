import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";

const HERO_IMAGE = "/images/destinations/destinations-hero.webp";

export default function DestinationHero() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#071A33] sm:min-h-[760px] lg:min-h-[820px]">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Himalayan mountain landscape"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Cinematic overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#071A33]/35"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#071A33]/65 to-[#071A33]/15"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-[#071A33]/20"
      />

      {/* Subtle editorial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[720px] max-w-[1600px] items-end px-6 pb-14 pt-40 sm:min-h-[760px] sm:px-10 sm:pb-16 lg:min-h-[820px] lg:px-16 lg:pb-20 xl:px-20">
        <div className="w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Main copy */}
            <div className="lg:col-span-8 xl:col-span-7">
              {/* Eyebrow */}
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/75">
                  Explore the Himalayas
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
                Places worth
                <span className="block text-[#1597C7]">
                  wandering for.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
                From familiar mountain escapes to quieter Himalayan
                landscapes, discover destinations chosen for the way
                they make you feel — not simply the places they put
                on a map.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#destinations"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#FAF9F5]"
                >
                  Explore destinations

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>

                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Compass className="h-4 w-4 text-[#1597C7]" />
                  <span>Explore · Experience · Belong</span>
                </div>
              </div>
            </div>

            {/* Editorial side detail */}
            <div className="hidden lg:col-span-4 lg:flex lg:justify-end xl:col-span-5">
              <div className="max-w-[260px] border-l border-white/20 pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                  The Musafir Diaries
                </p>

                <p className="mt-4 font-serif text-xl leading-7 text-white/90">
                  Travel deeper.
                  <span className="block text-white/45">
                    Not simply farther.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom navigation cue */}
          <div className="mt-14 flex items-center justify-between border-t border-white/15 pt-5 sm:mt-16">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/35">
              <span>Himachal Pradesh</span>
              <span className="h-1 w-1 rounded-full bg-[#F59E0B]" />
              <span>India</span>
            </div>

            <a
              href="#destinations"
              aria-label="Scroll to destinations"
              className="group flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
            >
              Discover below

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#1597C7]/60 group-hover:bg-[#1597C7]/10">
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}