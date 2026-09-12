"use client";

import { Compass, RotateCcw } from "lucide-react";

type Props = {
  hasFilters: boolean;
  onReset?: () => void;
};

export default function FAQEmpty({
  hasFilters,
  onReset,
}: Props) {
  return (
    <div className="relative overflow-hidden border-y border-[#071A33]/10 bg-white px-6 py-16 text-center sm:px-10 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#FAF9F5] text-[#087E8B]">
          <Compass
            className="h-6 w-6"
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          Not quite the answer
        </p>

        <h3 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-[#071A33] sm:text-3xl">
          Nothing matched your search.
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#071A33]/45">
          {hasFilters
            ? "Try another question or clear your filters to explore all the answers we have gathered."
            : "Our travel team is always happy to help with questions that are not covered here."}
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