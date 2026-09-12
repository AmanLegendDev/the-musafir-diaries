import Link from "next/link";
import { ArrowRight, Compass, SearchX } from "lucide-react";

interface PackageEmptyProps {
  onClear?: () => void;
}

export default function PackageEmpty({
  onClear,
}: PackageEmptyProps) {
  return (
    <div className="rounded-[28px] border border-[#071A33]/10 bg-white px-6 py-16 text-center sm:px-10 sm:py-20">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 text-[#087E8B]">
        <SearchX
          className="h-6 w-6"
          strokeWidth={1.5}
        />
      </div>

      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
        No journeys found
      </p>

      <h3 className="mt-4 font-serif text-3xl font-medium tracking-[-0.03em] text-[#071A33] sm:text-4xl">
        Perhaps the right journey
        <span className="block text-[#087E8B]">
          is waiting to be shaped.
        </span>
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#071A33]/50 sm:text-base">
        Try adjusting your search or filters. If you already
        know what kind of experience you want, we can also help
        you plan something more personal.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-full border border-[#071A33]/15 bg-[#FAF9F5] px-5 py-3 text-sm font-semibold text-[#071A33] transition-colors hover:border-[#087E8B]/30 hover:text-[#087E8B]"
          >
            Clear filters
          </button>
        )}

        <Link
          href="/inquiry"
          className="inline-flex items-center gap-3 rounded-full bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#087E8B]"
        >
          Plan a custom journey

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <ArrowRight
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />
          </span>
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/25">
        <Compass
          className="h-3.5 w-3.5 text-[#F59E0B]"
          strokeWidth={1.6}
        />
        Explore · Experience · Belong
      </div>
    </div>
  );
}