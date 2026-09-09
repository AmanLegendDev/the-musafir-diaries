"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import type { Destination } from "@/lib/types/destination";
import { filterDestinations } from "@/lib/utils/destination-filter";

import DestinationSearch from "@/components/destinations/listing/DestinationSearch";
import DestinationFilters from "@/components/destinations/listing/DestinationFilters";
import DestinationActiveFilters from "@/components/destinations/listing/DestinationActiveFilters";
import DestinationResultsHeader from "@/components/destinations/listing/DestinationResultsHeader";
import DestinationGrid from "@/components/destinations/listing/DestinationGrid";

interface DestinationListingProps {
  destinations: Destination[];

  initialSearch: string;
  initialState: string;
  initialFeatured: string;
  initialSort: string;
}

export default function DestinationListing({
  destinations,
  initialSearch,
  initialState,
  initialFeatured,
  initialSort,
}: DestinationListingProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialSearch);
  const [state, setState] = useState(initialState);
  const [featured, setFeatured] = useState(initialFeatured);
  const [sort, setSort] = useState(initialSort);

  const initialRender = useRef(true);

  /*
   * Keep URL updates cheap.
   * Search changes are debounced while dropdown changes
   * are reflected immediately.
   */
  const updateUrl = useCallback(
    ({
      nextSearch = search,
      nextState = state,
      nextFeatured = featured,
      nextSort = sort,
    }: {
      nextSearch?: string;
      nextState?: string;
      nextFeatured?: string;
      nextSort?: string;
    } = {}) => {
      const params = new URLSearchParams();

      const cleanSearch = nextSearch.trim();

      if (cleanSearch) {
        params.set("search", cleanSearch);
      }

      if (nextState !== "all") {
        params.set("state", nextState);
      }

      if (nextFeatured !== "all") {
        params.set("featured", nextFeatured);
      }

      if (nextSort !== "featured") {
        params.set("sort", nextSort);
      }

      const queryString = params.toString();

      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        {
          scroll: false,
        }
      );
    },
    [featured, pathname, router, search, sort, state]
  );

  /*
   * Search URL synchronization.
   *
   * The result itself updates instantly because filtering is local.
   * Only the URL update waits 300ms so we don't create a navigation
   * for every single keystroke.
   */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      updateUrl();
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search, updateUrl]);

  /*
   * Browser back / forward can change searchParams.
   * This keeps the controlled UI aligned with the URL-provided
   * initial values whenever the page is revisited through navigation.
   */
 

  /*
   * All filtering stays local.
   *
   * No API request.
   * No database request.
   * No network request.
   *
   * This makes search/filter interaction effectively instant
   * for a normal destination collection.
   */
  const filteredDestinations = useMemo(() => {
    return filterDestinations(destinations, {
      search,
      state,
      featured,
      sort,
    });
  }, [
    destinations,
    search,
    state,
    featured,
    sort,
  ]);

  /*
   * Build region options once.
   */
  const states = useMemo(() => {
    return Array.from(
      new Set(
        destinations
          .map((destination) => destination.state?.trim())
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [destinations]);

  const hasFilters =
    search.trim().length > 0 ||
    state !== "all" ||
    featured !== "all" ||
    sort !== "featured";

  const hasSearch = search.trim().length > 0;

  const clearAll = useCallback(() => {
    setSearch("");
    setState("all");
    setFeatured("all");
    setSort("featured");

    router.replace(pathname, {
      scroll: false,
    });
  }, [pathname, router]);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const clearState = useCallback(() => {
    setState("all");

    updateUrl({
      nextState: "all",
    });
  }, [updateUrl]);

  const clearFeatured = useCallback(() => {
    setFeatured("all");

    updateUrl({
      nextFeatured: "all",
    });
  }, [updateUrl]);

  const handleStateChange = useCallback(
    (value: string) => {
      setState(value);

      updateUrl({
        nextState: value,
      });
    },
    [updateUrl]
  );

  const handleFeaturedChange = useCallback(
    (value: string) => {
      setFeatured(value);

      updateUrl({
        nextFeatured: value,
      });
    },
    [updateUrl]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSort(value);

      updateUrl({
        nextSort: value,
      });
    },
    [updateUrl]
  );

  return (
    <section
      id="destination-discovery"
      className="bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28 xl:px-20">
        {/* Discovery controls */}
        <div className="space-y-4">
          <DestinationSearch
            value={search}
            onChange={setSearch}
            onClear={clearSearch}
          />

     <AnimatePresence initial={false} mode="wait">
  {!hasSearch && (
    <motion.div
      key="destination-filters"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <DestinationFilters
        state={state}
        featured={featured}
        sort={sort}
        states={states}
        onStateChange={handleStateChange}
        onFeaturedChange={handleFeaturedChange}
        onSortChange={handleSortChange}
      />
    </motion.div>
  )}
</AnimatePresence>

          <AnimatePresence initial={false}>
            {hasFilters && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="overflow-hidden"
              >
                <DestinationActiveFilters
                  state={state}
                  featured={featured}
                  onClearState={clearState}
                  onClearFeatured={clearFeatured}
                  onClearAll={clearAll}
                />

                {hasSearch && (
                  <div className="pt-2 text-xs text-[#071A33]/40">
                    Searching across destination names, cities
                    and regions.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <div className="mt-12 sm:mt-14">
          <DestinationResultsHeader
            count={filteredDestinations.length}
            search={search}
            sort={sort}
          />

          <div className="mt-7">
            <DestinationGrid
              destinations={filteredDestinations}
              onClear={clearAll}
            />
          </div>
        </div>
      </div>
    </section>
  );
}