"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import HotelSearch from "./HotelSearch";
import HotelFilters, {
  type HotelSort,
  type HotelType,
} from "./HotelFilters";
import HotelActiveFilters from "./HotelActiveFilters";
import HotelResultsHeader from "./HotelResultsHeader";
import HotelGrid, { type HotelListItem } from "./HotelGrid";
import HotelEmpty from "./HotelEmpty";

import {
  filterHotels,
  type HotelFilterState,
} from "@/lib/utils/hotel-filter";

type Props = {
  hotels: HotelListItem[];
  destinationName?: string;
};

type ViewMode = "grid" | "list";

function getParam(
  searchParams: URLSearchParams,
  key: string,
  fallback: string
) {
  return searchParams.get(key) || fallback;
}

export default function HotelListing({
  hotels,
  destinationName,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * Initial state comes from the URL.
   * This keeps the page shareable and refresh-safe.
   */
  const initialSearch = searchParams.get("search") || "";

  const initialHotelType = getParam(
    searchParams,
    "type",
    "all"
  ) as HotelType;

  const initialStarRating = getParam(
    searchParams,
    "stars",
    "all"
  );

  const initialFeatured =
    searchParams.get("featured") === "true";

  const initialSort = getParam(
    searchParams,
    "sort",
    "featured"
  ) as HotelSort;

  const initialView =
    searchParams.get("view") === "list" ? "list" : "grid";

  const [search, setSearch] = useState(initialSearch);
  const [hotelType, setHotelType] =
    useState<HotelType>(initialHotelType);
  const [starRating, setStarRating] =
    useState(initialStarRating);
  const [featured, setFeatured] =
    useState(initialFeatured);
  const [sort, setSort] =
    useState<HotelSort>(initialSort);
  const [view, setView] =
    useState<ViewMode>(initialView);

  /*
   * Keep URL synchronized with filters.
   * Search is debounced to avoid unnecessary URL updates.
   */
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (hotelType !== "all") {
        params.set("type", hotelType);
      }

      if (starRating !== "all") {
        params.set("stars", starRating);
      }

      if (featured) {
        params.set("featured", "true");
      }

      if (sort !== "featured") {
        params.set("sort", sort);
      }

      if (view !== "grid") {
        params.set("view", view);
      }

      const queryString = params.toString();

      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        { scroll: false }
      );
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [
    search,
    hotelType,
    starRating,
    featured,
    sort,
    view,
    pathname,
    router,
  ]);

  const filterState: HotelFilterState = useMemo(
    () => ({
      search,
      hotelType,
      starRating,
      featured,
      sort,
    }),
    [
      search,
      hotelType,
      starRating,
      featured,
      sort,
    ]
  );

  const filteredHotels = useMemo(
    () => filterHotels(hotels, filterState),
    [hotels, filterState]
  );

  const hasActiveSearch = search.trim().length > 0;

  const clearAll = () => {
    setSearch("");
    setHotelType("all");
    setStarRating("all");
    setFeatured(false);
    setSort("featured");
  };

  return (
    <section
      id="hotels"
      className="bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Search */}
        <div className="mx-auto max-w-3xl">
          <HotelSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        {/* Filters */}
        {!hasActiveSearch && (
          <div className="mt-6">
            <HotelFilters
              hotelType={hotelType}
              starRating={starRating}
              featured={featured}
              sort={sort}
              onHotelTypeChange={setHotelType}
              onStarRatingChange={setStarRating}
              onFeaturedChange={setFeatured}
              onSortChange={setSort}
            />
          </div>
        )}

        {/* Active filters */}
        <HotelActiveFilters
          search={search}
          hotelType={hotelType}
          starRating={starRating}
          featured={featured}
          sort={sort}
          onSearchClear={() => setSearch("")}
          onHotelTypeClear={() => setHotelType("all")}
          onStarRatingClear={() => setStarRating("all")}
          onFeaturedClear={() => setFeatured(false)}
          onSortClear={() => setSort("featured")}
          onClearAll={clearAll}
        />

        {/* Results header */}
        <div className="mt-12">
          <HotelResultsHeader
            count={filteredHotels.length}
            destinationName={destinationName}
            view={view}
            onViewChange={setView}
          />
        </div>

        {/* Results */}
        <div className="mt-8">
          {filteredHotels.length > 0 ? (
            <HotelGrid
              hotels={filteredHotels}
              view={view}
            />
          ) : (
            <HotelEmpty
              searching={hasActiveSearch}
              onClear={clearAll}
            />
          )}
        </div>
      </div>
    </section>
  );
}