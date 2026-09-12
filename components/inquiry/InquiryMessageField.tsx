"use client";

import { MessageSquareText } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface InquiryMessageFieldProps {
  error?: string;
}

export default function InquiryMessageField({
  error,
}: InquiryMessageFieldProps) {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  const message = watch("message") || "";

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-[#071A33]"
        >
          Tell us about your trip
          <span className="ml-1 text-[#F06A5B]" aria-hidden="true">
            *
          </span>
        </label>

        <span className="text-xs text-[#071A33]/40">
          {message.length}/1000
        </span>
      </div>

      <div className="relative">
        <MessageSquareText
          size={17}
          className="pointer-events-none absolute left-4 top-4 text-[#087E8B]"
        />

        <textarea
          id="message"
          rows={6}
          maxLength={1000}
          disabled={isSubmitting}
          placeholder="Tell us what you have in mind — preferred places, experiences, pace of travel, special requirements, or anything else that would help us understand your trip."
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "message-error" : undefined
          }
          className={[
            "min-h-40 w-full resize-y rounded-2xl border bg-white px-4 py-4 pl-11 text-sm leading-6 text-[#071A33] outline-none placeholder:text-[#071A33]/35 transition",
            "focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10",
            error
              ? "border-[#F06A5B]"
              : "border-[#071A33]/10",
          ].join(" ")}
          {...register("message")}
        />
      </div>

      {error && (
        <p
          id="message-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}