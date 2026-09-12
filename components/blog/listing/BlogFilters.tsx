"use client";

import { SlidersHorizontal } from "lucide-react";

export type BlogSort = "latest" | "oldest" | "read-time";

type CategoryOption = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: CategoryOption[];
  category: string;
  sort: BlogSort;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: BlogSort) => void;
};

export default function BlogFilters({
  categories,
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Categories */}
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
            category === ""
              ? "bg-[#071A33] text-white"
              : "bg-white text-[#071A33]/65 hover:bg-[#071A33]/5 hover:text-[#071A33]"
          }`}
        >
          All stories
        </button>

        {categories.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => onCategoryChange(item.slug)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              category === item.slug
                ? "bg-[#087E8B] text-white"
                : "bg-white text-[#071A33]/65 hover:bg-[#087E8B]/10 hover:text-[#087E8B]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex shrink-0 items-center gap-2">
        <SlidersHorizontal
          aria-hidden="true"
          className="h-4 w-4 text-[#071A33]/40"
        />

        <label htmlFor="blog-sort" className="sr-only">
          Sort stories
        </label>

        <select
          id="blog-sort"
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value as BlogSort)
          }
          className="h-11 rounded-xl border border-[#071A33]/10 bg-white px-3 text-sm font-medium text-[#071A33] outline-none transition focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/10"
        >
          <option value="latest">Latest stories</option>
          <option value="oldest">Oldest stories</option>
          <option value="read-time">Quick reads</option>
        </select>
      </div>
    </div>
  );
}