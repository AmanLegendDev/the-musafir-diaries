"use client";

import { CalendarDays } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface InquiryDateFieldProps {
  error?: string;
}

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function InquiryDateField({
  error,
}: InquiryDateFieldProps) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  return (
    <div className="space-y-2">
      <label
        htmlFor="travelDate"
        className="text-sm font-semibold text-[#071A33]"
      >
        Travel date
        <span className="ml-1 text-[#F06A5B]" aria-hidden="true">
          *
        </span>
      </label>

      <div className="relative">
        <CalendarDays
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#087E8B]"
        />

        <input
          id="travelDate"
          type="date"
          min={getToday()}
          disabled={isSubmitting}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "travelDate-error" : undefined
          }
          className={[
            "h-13 w-full rounded-2xl border bg-white px-4 pl-11 text-sm text-[#071A33] outline-none transition",
            "focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10",
            error
              ? "border-[#F06A5B]"
              : "border-[#071A33]/10",
          ].join(" ")}
          {...register("travelDate")}
        />
      </div>

      {error && (
        <p
          id="travelDate-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}