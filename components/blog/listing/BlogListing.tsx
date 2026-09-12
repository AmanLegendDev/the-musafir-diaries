"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import BlogFeatured from "./BlogFeatured";
import BlogSearch from "./BlogSearch";
import BlogFilters, { type BlogSort } from "./BlogFilters";
import BlogActiveFilters from "./BlogActiveFilters";
import BlogResultsHeader from "./BlogResultsHeader";
import BlogGrid from "./BlogGrid";
import BlogEmpty from "./BlogEmpty";

import {
  filterBlogs,
  type BlogFilterItem,
} from "@/lib/utils/blog-filter";

type CategoryOption = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  blogs: BlogFilterItem[];
  featuredBlog: BlogFilterItem | null;
  categories: CategoryOption[];
};

const DEFAULT_SORT: BlogSort = "latest";

export default function BlogListing({
  blogs,
  featuredBlog,
  categories,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort =
    (searchParams.get("sort") as BlogSort) || DEFAULT_SORT;

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<BlogSort>(initialSort);

  const filteredBlogs = useMemo(
    () =>
      filterBlogs(blogs, {
        search,
        category,
        sort,
      }),
    [blogs, search, category, sort]
  );

  const selectedCategory = categories.find(
    (item) => item.slug === category
  );

  const syncUrl = (
    nextSearch: string,
    nextCategory: string,
    nextSort: BlogSort
  ) => {
    const params = new URLSearchParams();

    const cleanSearch = nextSearch.trim();

    if (cleanSearch) {
      params.set("search", cleanSearch);
    }

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextSort !== DEFAULT_SORT) {
      params.set("sort", nextSort);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    syncUrl(value, category, sort);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    syncUrl(search, value, sort);
  };

  const handleSortChange = (value: BlogSort) => {
    setSort(value);
    syncUrl(search, category, value);
  };

  const clearSearch = () => {
    setSearch("");
    syncUrl("", category, sort);
  };

  const clearCategory = () => {
    setCategory("");
    syncUrl(search, "", sort);
  };

  const resetSort = () => {
    setSort(DEFAULT_SORT);
    syncUrl(search, category, DEFAULT_SORT);
  };

  const clearAll = () => {
    setSearch("");
    setCategory("");
    setSort(DEFAULT_SORT);

    router.replace(pathname, {
      scroll: false,
    });
  };

  return (
    <>
      {featuredBlog && !search.trim() && !category && (
        <BlogFeatured blog={featuredBlog} />
      )}

      <section
        id="stories"
        className="bg-[#FAF9F5] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Search + filters */}
          <div className="rounded-[1.75rem] border border-[#071A33]/8 bg-[#F5F3ED] p-4 sm:p-5">
            <BlogSearch
              value={search}
              onChange={handleSearchChange}
            />

            <div className="mt-4">
              <BlogFilters
                categories={categories}
                category={category}
                sort={sort}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
              />
            </div>

            <BlogActiveFilters
              search={search}
              category={category}
              categoryName={selectedCategory?.name}
              sort={sort}
              onRemoveSearch={clearSearch}
              onRemoveCategory={clearCategory}
              onResetSort={resetSort}
              onClearAll={clearAll}
            />
          </div>

          {/* Results */}
          <div className="mt-12">
            <BlogResultsHeader
              count={filteredBlogs.length}
              search={search}
              categoryName={selectedCategory?.name}
            />

            <div className="mt-8">
              {filteredBlogs.length > 0 ? (
                <BlogGrid blogs={filteredBlogs} />
              ) : (
                <BlogEmpty
                  search={search}
                  categoryName={selectedCategory?.name}
                  onClearFilters={clearAll}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}