"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import type { IPackage } from "@/models/package.model";

import PackageSearch from "./PackageSearch";
import PackageFilters from "./PackageFilters";
import PackageActiveFilters from "./PackageActiveFilters";
import PackageResultsHeader from "./PackageResultsHeader";
import PackageGrid from "./PackageGrid";

import {
  filterPackages,
  type PackageFilters as PackageFilterState,
} from "@/lib/utils/package-filter";

interface PackageListingProps {
  packages: IPackage[];
}

export default function PackageListing({
  packages,
}: PackageListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] =
    useState<PackageFilterState>({
      search: searchParams.get("search") ?? "",
      difficulty:
        searchParams.get("difficulty") ?? "all",
      featured:
        searchParams.get("featured") ?? "all",
      sort:
        (searchParams.get("sort") as PackageFilterState["sort"]) ??
        "default",
    });

  const filteredPackages = useMemo(
    () => filterPackages(packages, filters),
    [packages, filters]
  );

  const hasFilters =
    Boolean(filters.search.trim()) ||
    filters.difficulty !== "all" ||
    filters.featured === "featured";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();

      if (filters.search.trim()) {
        params.set(
          "search",
          filters.search.trim()
        );
      }

      if (filters.difficulty !== "all") {
        params.set(
          "difficulty",
          filters.difficulty
        );
      }

      if (filters.featured === "featured") {
        params.set(
          "featured",
          "featured"
        );
      }

      if (filters.sort !== "default") {
        params.set(
          "sort",
          filters.sort
        );
      }

      const queryString = params.toString();

      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        { scroll: false }
      );
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    filters,
    pathname,
    router,
  ]);

  const clearAll = () => {
    setFilters({
      search: "",
      difficulty: "all",
      featured: "all",
      sort: "default",
    });
  };

  const clearSearch = () => {
    setFilters((current) => ({
      ...current,
      search: "",
    }));
  };

  const clearDifficulty = () => {
    setFilters((current) => ({
      ...current,
      difficulty: "all",
    }));
  };

  const clearFeatured = () => {
    setFilters((current) => ({
      ...current,
      featured: "all",
    }));
  };

  const searching = Boolean(
    filters.search.trim()
  );

  return (
    <section
      id="journeys"
      className="bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20">
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#F59E0B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
              Find your way
            </span>
          </div>

          <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
            Every journey has
            <span className="block text-[#087E8B]">
              its own rhythm.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
            Explore our curated journeys and find the one that
            feels right for the way you want to experience the
            mountains.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10">
          <PackageSearch
            value={filters.search}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                search: value,
              }))
            }
          />
        </div>

        {/* Filters disappear while searching */}
        <AnimatePresence initial={false}>
          {!searching && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              transition={{
                duration: 0.22,
              }}
              className="overflow-hidden"
            >
              <div className="pt-5">
                <PackageFilters
                  difficulty={filters.difficulty}
                  featured={filters.featured}
                  sort={filters.sort}
                  onDifficultyChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      difficulty: value,
                    }))
                  }
                  onFeaturedChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      featured: value,
                    }))
                  }
                  onSortChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      sort:
                        value as PackageFilterState["sort"],
                    }))
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filters */}
        <PackageActiveFilters
          search={filters.search}
          difficulty={filters.difficulty}
          featured={filters.featured}
          onClearSearch={clearSearch}
          onClearDifficulty={clearDifficulty}
          onClearFeatured={clearFeatured}
          onClearAll={clearAll}
        />

        {/* Results */}
        <div className="mt-12">
          <PackageResultsHeader
            count={filteredPackages.length}
            hasFilters={hasFilters}
          />

          <div className="mt-7">
            <PackageGrid
              packages={filteredPackages}
              onClear={clearAll}
            />
          </div>
        </div>
      </div>
    </section>
  );
}