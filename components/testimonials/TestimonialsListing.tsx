"use client";

import { useEffect, useMemo, useState } from "react";

import TestimonialFilters, {
  type TestimonialRatingFilter,
  type TestimonialSort,
} from "./TestimonialFilters";

import TestimonialGrid from "./TestimonialGrid";
import TestimonialResultsHeader from "./TestimonialResultsHeader";
import TestimonialEmpty from "./TestimonialEmpty";

import type { TestimonialData } from "./TestimonialCard";

type TestimonialWithDate = TestimonialData & {
  createdAt?: string | Date;
};

type Props = {
  testimonials: TestimonialWithDate[];
};

function sortTestimonials(
  testimonials: TestimonialWithDate[],
  sort: TestimonialSort,
) {
  return [...testimonials].sort((a, b) => {
    if (sort === "highest-rated") {
      return (
        Number(b.rating) - Number(a.rating) ||
        Number(a.order ?? 0) - Number(b.order ?? 0)
      );
    }

    if (sort === "latest") {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dateB - dateA;
    }

    return (
      Number(b.featured) - Number(a.featured) ||
      Number(a.order ?? 0) - Number(b.order ?? 0)
    );
  });
}

export default function TestimonialsListing({
  testimonials,
}: Props) {
  const [search, setSearch] = useState("");
  const [rating, setRating] =
    useState<TestimonialRatingFilter>("all");
  const [sort, setSort] =
    useState<TestimonialSort>("featured");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const initialSearch = params.get("search") ?? "";
    const initialRating = params.get("rating");
    const initialSort = params.get("sort");

    setSearch(initialSearch);

    if (
      initialRating === "5" ||
      initialRating === "4" ||
      initialRating === "3"
    ) {
      setRating(initialRating);
    }

    if (
      initialSort === "featured" ||
      initialSort === "highest-rated" ||
      initialSort === "latest"
    ) {
      setSort(initialSort);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (rating !== "all") {
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }

    if (sort !== "featured") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    const query = params.toString();

    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState({}, "", nextUrl);
  }, [search, rating, sort]);

  const filteredTestimonials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = testimonials.filter((testimonial) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          testimonial.name,
          testimonial.designation,
          testimonial.location,
          testimonial.review,
          testimonial.trip,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch),
          );

      const matchesRating =
        rating === "all" ||
        Math.round(Number(testimonial.rating)) ===
          Number(rating);

      return matchesSearch && matchesRating;
    });

    return sortTestimonials(filtered, sort);
  }, [testimonials, search, rating, sort]);

  const hasFilters =
    Boolean(search.trim()) ||
    rating !== "all" ||
    sort !== "featured";

  function resetFilters() {
    setSearch("");
    setRating("all");
    setSort("featured");
  }

  return (
    <section className="bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <TestimonialFilters
          search={search}
          rating={rating}
          sort={sort}
          onSearchChange={setSearch}
          onRatingChange={setRating}
          onSortChange={setSort}
        />

        <div className="mt-12">
          <TestimonialResultsHeader
            count={filteredTestimonials.length}
            hasFilters={hasFilters}
          />

          <div className="mt-7">
            {filteredTestimonials.length > 0 ? (
              <TestimonialGrid
                testimonials={filteredTestimonials}
              />
            ) : (
              <TestimonialEmpty
                hasFilters={hasFilters}
                onReset={resetFilters}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}