"use client";

import { useState } from "react";
import { Copy, Hash } from "lucide-react";

interface InquiryReferenceProps {
  inquiryNumber: string;
}

export default function InquiryReference({
  inquiryNumber,
}: InquiryReferenceProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(inquiryNumber);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard access can be unavailable in some browsers.
    }
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-5 rounded-[1.75rem] border border-[#071A33]/8 bg-white p-5 shadow-[0_12px_40px_rgba(7,26,51,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E7F4F5] text-[#087E8B]">
              <Hash size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087E8B]">
                Inquiry reference
              </p>

              <p className="mt-1 break-all font-mono text-base font-semibold tracking-wide text-[#071A33] sm:text-lg">
                {inquiryNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#071A33]/10 px-4 text-xs font-semibold text-[#071A33] transition hover:border-[#087E8B]/40 hover:text-[#087E8B] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/10"
          >
            <Copy size={15} />

            {copied ? "Copied" : "Copy reference"}
          </button>
        </div>
      </div>
    </section>
  );
}