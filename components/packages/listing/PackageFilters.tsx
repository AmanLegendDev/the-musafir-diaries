"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface PackageFiltersProps {
  difficulty: string;
  featured: string;
  sort: string;
  onDifficultyChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function PackageFilters({
  difficulty,
  featured,
  sort,
  onDifficultyChange,
  onFeaturedChange,
  onSortChange,
}: PackageFiltersProps) {
  return (
    <div className="rounded-[24px] border border-[#071A33]/10 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Label */}
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF9F5] text-[#087E8B]">
            <SlidersHorizontal
              className="h-4 w-4"
              strokeWidth={1.7}
            />
          </span>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
              Refine your journey
            </p>

            <p className="mt-0.5 text-xs text-[#071A33]/40">
              Find a trip that fits your style
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:items-center">
          {/* Difficulty */}
          <label className="relative">
            <span className="sr-only">
              Difficulty
            </span>

            <select
              value={difficulty}
              onChange={(event) =>
                onDifficultyChange(
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-full border border-[#071A33]/10 bg-[#FAF9F5] px-4 pr-10 text-xs font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/5 lg:w-[155px]"
            >
              <option value="all">
                All difficulty
              </option>
              <option value="easy">
                Easy
              </option>
              <option value="moderate">
                Moderate
              </option>
              <option value="difficult">
                Difficult
              </option>
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#071A33]/35"
              strokeWidth={1.7}
            />
          </label>

          {/* Featured */}
          <label className="relative">
            <span className="sr-only">
              Featured
            </span>

            <select
              value={featured}
              onChange={(event) =>
                onFeaturedChange(
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-full border border-[#071A33]/10 bg-[#FAF9F5] px-4 pr-10 text-xs font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/5 lg:w-[145px]"
            >
              <option value="all">
                All journeys
              </option>
              <option value="featured">
                Featured only
              </option>
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#071A33]/35"
              strokeWidth={1.7}
            />
          </label>

          {/* Sort */}
          <label className="relative">
            <span className="sr-only">
              Sort journeys
            </span>

            <select
              value={sort}
              onChange={(event) =>
                onSortChange(
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-full border border-[#071A33]/10 bg-[#FAF9F5] px-4 pr-10 text-xs font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/5 lg:w-[175px]"
            >
              <option value="default">
                Recommended
              </option>
              <option value="price-low">
                Price: Low to high
              </option>
              <option value="price-high">
                Price: High to low
              </option>
              <option value="duration">
                Shortest first
              </option>
              <option value="name">
                Name: A–Z
              </option>
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#071A33]/35"
              strokeWidth={1.7}
            />
          </label>
        </div>
      </div>
    </div>
  );
}