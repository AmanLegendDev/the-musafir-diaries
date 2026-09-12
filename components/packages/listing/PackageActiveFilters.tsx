"use client";

import { X } from "lucide-react";

interface PackageActiveFiltersProps {
  search: string;
  difficulty: string;
  featured: string;
  onClearSearch: () => void;
  onClearDifficulty: () => void;
  onClearFeatured: () => void;
  onClearAll: () => void;
}

export default function PackageActiveFilters({
  search,
  difficulty,
  featured,
  onClearSearch,
  onClearDifficulty,
  onClearFeatured,
  onClearAll,
}: PackageActiveFiltersProps) {
  const hasFilters =
    Boolean(search.trim()) ||
    difficulty !== "all" ||
    featured === "featured";

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
        Active
      </span>

      {search.trim() && (
        <button
          type="button"
          onClick={onClearSearch}
          className="inline-flex items-center gap-2 rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 px-3.5 py-2 text-[10px] font-semibold text-[#087E8B] transition hover:bg-[#087E8B]/10"
        >
          Search: {search.trim()}

          <X
            className="h-3 w-3"
            strokeWidth={2}
          />
        </button>
      )}

      {difficulty !== "all" && (
        <button
          type="button"
          onClick={onClearDifficulty}
          className="inline-flex items-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-3.5 py-2 text-[10px] font-semibold capitalize text-[#071A33]/65 transition hover:border-[#087E8B]/25 hover:text-[#087E8B]"
        >
          {difficulty}

          <X
            className="h-3 w-3"
            strokeWidth={2}
          />
        </button>
      )}

      {featured === "featured" && (
        <button
          type="button"
          onClick={onClearFeatured}
          className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/5 px-3.5 py-2 text-[10px] font-semibold text-[#071A33] transition hover:bg-[#F59E0B]/10"
        >
          Featured

          <X
            className="h-3 w-3"
            strokeWidth={2}
          />
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/35 underline-offset-4 transition hover:text-[#087E8B] hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}