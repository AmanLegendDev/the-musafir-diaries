"use client";

import {
  Check,
  Clock3,
} from "lucide-react";

interface PackageOptionProps {
  name: string;
  duration?: string;
  originalPrice: number;
  discountedPrice: number;
  selected: boolean;
  onSelect: () => void;
}

export default function PackageOption({
  name,
  duration,
  originalPrice,
  discountedPrice,
  selected,
  onSelect,
}: PackageOptionProps) {
  const hasDiscount =
    originalPrice > discountedPrice;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`
        group w-full rounded-[22px] border p-5
        text-left transition-all duration-200
        ${
          selected
            ? "border-[#087E8B] bg-[#087E8B]/[0.045] shadow-[0_14px_40px_rgba(8,126,139,0.10)]"
            : "border-[#071A33]/10 bg-white hover:border-[#087E8B]/35 hover:bg-[#FAF9F5]"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Selection */}

        <div
          className={`
            mt-0.5 flex h-5 w-5 shrink-0
            items-center justify-center rounded-full border
            transition
            ${
              selected
                ? "border-[#087E8B] bg-[#087E8B] text-white"
                : "border-[#071A33]/20 bg-white"
            }
          `}
        >
          {selected && (
            <Check
              size={12}
              strokeWidth={3}
            />
          )}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-[#071A33] sm:text-base">
            {name}
          </h4>

          {duration && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#071A33]/45">
              <Clock3 size={13} />

              <span>{duration}</span>
            </div>
          )}
        </div>

        {/* Price */}

        <div className="shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#071A33]/35">
            From
          </p>

          <p className="mt-1 text-base font-semibold text-[#087E8B]">
            ₹
            {discountedPrice.toLocaleString(
              "en-IN",
            )}
          </p>

          {hasDiscount && (
            <p className="mt-0.5 text-xs text-[#071A33]/30 line-through">
              ₹
              {originalPrice.toLocaleString(
                "en-IN",
              )}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}