import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Mountain,
} from "lucide-react";

export default function PackageCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      {/* Accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-28 bg-[#F59E0B] sm:w-40"
      />

      {/* Decorative geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#1597C7]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-[#1597C7]/8"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1597C7]">
                Your journey, your way
              </span>
            </div>

            <h2 className="mt-6 max-w-4xl font-serif text-4xl font-medium leading-[1.03] tracking-[-0.04em] text-[#FAF9F5] sm:text-5xl lg:text-6xl xl:text-7xl">
              Don&apos;t see exactly
              <span className="block text-[#1597C7]">
                what you&apos;re looking for?
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Tell us where you want to go, when you want to travel
              and what kind of experience you have in mind. We can
              help shape a journey around you.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end">
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:bg-[#FAF9F5]"
            >
              Plan a custom journey

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25">
            <Mountain
              className="h-4 w-4 text-[#1597C7]"
              strokeWidth={1.6}
            />
            Himalayan journeys
          </div>

          <span className="hidden h-1 w-1 rounded-full bg-[#F59E0B] sm:block" />

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25">
            <Compass
              className="h-4 w-4 text-[#1597C7]"
              strokeWidth={1.6}
            />
            Explore · Experience · Belong
          </div>
        </div>
      </div>
    </section>
  );
}