"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface InquirySubmitProps {
  errorMessage?: string;
}

export default function InquirySubmit({
  errorMessage,
}: InquirySubmitProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  return (
    <div className="space-y-4 pt-1">
      {errorMessage && (
        <div
          role="alert"
          className="rounded-2xl border border-[#F06A5B]/25 bg-[#FFF5F3] px-4 py-3 text-sm leading-6 text-[#8F4038]"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#071A33] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(7,26,51,0.12)] transition hover:bg-[#0D2747] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Sending your inquiry...
          </>
        ) : (
          <>
            Send inquiry
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-[#071A33]/45">
        This sends a travel inquiry for review. Any final
        itinerary, availability, and pricing will be discussed
        with you separately.
      </p>
    </div>
  );
}