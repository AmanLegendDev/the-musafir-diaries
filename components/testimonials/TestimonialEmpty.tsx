"use client";

import { Compass, RotateCcw } from "lucide-react";

type Props = {
  hasFilters: boolean;
  onReset?: () => void;
};

export default function TestimonialEmpty({
  hasFilters,
  onReset,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#071A33]/8 bg-white px-6 py-16 text-center sm:px-10 sm:py-20">
      {/* Decorative elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071A33] text-white shadow-lg">
          <Compass className="h-7 w-7" strokeWidth={1.7} />
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          The road is still calling
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#071A33]">
          No stories found
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
          {hasFilters
            ? "Try changing your search or filters to discover more memories from our travellers."
            : "Guest stories will appear here as more travellers share their journeys with us."}
        </p>

        {hasFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <RotateCcw className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}