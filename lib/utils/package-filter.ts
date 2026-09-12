import type { IPackage } from "@/models/package.model";

export type PackageSort =
  | "default"
  | "price-low"
  | "price-high"
  | "duration"
  | "name";

export interface PackageFilters {
  search: string;
  difficulty: string;
  featured: string;
  sort: PackageSort;
}

function durationToDays(duration: string) {
  const match = duration.match(/(\d+)/);

  return match ? Number(match[1]) : 999;
}

export function filterPackages(
  packages: IPackage[],
  filters: PackageFilters
) {
  const {
    search,
    difficulty,
    featured,
    sort,
  } = filters;

  let data = [...packages];

  /* Search */
  if (search.trim()) {
    const query = search.trim().toLowerCase();

    data = data.filter((pkg) =>
      [
        pkg.name,
        pkg.shortDescription,
        pkg.description,
        pkg.duration,
        pkg.groupSize,
        pkg.difficulty,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(query)
        )
    );
  }

  /* Difficulty */
  if (
    difficulty !== "all" &&
    difficulty
  ) {
    data = data.filter(
      (pkg) => pkg.difficulty === difficulty
    );
  }

  /* Featured */
  if (featured === "featured") {
    data = data.filter(
      (pkg) => pkg.featured
    );
  }

  /* Sorting */
  switch (sort) {
    case "price-low":
      data.sort(
        (a, b) =>
          (a.discountedPrice || a.originalPrice) -
          (b.discountedPrice || b.originalPrice)
      );
      break;

    case "price-high":
      data.sort(
        (a, b) =>
          (b.discountedPrice || b.originalPrice) -
          (a.discountedPrice || a.originalPrice)
      );
      break;

    case "duration":
      data.sort(
        (a, b) =>
          durationToDays(a.duration) -
          durationToDays(b.duration)
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

        return (
        new Date(b.createdAt).getTime() -
new Date(a.createdAt).getTime()
        );
      });
  }

  return data;
}