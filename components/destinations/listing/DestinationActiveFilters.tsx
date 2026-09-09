"use client";

import { X, RotateCcw } from "lucide-react";

interface DestinationActiveFiltersProps {
  state: string;
  featured: string;

  onClearState: () => void;
  onClearFeatured: () => void;
  onClearAll: () => void;
}

export default function DestinationActiveFilters({
  state,
  featured,
  onClearState,
  onClearFeatured,
  onClearAll,
}: DestinationActiveFiltersProps) {
  const hasStateFilter = state !== "all";
  const hasFeaturedFilter = featured === "featured";

  const hasFilters = hasStateFilter || hasFeaturedFilter;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
        Active
      </span>

      {hasStateFilter && (
        <button
          type="button"
          onClick={onClearState}
          className="group inline-flex items-center gap-2 rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 px-3.5 py-2 text-xs font-medium text-[#087E8B] transition-all duration-200 hover:border-[#087E8B]/35 hover:bg-[#087E8B]/10"
        >
          {state}

          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#087E8B]/10 transition-colors group-hover:bg-[#087E8B]/20">
            <X className="h-3 w-3" strokeWidth={2} />
          </span>
        </button>
      )}

      {hasFeaturedFilter && (
        <button
          type="button"
          onClick={onClearFeatured}
          className="group inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/8 px-3.5 py-2 text-xs font-medium text-[#9A6500] transition-all duration-200 hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/12"
        >
          Featured only

          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F59E0B]/10 transition-colors group-hover:bg-[#F59E0B]/20">
            <X className="h-3 w-3" strokeWidth={2} />
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-[#071A33]/45 transition-colors hover:text-[#087E8B]"
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
        Clear all
      </button>
    </div>
  );
}