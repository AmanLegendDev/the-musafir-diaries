"use client";

import { ArrowDownAZ, MapPinned, Search, Sparkles } from "lucide-react";

interface DestinationResultsHeaderProps {
  count: number;
  search: string;
  sort: string;
}

const SORT_LABELS: Record<string, string> = {
  featured: "Featured first",
  name: "Name: A–Z",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  rating: "Top Rated",
};

export default function DestinationResultsHeader({
  count,
  search,
  sort,
}: DestinationResultsHeaderProps) {
  const cleanSearch = search.trim();

  const resultLabel =
    count === 1 ? "destination" : "destinations";

  return (
    <div className="flex flex-col gap-5 border-b border-[#071A33]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <MapPinned
            className="h-4 w-4 text-[#087E8B]"
            strokeWidth={1.7}
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
            {cleanSearch
              ? "Search results"
              : "Destination collection"}
          </span>
        </div>

        <h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.025em] text-[#071A33] sm:text-3xl">
          {cleanSearch ? (
            <>
              Places matching{" "}
              <span className="text-[#087E8B]">
                “{cleanSearch}”
              </span>
            </>
          ) : (
            <>
              Find somewhere
              <span className="text-[#087E8B]">
                {" "}worth going.
              </span>
            </>
          )}
        </h2>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-2">
          <Sparkles
            className="h-3.5 w-3.5 text-[#F59E0B]"
            strokeWidth={1.8}
          />

          <span className="text-xs text-[#071A33]/50">
            <strong className="font-semibold text-[#071A33]">
              {count}
            </strong>{" "}
            {resultLabel}
          </span>
        </div>

        <div className="hidden h-4 w-px bg-[#071A33]/10 sm:block" />

        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#071A33]/35">
          {sort === "name" ? (
            <ArrowDownAZ className="h-3.5 w-3.5" />
          ) : (
            <Search className="h-3.5 w-3.5" />
          )}

          <span>{SORT_LABELS[sort] ?? "Featured first"}</span>
        </div>
      </div>
    </div>
  );
}