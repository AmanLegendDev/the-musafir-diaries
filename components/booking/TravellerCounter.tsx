"use client";

import {
  Minus,
  Plus,
} from "lucide-react";

interface TravellerCounterProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function TravellerCounter({
  label,
  description,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
}: TravellerCounterProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[20px] border border-[#071A33]/10 bg-[#FAF9F5] p-4 sm:p-5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#071A33]">
          {label}
        </p>

        <p className="mt-1 text-xs text-[#071A33]/40">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full border border-[#071A33]/10
            bg-white text-[#071A33]
            transition
            hover:border-[#087E8B]
            hover:text-[#087E8B]
            disabled:pointer-events-none
            disabled:opacity-25
          "
        >
          <Minus size={15} />
        </button>

        <span
          aria-live="polite"
          className="w-7 text-center text-sm font-semibold text-[#071A33]"
        >
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full border border-[#071A33]/10
            bg-white text-[#071A33]
            transition
            hover:border-[#087E8B]
            hover:text-[#087E8B]
            disabled:pointer-events-none
            disabled:opacity-25
          "
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}