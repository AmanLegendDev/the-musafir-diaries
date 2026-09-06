import type {
  Destination,
  DestinationFilters,
} from "@/lib/types/destination";

export function filterDestinations(
  destinations: Destination[],
  filters: DestinationFilters
) {
  const { search, state, featured, sort } = filters;

  let data = [...destinations];

  /* -------------------------------- Search ------------------------------- */

  if (search.trim()) {
    const query = search.toLowerCase();

    data = data.filter((destination) => {
      return (
        destination.name.toLowerCase().includes(query) ||
        destination.city.toLowerCase().includes(query) ||
        destination.state.toLowerCase().includes(query)
      );
    });
  }

  /* ----------------------------- Featured ----------------------------- */

  if (featured === "featured") {
    data = data.filter((destination) => destination.featured);
  }

  /* ------------------------------- State ------------------------------- */

  if (state !== "all") {
    data = data.filter(
      (destination) =>
        destination.state.toLowerCase() === state.toLowerCase()
    );
  }

  /* -------------------------------- Sort -------------------------------- */

  switch (sort) {
    case "price-low":
      data.sort(
        (a, b) => a.startingPrice - b.startingPrice
      );
      break;

    case "price-high":
      data.sort(
        (a, b) => b.startingPrice - a.startingPrice
      );
      break;

    case "rating":
      data.sort(
        (a, b) => b.rating - a.rating
      );
      break;

    case "name":
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      data.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }

        return a.featuredOrder - b.featuredOrder;
      });
  }

  return data;
}