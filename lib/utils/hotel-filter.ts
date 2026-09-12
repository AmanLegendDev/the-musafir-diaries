import type {
  HotelListItem,
} from "@/components/hotels/listing/HotelGrid";

import type {
  HotelSort,
  HotelType,
} from "@/components/hotels/listing/HotelFilters";

export type HotelFilterState = {
  search: string;
  hotelType: HotelType;
  starRating: string;
  featured: boolean;
  sort: HotelSort;
};

function getDestinationName(
  hotel: HotelListItem
) {
  if (
    typeof hotel.destination === "object" &&
    hotel.destination !== null
  ) {
    return hotel.destination.name || "";
  }

  return "";
}

function matchesSearch(
  hotel: HotelListItem,
  search: string
) {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchableText = [
    hotel.name,
    hotel.area,
    hotel.city,
    hotel.state,
    hotel.country,
    hotel.hotelType,
    hotel.shortDescription,
    getDestinationName(hotel),
    ...(hotel.amenities || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

export function filterHotels(
  hotels: HotelListItem[],
  filters: HotelFilterState
) {
  const result = hotels.filter((hotel) => {
    // Search
    if (!matchesSearch(hotel, filters.search)) {
      return false;
    }

    // Hotel type
    if (
      filters.hotelType !== "all" &&
      hotel.hotelType !== filters.hotelType
    ) {
      return false;
    }

    // Star classification
    if (
      filters.starRating !== "all" &&
      hotel.starRating !== Number(filters.starRating)
    ) {
      return false;
    }

    // Featured
    if (
      filters.featured &&
      !hotel.featured
    ) {
      return false;
    }

    return true;
  });

  // Sorting
  return [...result].sort((a, b) => {
    switch (filters.sort) {
      case "name":
        return a.name.localeCompare(
          b.name,
          undefined,
          { sensitivity: "base" }
        );

      case "stars-high":
        return (
          b.starRating - a.starRating ||
          a.name.localeCompare(b.name)
        );

      case "rating-high": {
        const ratingA =
          a.guestRating ?? -1;

        const ratingB =
          b.guestRating ?? -1;

        return (
          ratingB - ratingA ||
          b.reviewCount - a.reviewCount ||
          a.name.localeCompare(b.name)
        );
      }

      case "featured":
      default:
        if (
          a.featured !== b.featured
        ) {
          return a.featured ? -1 : 1;
        }

        return (
          a.displayOrder - b.displayOrder ||
          a.name.localeCompare(b.name)
        );
    }
  });
}