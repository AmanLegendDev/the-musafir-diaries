"use client";

import Link from "next/link";
import { SearchX, ArrowRight } from "lucide-react";

type Props = {
  search?: string;
  categoryName?: string;
  onClearFilters?: () => void;
};

export default function BlogEmpty({
  search,
  categoryName,
  onClearFilters,
}: Props) {
  const hasFilters = Boolean(search?.trim() || categoryName);

  return (
    <section className="rounded-[2rem] border border-[#071A33]/8 bg-white px-6 py-16 text-center shadow-[0_15px_50px_rgba(7,26,51,0.05)] sm:px-10 sm:py-20">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#087E8B]/8 text-[#087E8B]">
        <SearchX className="h-7 w-7" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
        No stories found
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#071A33] sm:text-3xl">
        The trail is quiet for now.
      </h3>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#071A33]/55 sm:text-base sm:leading-7">
        {search?.trim()
          ? `We couldn't find any stories matching “${search.trim()}”. Try a different search or explore the journal again.`
          : categoryName
            ? `There are no published stories in ${categoryName} yet. Explore the rest of the journal for more inspiration.`
            : "There are no published stories available right now. Check back soon for new journeys and stories from the mountains."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {hasFilters && onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center rounded-full bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            Clear filters
          </button>
        )}

        <Link
          href="/destinations"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#071A33]/10 bg-[#FAF9F5] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
        >
          Explore destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}