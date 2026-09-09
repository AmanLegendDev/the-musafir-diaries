"use client";

import { Search, X } from "lucide-react";
import { useId } from "react";

interface DestinationSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export default function DestinationSearch({
  value,
  onChange,
  onClear,
}: DestinationSearchProps) {
  const inputId = useId();

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        Search destinations
      </label>

      <div
        className={[
          "group relative flex min-h-[72px] items-center overflow-hidden rounded-[24px] mt-4",
          "border bg-white transition-all duration-300",
          hasValue
            ? "border-[#087E8B]/40 shadow-[0_12px_40px_rgba(8,126,139,0.08)]"
            : "border-[#071A33]/10 shadow-[0_8px_30px_rgba(7,26,51,0.04)]",
          "focus-within:border-[#087E8B]/45",
          "focus-within:shadow-[0_12px_45px_rgba(8,126,139,0.10)]",
        ].join(" ")}
      >
        {/* Left accent */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[3px] bg-[#087E8B] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
        />

        {/* Search icon */}
        <div className="flex h-full w-[68px] shrink-0 items-center justify-center sm:w-[76px]">
          <Search
            className={[
              "h-5 w-5 transition-colors duration-300",
              hasValue
                ? "text-[#087E8B]"
                : "text-[#071A33]/35 group-focus-within:text-[#087E8B]",
            ].join(" ")}
            strokeWidth={1.7}
          />
        </div>

        {/* Input */}
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Where would you like to wander?"
          autoComplete="off"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent pr-3 text-sm text-[#071A33] outline-none placeholder:text-[#071A33]/35 sm:text-base"
        />

        {/* Clear */}
        {hasValue && (
          <button
            type="button"
            onClick={onClear ?? (() => onChange(""))}
            aria-label="Clear destination search"
            className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/10 bg-[#FAF9F5] text-[#071A33]/50 transition-all duration-200 hover:border-[#087E8B]/30 hover:bg-[#087E8B]/5 hover:text-[#087E8B] sm:mr-4"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        )}

        {/* Keyboard hint — desktop only */}
        {!hasValue && (
          <div className="mr-5 hidden shrink-0 items-center gap-1.5 md:flex">
            <kbd className="rounded-md border border-[#071A33]/10 bg-[#FAF9F5] px-2 py-1 text-[9px] font-medium tracking-wide text-[#071A33]/35">
              SEARCH
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}