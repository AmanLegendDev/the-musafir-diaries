"use client";

import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DestinationFiltersProps {
  featured: string;
  setFeatured: (value: string) => void;

  state: string;
  setState: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  states: string[];
}

export default function DestinationFilters({
  featured,
  setFeatured,
  state,
  setState,
  sort,
   states,
  setSort,
}: DestinationFiltersProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mt-8
        grid
        gap-4
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-5
        shadow-lg
        backdrop-blur-xl
        md:grid-cols-3
      "
    >

      {/* Featured */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-600">
          Featured
        </label>

      <Select
  value={featured}
  onValueChange={(value) => setFeatured(value ?? "all")}
>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Destinations
            </SelectItem>

            <SelectItem value="featured">
              Featured Only
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      {/* State */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-600">
          State
        </label>

       <Select
  value={state}
  onValueChange={(value) => setState(value ?? "all")}
>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>

          <SelectContent>

            

           <SelectItem value="all">
  All States
</SelectItem>

{states.map((stateName) => (
  <SelectItem
    key={stateName}
    value={stateName}
  >
    {stateName}
  </SelectItem>
))}

          </SelectContent>

        </Select>

      </div>
            {/* Sort */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-600">
          Sort By
        </label>

       <Select
  value={sort}
  onValueChange={(value) => setSort(value ?? "latest")}
>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Sort Destinations" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="latest">
              Latest
            </SelectItem>

            <SelectItem value="rating">
              Highest Rating
            </SelectItem>

            <SelectItem value="price-low">
              Price : Low to High
            </SelectItem>

            <SelectItem value="price-high">
              Price : High to Low
            </SelectItem>

            <SelectItem value="name">
              Name (A-Z)
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      {/* Bottom Row */}

      <div className="col-span-full mt-2 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center">

        <p className="text-sm text-slate-500">
          Refine destinations by featured status, state and sorting preference.
        </p>

        <button
          type="button"
          onClick={() => {
            setFeatured("all");
            setState("all");
            setSort("latest");
          }}
          className="
            rounded-xl
            border
            border-slate-200
            px-5
            py-2.5
            text-sm
            font-medium
            text-slate-700
            transition-all
            duration-300
            hover:border-emerald-500
            hover:bg-emerald-50
            hover:text-emerald-600
          "
        >
          Reset Filters
        </button>

      </div>

    </motion.div>
  );
}