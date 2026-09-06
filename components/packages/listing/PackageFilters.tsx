"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Destination {
  _id: string;
  name: string;
  state: string;
  slug: string;
}

interface PackageFiltersProps {
  categories: Category[];
  destinations: Destination[];
}

export default function PackageFilters({
  categories,
  destinations,
}: PackageFiltersProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams =
    useSearchParams();

  const [search, setSearch] =
    useState(
      searchParams.get("search") ?? ""
    );

  const [category, setCategory] =
    useState(
      searchParams.get("category") ?? ""
    );

  const [state, setState] =
    useState(
      searchParams.get("state") ?? ""
    );

  const [destination, setDestination] =
    useState(
      searchParams.get(
        "destination"
      ) ?? ""
    );

  /* ----------------------------- */
  /* Unique States */
  /* ----------------------------- */

  const states = useMemo(() => {
    return [
      ...new Set(
        destinations.map(
          (item) => item.state
        )
      ),
    ].sort();
  }, [destinations]);

  /* ----------------------------- */
  /* Filter Destinations */
  /* ----------------------------- */

  const filteredDestinations =
    useMemo(() => {
      if (!state)
        return destinations;

      return destinations.filter(
        (item) =>
          item.state === state
      );
    }, [
      destinations,
      state,
    ]);

  /* ----------------------------- */
  /* URL Sync */
  /* ----------------------------- */

  useEffect(() => {
    const params =
      new URLSearchParams();

    if (search)
      params.set(
        "search",
        search
      );

    if (category)
      params.set(
        "category",
        category
      );

    if (state)
      params.set(
        "state",
        state
      );

    if (destination)
      params.set(
        "destination",
        destination
      );

    router.replace(
      `${pathname}?${params.toString()}`,
      {
        scroll: false,
      }
    );
  }, [
    search,
    category,
    state,
    destination,
    pathname,
    router,
  ]);

  /* ----------------------------- */
  /* Reset Destination */
  /* ----------------------------- */

  useEffect(() => {
    setDestination("");
  }, [state]);

  /* ----------------------------- */
  /* Reset Filters */
  /* ----------------------------- */

  function resetFilters() {
    setSearch("");

    setCategory("");

    setState("");

    setDestination("");

    router.replace(
      pathname,
      {
        scroll: false,
      }
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

          <div className="mb-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Filter className="h-5 w-5 text-emerald-600" />

              <h2 className="text-xl font-bold text-slate-900">
                Filter Packages
              </h2>

            </div>

            <button
              onClick={
                resetFilters
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              <RotateCcw className="h-4 w-4" />

              Reset
            </button>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {/* Search */}

           
            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  All Categories
                </option>

                {categories.map(
                  (item) => (
                    <option
                      key={item._id}
                      value={
                        item.slug
                      }
                    >
                      {item.name}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* State */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  All States
                </option>

                {states.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Destination */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Destination
              </label>

              <select
                value={
                  destination
                }
                onChange={(e) =>
                  setDestination(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  All Destinations
                </option>

                {filteredDestinations.map(
                  (item) => (
                    <option
                      key={item._id}
                      value={
                        item.slug
                      }
                    >
                      {item.name}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

                    {/* Difficulty */}

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Difficulty
              </label>

              <select
                defaultValue={
                  searchParams.get("difficulty") ??
                  ""
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  All Levels
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

            </div>

            {/* Duration */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Duration
              </label>

              <select
                defaultValue={
                  searchParams.get("duration") ??
                  ""
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  Any Duration
                </option>

                <option value="2">
                  2 Days
                </option>

                <option value="3">
                  3 Days
                </option>

                <option value="5">
                  5 Days
                </option>

                <option value="7">
                  7 Days
                </option>

                <option value="10">
                  10+ Days
                </option>

              </select>

            </div>

            {/* Sort */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sort By
              </label>

              <select
                defaultValue={
                  searchParams.get("sort") ??
                  ""
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
              >
                <option value="">
                  Featured
                </option>

                <option value="latest">
                  Latest
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name (A-Z)
                </option>

              </select>

            </div>

          </div>

          {/* Active Filters */}

          {(search ||
            category ||
            state ||
            destination) && (
            <div className="mt-6 flex flex-wrap gap-2">

              {search && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  Search : {search}
                </span>
              )}

              {category && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Category : {category}
                </span>
              )}

              {state && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                  State : {state}
                </span>
              )}

              {destination && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                  Destination : {destination}
                </span>
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}