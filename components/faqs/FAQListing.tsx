"use client";

import { useEffect, useMemo, useState } from "react";

import FAQSearch from "./FAQSearch";
import FAQCategoryFilters from "./FAQCategoryFilters";
import FAQActiveFilters from "./FAQActiveFilters";
import FAQResultsHeader from "./FAQResultsHeader";
import FAQAccordion from "./FAQAccordion";
import FAQEmpty from "./FAQEmpty";

import type { FAQItemData } from "./FAQItem";

type Props = {
  faqs: FAQItemData[];
  categories: string[];
};

export default function FAQListing({
  faqs,
  categories,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  /*
   * Read initial filters from URL.
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const initialSearch = params.get("search") ?? "";
    const initialCategory = params.get("category") ?? "";

    setSearch(initialSearch);
    setCategory(initialCategory);
  }, []);

  /*
   * Keep URL synchronized with current filters.
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const normalizedSearch = search.trim();

    if (normalizedSearch) {
      params.set("search", normalizedSearch);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    const query = params.toString();

    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState({}, "", nextUrl);
  }, [search, category]);

  /*
   * Client-side filtering.
   */
  const filteredFAQs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          faq.question,
          faq.answer,
          faq.category,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch)
          );

      const matchesCategory =
        !category ||
        faq.category?.trim().toLowerCase() ===
          category.trim().toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [faqs, search, category]);

  const hasFilters =
    Boolean(search.trim()) || Boolean(category);

  function clearSearch() {
    setSearch("");
  }

  function clearCategory() {
    setCategory("");
  }

  function clearAll() {
    setSearch("");
    setCategory("");
  }

  return (
    <section
      id="questions"
      className="bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Section introduction */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#F59E0B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
              Find your answer
            </span>
          </div>

          <h2 className="mt-6 font-serif text-3xl leading-[1.1] tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
            Everything you need to know before the journey begins.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#071A33]/50 sm:text-base sm:leading-7">
            Search through our frequently asked questions or
            browse by topic to find the information you need.
          </p>
        </div>

        {/* Search + category */}
        <div className="mt-10 rounded-[1.75rem] border border-[#071A33]/8 bg-white p-4 sm:p-5">
          <FAQSearch
            value={search}
            onChange={setSearch}
          />

          <div className="mt-4">
            <FAQCategoryFilters
              categories={categories}
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          </div>
        </div>

        {/* Active filters */}
        <div className="mt-5 min-h-0">
          <FAQActiveFilters
            search={search}
            category={category}
            onClearSearch={clearSearch}
            onClearCategory={clearCategory}
            onClearAll={clearAll}
          />
        </div>

        {/* Results */}
        <div className="mt-12">
          <FAQResultsHeader
            count={filteredFAQs.length}
            hasFilters={hasFilters}
          />

          <div className="mt-0">
            {filteredFAQs.length > 0 ? (
              <FAQAccordion faqs={filteredFAQs} />
            ) : (
              <FAQEmpty
                hasFilters={hasFilters}
                onReset={clearAll}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}