"use client";

import { X } from "lucide-react";

type Props = {
  search: string;
  category: string;
  categoryName?: string;
  sort: string;
  onRemoveSearch: () => void;
  onRemoveCategory: () => void;
  onResetSort: () => void;
  onClearAll: () => void;
};

const SORT_LABELS: Record<string, string> = {
  latest: "Latest stories",
  oldest: "Oldest stories",
  "read-time": "Quick reads",
};

export default function BlogActiveFilters({
  search,
  category,
  categoryName,
  sort,
  onRemoveSearch,
  onRemoveCategory,
  onResetSort,
  onClearAll,
}: Props) {
  const hasSearch = Boolean(search.trim());
  const hasCategory = Boolean(category);
  const hasSort = sort !== "latest";

  if (!hasSearch && !hasCategory && !hasSort) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#071A33]/40">
        Active
      </span>

      {hasSearch && (
        <button
          type="button"
          onClick={onRemoveSearch}
          className="inline-flex items-center gap-2 rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 px-3.5 py-2 text-xs font-medium text-[#087E8B] transition hover:bg-[#087E8B]/10"
        >
          Search: “{search.trim()}”
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {hasCategory && (
        <button
          type="button"
          onClick={onRemoveCategory}
          className="inline-flex items-center gap-2 rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 px-3.5 py-2 text-xs font-medium text-[#087E8B] transition hover:bg-[#087E8B]/10"
        >
          {categoryName || category}
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {hasSort && (
        <button
          type="button"
          onClick={onResetSort}
          className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/5 px-3.5 py-2 text-xs font-medium text-[#071A33] transition hover:bg-[#F59E0B]/10"
        >
          {SORT_LABELS[sort] || sort}
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-xs font-semibold text-[#071A33]/50 underline decoration-[#071A33]/20 underline-offset-4 transition hover:text-[#071A33]"
      >
        Clear all
      </button>
    </div>
  );
}