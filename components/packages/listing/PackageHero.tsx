import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Mountain,
} from "lucide-react";

export default function PackageHero() {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#071A33] sm:min-h-[680px] lg:min-h-[700px]">
      <Image
        src="/images/home/hero/himalayan-hero.webp"
        alt="Himalayan journeys by The Musafir Diaries"
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
        className="absolute inset-0 bg-gradient-to-t from-[#071A33]/95 via-[#071A33]/25 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[620px] max-w-[1600px] items-end px-6 pb-12 pt-32 sm:min-h-[680px] sm:px-10 sm:pb-14 lg:min-h-[700px] lg:px-16 lg:pb-16 xl:px-20">
        <div className="w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Main copy */}
            <div className="lg:col-span-8 xl:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Curated Himalayan journeys
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
                Journeys
                <span className="block text-[#1597C7]">
                  worth remembering.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
                Thoughtfully crafted Himalayan journeys designed around
                beautiful places, meaningful experiences and the freedom
                to travel at your own pace.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Mountain
                    className="h-4 w-4 text-[#1597C7]"
                    strokeWidth={1.7}
                  />
                  Himalayan destinations
                </div>

                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Compass
                    className="h-4 w-4 text-[#1597C7]"
                    strokeWidth={1.7}
                  />
                  Curated experiences
                </div>
              </div>

              <div className="mt-9">
                <Link
                  href="#packages"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:bg-[#FAF9F5]"
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

            {/* Editorial side note */}
            <div className="hidden lg:col-span-4 lg:flex lg:justify-end xl:col-span-5">
              <div className="max-w-[290px] border-l border-white/20 pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                  The Musafir Diaries
                </p>

                <p className="mt-4 font-serif text-2xl leading-8 text-white/90">
                  Come for the mountains.
                  <span className="block text-white/55">
                    Leave with a story.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 sm:mt-14">
            <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Explore · Experience · Belong
            </div>

            <a
              href="#packages"
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