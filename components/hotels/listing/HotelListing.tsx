"use client";

import { useEffect, useMemo, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import HotelSearch from "./HotelSearch";
import HotelDestinationSelector, {
  type HotelDestinationOption,
} from "./HotelDestinationSelector";
import HotelResultsHeader from "./HotelResultsHeader";
import HotelGrid, {
  type HotelListItem,
} from "./HotelGrid";
import HotelEmpty from "./HotelEmpty";

type Props = {
  hotels: HotelListItem[];
  destinations: HotelDestinationOption[];
};

type ViewMode = "grid" | "list";

type HotelWithDestination = HotelListItem & {
  destination?:
    | {
        _id?: string;
        name?: string;
        slug?: string;
        state?: string;
      }
    | string
    | null;
};

function getDestinationSlug(
  hotel: HotelWithDestination
) {
  if (!hotel.destination) {
    return "";
  }

  if (typeof hotel.destination === "string") {
    return hotel.destination;
  }

  return hotel.destination.slug || "";
}

export default function HotelListing({
  hotels,
  destinations,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const initialDestination =
    searchParams.get("destination") || "all";

  const initialView =
    searchParams.get("view") === "list"
      ? "list"
      : "grid";

  const [search, setSearch] =
    useState(initialSearch);

  const [selectedDestination, setSelectedDestination] =
    useState(initialDestination);

  const [view, setView] =
    useState<ViewMode>(initialView);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (
        selectedDestination &&
        selectedDestination !== "all"
      ) {
        params.set(
          "destination",
          selectedDestination
        );
      }

      if (view !== "grid") {
        params.set("view", view);
      }

      const queryString = params.toString();

      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        }
      );
    }, 300);

    return () =>
      window.clearTimeout(timeout);
  }, [
    search,
    selectedDestination,
    view,
    pathname,
    router,
  ]);

  const filteredHotels = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const hotelWithDestination =
        hotel as HotelWithDestination;

      const destinationSlug =
        getDestinationSlug(
          hotelWithDestination
        );

      const matchesDestination =
        selectedDestination === "all" ||
        destinationSlug ===
          selectedDestination;

      if (!matchesDestination) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const destination =
        hotelWithDestination.destination;

      const destinationName =
        typeof destination === "object" &&
        destination
          ? destination.name || ""
          : "";

      const searchableText = [
        hotel.name,
        hotel.city,
        hotel.state,
        hotel.area,
        destinationName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedSearch
      );
    });
  }, [
    hotels,
    search,
    selectedDestination,
  ]);

  const selectedDestinationData =
    destinations.find(
      (destination) =>
        destination.slug ===
        selectedDestination
    );

  const selectedDestinationName =
    selectedDestinationData?.name;

  const hasActiveSearch =
    search.trim().length > 0;

  const clearAll = () => {
    setSearch("");
    setSelectedDestination("all");
  };

  const handleDestinationChange = (
    slug: string
  ) => {
    setSelectedDestination(slug);

    window.setTimeout(() => {
      document
        .getElementById("hotel-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
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

        {/* Destination Selector */}
        {!hasActiveSearch && (
          <div className="mt-10">
            <HotelDestinationSelector
              destinations={destinations}
              selectedDestination={
                selectedDestination
              }
              onDestinationChange={
                handleDestinationChange
              }
            />
          </div>
        )}

        {/* Results */}
        <div
          id="hotel-results"
          className="scroll-mt-24"
        >
          <div className="mt-12">
            <HotelResultsHeader
              count={filteredHotels.length}
              destinationName={
                selectedDestinationName
              }
              view={view}
              onViewChange={setView}
            />
          </div>

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
      </div>
    </section>
  );
}