import type { IPackage } from "@/models/package.model";
import type { AIIntent } from "./intent";
import type { SortOrder } from "mongoose";

export function buildPackageFilters(
  intent: AIIntent
) {
  const filter: Record<string, unknown> = {
    status: "active",
  };

  /* ----------------------------- */
  /* Featured                      */
  /* ----------------------------- */

  if (intent.featured) {
    filter.featured = true;
  }

  /* ----------------------------- */
  /* Budget                        */
  /* ----------------------------- */

  if (intent.budget) {
    filter.discountedPrice = {
      $lte: intent.budget,
    };
  }

  /* ----------------------------- */
  /* Duration                      */
  /* ----------------------------- */

  if (intent.duration) {
    filter.duration = {
      $regex: intent.duration.toString(),
      $options: "i",
    };
  }

  return filter;
}

export function buildSort(
  intent: AIIntent
): Record<string, SortOrder> {
  switch (intent.sort) {
    case "price_low":
      return {
        discountedPrice: 1 as SortOrder,
      };

    case "price_high":
      return {
        discountedPrice: -1 as SortOrder,
      };

    case "featured":
      return {
        featured: -1 as SortOrder,
      };

    default:
      return {
        featured: -1 as SortOrder,
        discountedPrice: 1 as SortOrder,
      };
  }
}

export function buildLimit(
  intent: AIIntent
) {
  if (intent.type === "package") {
    return 5;
  }

  return 10;
}