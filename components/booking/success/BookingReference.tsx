"use client";

import { Check, Copy, FileText } from "lucide-react";
import { useState } from "react";

type Props = {
  bookingNumber: string;
};

export default function BookingReference({ bookingNumber }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!bookingNumber) return;

    try {
      await navigator.clipboard.writeText(bookingNumber);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mx-auto -mt-8 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_24px_70px_rgba(7,26,51,0.12)]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/40">
                  Booking reference
                </p>

                <p className="mt-1 truncate font-mono text-base font-semibold tracking-wide text-[#071A33] sm:text-lg">
                  {bookingNumber || "Unavailable"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!bookingNumber}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#071A33]/10 px-4 py-2.5 text-xs font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:bg-[#087E8B]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#087E8B]" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy reference
                </>
              )}
            </button>
          </div>

          <div className="mt-5 border-t border-[#071A33]/10 pt-4">
            <p className="text-xs leading-5 text-[#071A33]/50">
              Keep this reference handy when contacting The Musafir Diaries
              about your request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}