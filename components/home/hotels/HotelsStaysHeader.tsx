import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HotelsStaysHeader() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#F59E0B]"
          />

          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
            Where You Stay
          </span>
        </div>

        {/* Heading */}
        <h2
          id="hotels-heading"
          className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl"
        >
          Beautiful stays,
          <br />
          <span className="text-[#087E8B]">
            chosen for the journey.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#071A33]/65 sm:text-lg sm:leading-8">
          From mountain-view hotels to intimate stays, discover places that
          make every journey feel a little more special.
        </p>
      </div>

      {/* Explore CTA */}
      <Link
        href="/hotels"
        className="group inline-flex w-fit items-center gap-3 border-b border-[#071A33]/20 pb-2 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:border-[#F59E0B] hover:text-[#087E8B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087E8B]"
      >
        <span>Explore all stays</span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#071A33]/15 transition-all duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B] group-hover:text-white">
          <ArrowUpRight
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </Link>
    </div>
  );
}