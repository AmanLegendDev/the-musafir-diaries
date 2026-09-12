"use client";

import { IndianRupee } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface InquiryBudgetFieldProps {
  error?: string;
}

export default function InquiryBudgetField({
  error,
}: InquiryBudgetFieldProps) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  return (
    <div className="space-y-2">
      <label
        htmlFor="budget"
        className="text-sm font-semibold text-[#071A33]"
      >
        Approximate budget
        <span className="ml-2 text-xs font-normal text-[#071A33]/45">
          Optional
        </span>
      </label>

      <div className="relative">
        <IndianRupee
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087E8B]"
        />

        <input
          id="budget"
          type="text"
          inputMode="text"
          placeholder="e.g. ₹30,000 – ₹50,000"
          disabled={isSubmitting}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "budget-error" : undefined
          }
          className={[
            "h-13 w-full rounded-2xl border bg-white px-4 pl-10 text-sm text-[#071A33] outline-none placeholder:text-[#071A33]/35 transition",
            "focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10",
            error
              ? "border-[#F06A5B]"
              : "border-[#071A33]/10",
          ].join(" ")}
          {...register("budget")}
        />
      </div>

      {error && (
        <p
          id="budget-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}