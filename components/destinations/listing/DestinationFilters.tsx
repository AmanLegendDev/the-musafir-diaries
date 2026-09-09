"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useId } from "react";

interface DestinationFiltersProps {
  state: string;
  featured: string;
  sort: string;

  states: string[];

  onStateChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const selectBaseClass =
  "h-12 w-full appearance-none rounded-full border border-[#071A33]/10 bg-[#FAF9F5] px-5 pr-11 text-sm text-[#071A33] outline-none transition-all duration-200 hover:border-[#071A33]/20 focus:border-[#087E8B]/45 focus:bg-white focus:ring-4 focus:ring-[#087E8B]/5";

export default function DestinationFilters({
  state,
  featured,
  sort,
  states,
  onStateChange,
  onFeaturedChange,
  onSortChange,
}: DestinationFiltersProps) {
  const stateId = useId();
  const featuredId = useId();
  const sortId = useId();

  return (
    <section
      aria-label="Destination filters"
      className="rounded-[24px] border border-[#071A33]/10 bg-white p-4 shadow-[0_8px_30px_rgba(7,26,51,0.03)] sm:p-5 lg:p-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Label */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#087E8B]/8">
            <SlidersHorizontal
              className="h-4 w-4 text-[#087E8B]"
              strokeWidth={1.8}
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
              Refine your journey
            </p>

            <p className="mt-1 text-xs text-[#071A33]/40">
              Find a place that feels right
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:w-auto lg:min-w-[680px] lg:justify-end">
          {/* Region */}
          <div className="relative lg:w-[210px]">
            <label htmlFor={stateId} className="sr-only">
              Filter by region
            </label>

            <select
              id={stateId}
              value={state}
              onChange={(event) => onStateChange(event.target.value)}
              className={selectBaseClass}
            >
              <option value="all">All regions</option>

              {states.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071A33]/40"
              strokeWidth={1.8}
            />
          </div>

          {/* Journey */}
          <div className="relative lg:w-[210px]">
            <label htmlFor={featuredId} className="sr-only">
              Filter by journey type
            </label>

            <select
              id={featuredId}
              value={featured}
              onChange={(event) => onFeaturedChange(event.target.value)}
              className={selectBaseClass}
            >
              <option value="all">All destinations</option>
              <option value="featured">Featured only</option>
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071A33]/40"
              strokeWidth={1.8}
            />
          </div>

          {/* Sort */}
          <div className="relative sm:col-span-2 lg:w-[210px]">
            <label htmlFor={sortId} className="sr-only">
              Sort destinations
            </label>

            <select
              id={sortId}
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
              className={selectBaseClass}
            >
              <option value="featured">Featured first</option>
              <option value="name">Name: A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071A33]/40"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
}