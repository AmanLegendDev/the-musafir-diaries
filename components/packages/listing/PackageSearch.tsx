"use client";

import { Search, X } from "lucide-react";

interface PackageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PackageSearch({
  value,
  onChange,
}: PackageSearchProps) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#087E8B]"
        strokeWidth={1.7}
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search journeys, destinations..."
        aria-label="Search journeys"
        className="h-14 w-full rounded-2xl border border-[#071A33]/10 bg-white pl-12 pr-12 text-sm text-[#071A33] outline-none transition-all placeholder:text-[#071A33]/30 focus:border-[#087E8B]/40 focus:ring-4 focus:ring-[#087E8B]/5"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#071A33]/40 transition-colors hover:bg-[#FAF9F5] hover:text-[#087E8B]"
        >
          <X className="h-4 w-4" strokeWidth={1.7} />
        </button>
      )}
    </div>
  );
}