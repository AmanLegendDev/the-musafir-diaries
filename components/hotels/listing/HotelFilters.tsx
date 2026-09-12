"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

export type HotelType =
  | "all"
  | "hotel"
  | "resort"
  | "boutique"
  | "homestay"
  | "villa"
  | "guesthouse"
  | "camp"
  | "other";

export type HotelSort =
  | "featured"
  | "name"
  | "stars-high"
  | "rating-high";

type Props = {
  hotelType: HotelType;
  starRating: string;
  featured: boolean;
  sort: HotelSort;
  onHotelTypeChange: (value: HotelType) => void;
  onStarRatingChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
  onSortChange: (value: HotelSort) => void;
};

const HOTEL_TYPES: { value: HotelType; label: string }[] = [
  { value: "all", label: "All stays" },
  { value: "hotel", label: "Hotels" },
  { value: "resort", label: "Resorts" },
  { value: "boutique", label: "Boutique" },
  { value: "homestay", label: "Homestays" },
  { value: "villa", label: "Villas" },
  { value: "guesthouse", label: "Guesthouses" },
  { value: "camp", label: "Camps" },
  { value: "other", label: "Other" },
];

const STAR_OPTIONS = [
  { value: "all", label: "Any rating" },
  { value: "5", label: "5 star" },
  { value: "4", label: "4 star" },
  { value: "3", label: "3 star" },
  { value: "2", label: "2 star" },
  { value: "1", label: "1 star" },
];

const SORT_OPTIONS: { value: HotelSort; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "name", label: "Name A–Z" },
  { value: "stars-high", label: "Highest star rating" },
  { value: "rating-high", label: "Highest guest rating" },
];

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="min-w-[160px]">
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/45">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-[#071A33]/10 bg-white px-4 pr-10 text-sm font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/50 focus:ring-4 focus:ring-[#087E8B]/10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071A33]/45" />
      </div>
    </div>
  );
}

export default function HotelFilters({
  hotelType,
  starRating,
  featured,
  sort,
  onHotelTypeChange,
  onStarRatingChange,
  onFeaturedChange,
  onSortChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#071A33]/8 bg-[#FAF9F5] p-4 sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Filter heading */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071A33] text-white">
            <SlidersHorizontal className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#071A33]">
              Refine your stay
            </p>
            <p className="mt-0.5 text-xs text-[#071A33]/45">
              Find the right place for your journey
            </p>
          </div>
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap">
          <SelectField
            label="Stay type"
            value={hotelType}
            onChange={(value) =>
              onHotelTypeChange(value as HotelType)
            }
            options={HOTEL_TYPES}
          />

          <SelectField
            label="Stars"
            value={starRating}
            onChange={onStarRatingChange}
            options={STAR_OPTIONS}
          />

          <SelectField
            label="Sort by"
            value={sort}
            onChange={(value) => onSortChange(value as HotelSort)}
            options={SORT_OPTIONS}
          />

          {/* Featured */}
          <div className="min-w-[160px]">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/45">
              Collection
            </span>

            <button
              type="button"
              onClick={() => onFeaturedChange(!featured)}
              className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition ${
                featured
                  ? "border-[#087E8B]/30 bg-[#087E8B]/10 text-[#071A33]"
                  : "border-[#071A33]/10 bg-white text-[#071A33]/60 hover:border-[#071A33]/20"
              }`}
              aria-pressed={featured}
            >
              <span>Featured stays</span>

              <span
                className={`relative h-5 w-9 rounded-full transition ${
                  featured ? "bg-[#087E8B]" : "bg-[#071A33]/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    featured ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}