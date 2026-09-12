"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface TravellerFieldProps {
  label: string;
  hint?: string;
  icon: LucideIcon;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export default function TravellerField({
  label,
  hint,
  icon: Icon,
  error,
  required = true,
  children,
}: TravellerFieldProps) {
  return (
    <div className="min-w-0">
      {/* Label */}

      <div className="mb-3 flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            bg-[#087E8B]/10
            text-[#087E8B]
          "
        >
          <Icon
            size={17}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <label
            className="
              block text-sm font-semibold
              tracking-[-0.01em]
              text-[#071A33]
            "
          >
            {label}

            {required && (
              <span
                aria-hidden="true"
                className="ml-1 text-[#F06A5B]"
              >
                *
              </span>
            )}
          </label>

          {hint && (
            <p className="mt-1 text-xs leading-5 text-[#071A33]/40">
              {hint}
            </p>
          )}
        </div>
      </div>

      {/* Input */}

      {children}

      {/* Error */}

      {error && (
        <p
          role="alert"
          className="
            mt-2 flex items-start gap-1.5
            text-xs font-medium
            leading-5 text-[#D94A3A]
          "
        >
          <span aria-hidden="true">!</span>

          <span>{error}</span>
        </p>
      )}
    </div>
  );
}