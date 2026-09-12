"use client";

import { Search, Tag, X } from "lucide-react";

type Props = {
  search: string;
  category: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearAll: () => void;
};

function formatCategory(category: string) {
  return category
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function FAQActiveFilters({
  search,
  category,
  onClearSearch,
  onClearCategory,
  onClearAll,
}: Props) {
  const hasFilters = Boolean(search.trim() || category);

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/35">
        Showing
      </span>

      {search.trim() && (
        <button
          type="button"
          onClick={onClearSearch}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#087E8B]/15 bg-[#087E8B]/6 px-3.5 py-2 text-xs font-medium text-[#087E8B] transition hover:bg-[#087E8B]/10"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />

          <span className="max-w-[180px] truncate">
            {search.trim()}
          </span>

          <X className="h-3.5 w-3.5 shrink-0" />
        </button>
      )}

      {category && (
        <button
          type="button"
          onClick={onClearCategory}
          className="inline-flex items-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#071A33]/65 transition hover:border-[#087E8B]/20 hover:text-[#087E8B]"
        >
          <Tag className="h-3.5 w-3.5" />

          <span>{formatCategory(category)}</span>

          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-xs font-semibold text-[#071A33]/40 underline decoration-[#071A33]/20 underline-offset-4 transition hover:text-[#F06A5B]"
      >
        Clear all
      </button>
    </div>
  );
}