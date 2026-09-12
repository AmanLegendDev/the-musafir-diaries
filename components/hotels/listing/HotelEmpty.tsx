"use client";

import Link from "next/link";
import { ArrowRight, Hotel, SearchX } from "lucide-react";

type Props = {
  searching?: boolean;
  onClear?: () => void;
};

export default function HotelEmpty({
  searching = false,
  onClear,
}: Props) {
  return (
    <div className="rounded-[2rem] border border-[#071A33]/8 bg-[#FAF9F5] px-6 py-16 text-center sm:px-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071A33] text-white">
        {searching ? (
          <SearchX className="h-7 w-7" />
        ) : (
          <Hotel className="h-7 w-7" />
        )}
      </div>

      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#087E8B]">
        {searching ? "No match found" : "Stay collection"}
      </p>

      <h3 className="mx-auto mt-3 max-w-lg text-2xl font-semibold tracking-[-0.025em] text-[#071A33] sm:text-3xl">
        {searching
          ? "We couldn't find a stay matching your search."
          : "No stays are available here yet."}
      </h3>

      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#071A33]/55">
        {searching
          ? "Try another hotel name, area, or stay type. You can also clear the filters and explore the full collection."
          : "We're carefully building this collection of stays. Explore our destinations and discover where your journey can take you."}
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        {searching && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#071A33] px-6 text-sm font-semibold text-white transition hover:bg-[#087E8B]"
          >
            Clear filters
          </button>
        ) : null}

        <Link
          href="/destinations"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-6 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
        >
          Explore destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}