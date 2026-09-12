"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export type TestimonialRatingFilter =
  | "all"
  | "5"
  | "4"
  | "3";

export type TestimonialSort =
  | "featured"
  | "highest-rated"
  | "latest";

type Props = {
  search: string;
  rating: TestimonialRatingFilter;
  sort: TestimonialSort;
  onSearchChange: (value: string) => void;
  onRatingChange: (value: TestimonialRatingFilter) => void;
  onSortChange: (value: TestimonialSort) => void;
};

export default function TestimonialFilters({
  search,
  rating,
  sort,
  onSearchChange,
  onRatingChange,
  onSortChange,
}: Props) {
  return (
    <div className="rounded-[1.75rem] border border-[#071A33]/8 bg-[#F5F3ED] p-4 sm:p-5">
      {/* Search */}
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#071A33]/35"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search guest stories, places & journeys..."
          aria-label="Search guest stories"
          className="h-14 w-full rounded-2xl border border-[#071A33]/10 bg-white pl-14 pr-12 text-sm text-[#071A33] outline-none transition placeholder:text-[#071A33]/35 focus:border-[#087E8B]/50 focus:ring-4 focus:ring-[#087E8B]/10"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear testimonial search"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#071A33]/40 transition hover:bg-[#FAF9F5] hover:text-[#071A33]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Rating */}
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="mr-1 shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
            Rating
          </span>

          {(
            [
              ["all", "All"],
              ["5", "5 ★"],
              ["4", "4 ★"],
              ["3", "3 ★"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                onRatingChange(
                  value as TestimonialRatingFilter
                )
              }
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                rating === value
                  ? "bg-[#071A33] text-white"
                  : "bg-white text-[#071A33]/60 hover:bg-[#087E8B]/8 hover:text-[#087E8B]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex shrink-0 items-center gap-2">
          <SlidersHorizontal
            aria-hidden="true"
            className="h-4 w-4 text-[#071A33]/35"
          />

          <label
            htmlFor="testimonial-sort"
            className="sr-only"
          >
            Sort guest stories
          </label>

          <select
            id="testimonial-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(
                event.target.value as TestimonialSort
              )
            }
            className="h-11 rounded-xl border border-[#071A33]/10 bg-white px-3 text-sm font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/10"
          >
            <option value="featured">
              Featured first
            </option>

            <option value="highest-rated">
              Highest rated
            </option>

            <option value="latest">
              Latest stories
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}