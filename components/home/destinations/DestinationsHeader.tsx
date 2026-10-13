
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS_SECTION } from "./destinationsData";

export default function DestinationsHeader() {
  return (
    <div className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#F59E0B] sm:w-12"
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B] sm:text-xs">
            {DESTINATIONS_SECTION.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="destinations-heading"
          className="mt-5 font-serif text-[42px] leading-[0.98] tracking-[-0.035em] text-[#071A33] sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          {DESTINATIONS_SECTION.title.lineOne}
          <br />
          <span className="text-[#087E8B]">
            {DESTINATIONS_SECTION.title.lineTwo}
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-7 text-[#0D2747]/70 sm:text-lg sm:leading-8">
          {DESTINATIONS_SECTION.description}
        </p>
      </div>

      {/* Explore all CTA */}
      <div className="shrink-0">
        <Link
          href={DESTINATIONS_SECTION.exploreHref}
          className="group inline-flex items-center gap-4 rounded-full text-sm font-semibold text-[#071A33] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#087E8B]/20"
        >
          <span className="relative pb-1">
            {DESTINATIONS_SECTION.exploreLabel}

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#087E8B] transition-transform duration-300 group-hover:scale-x-0 motion-reduce:transition-none"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#F59E0B] transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071A33]/15 bg-white transition-colors duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B] group-hover:text-white motion-reduce:transition-none">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
        </Link>
      </div>
    </div>
  );
}
