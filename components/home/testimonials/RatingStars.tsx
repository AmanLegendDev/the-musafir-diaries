"use client";

import { Star } from "lucide-react";

import type {
  RatingStarsProps,
} from "./types";

export default function RatingStars({
  rating,
}: RatingStarsProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-1
      "
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300"
          }
        />
      ))}
    </div>
  );
}