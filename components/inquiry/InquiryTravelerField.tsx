"use client";

import { Users } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface InquiryTravelerFieldProps {
  error?: string;
}

export default function InquiryTravelerField({
  error,
}: InquiryTravelerFieldProps) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  return (
    <div className="space-y-2">
      <label
        htmlFor="travelers"
        className="text-sm font-semibold text-[#071A33]"
      >
        Number of travellers
        <span className="ml-1 text-[#F06A5B]" aria-hidden="true">
          *
        </span>
      </label>

      <div className="relative">
        <Users
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087E8B]"
        />

        <input
          id="travelers"
          type="number"
          min={1}
          max={50}
          inputMode="numeric"
          disabled={isSubmitting}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "travelers-error" : undefined
          }
          className={[
            "h-13 w-full rounded-2xl border bg-white px-4 pl-11 text-sm text-[#071A33] outline-none transition",
            "focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10",
            error
              ? "border-[#F06A5B]"
              : "border-[#071A33]/10",
          ].join(" ")}
          {...register("travelers", {
            valueAsNumber: true,
          })}
        />
      </div>

      <p className="text-xs text-[#071A33]/45">
        Include adults and children travelling together.
      </p>

      {error && (
        <p
          id="travelers-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}