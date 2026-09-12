"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BlogSearch({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#071A33]/40"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search stories, destinations & travel guides..."
        aria-label="Search travel stories"
        className="h-14 w-full rounded-2xl border border-[#071A33]/10 bg-white pl-14 pr-12 text-sm text-[#071A33] outline-none transition placeholder:text-[#071A33]/35 focus:border-[#087E8B]/50 focus:ring-4 focus:ring-[#087E8B]/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#071A33]/45 transition hover:bg-[#FAF9F5] hover:text-[#071A33]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}