"use client";

import { X } from "lucide-react";
import type { HotelSort, HotelType } from "./HotelFilters";

type Props = {
  search: string;
  hotelType: HotelType;
  starRating: string;
  featured: boolean;
  sort: HotelSort;
  onSearchClear: () => void;
  onHotelTypeClear: () => void;
  onStarRatingClear: () => void;
  onFeaturedClear: () => void;
  onSortClear: () => void;
  onClearAll: () => void;
};

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#087E8B]/15 bg-[#087E8B]/7 px-3 py-1.5 text-xs font-medium text-[#071A33]">
      {label}

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="flex h-4 w-4 items-center justify-center rounded-full text-[#071A33]/45 transition hover:bg-[#071A33]/10 hover:text-[#071A33]"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

const typeLabels: Record<HotelType, string> = {
  all: "All stays",
  hotel: "Hotels",
  resort: "Resorts",
  boutique: "Boutique",
  homestay: "Homestays",
  villa: "Villas",
  guesthouse: "Guesthouses",
  camp: "Camps",
  other: "Other",
};

const sortLabels: Record<HotelSort, string> = {
  featured: "Featured first",
  name: "Name A–Z",
  "stars-high": "Highest stars",
  "rating-high": "Highest guest rating",
};

export default function HotelActiveFilters({
  search,
  hotelType,
  starRating,
  featured,
  sort,
  onSearchClear,
  onHotelTypeClear,
  onStarRatingClear,
  onFeaturedClear,
  onSortClear,
  onClearAll,
}: Props) {
  const hasFilters =
    Boolean(search) ||
    hotelType !== "all" ||
    starRating !== "all" ||
    featured ||
    sort !== "featured";

  if (!hasFilters) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/40">
        Active
      </span>

      {search && (
        <FilterChip
          label={`Search: ${search}`}
          onRemove={onSearchClear}
        />
      )}

      {hotelType !== "all" && (
        <FilterChip
          label={typeLabels[hotelType]}
          onRemove={onHotelTypeClear}
        />
      )}

      {starRating !== "all" && (
        <FilterChip
          label={`${starRating} star`}
          onRemove={onStarRatingClear}
        />
      )}

      {featured && (
        <FilterChip
          label="Featured stays"
          onRemove={onFeaturedClear}
        />
      )}

      {sort !== "featured" && (
        <FilterChip
          label={sortLabels[sort]}
          onRemove={onSortClear}
        />
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-xs font-semibold text-[#F06A5B] transition hover:text-[#071A33]"
      >
        Clear all
      </button>
    </div>
  );
}