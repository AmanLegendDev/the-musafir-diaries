"use client";

import Link from "next/link";
import { ArrowRight, Check, Copy, Home } from "lucide-react";
import { useState } from "react";

type Props = {
  bookingNumber: string;
};

export default function BookingSuccessActions({
  bookingNumber,
}: Props) {
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
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-6 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>

        <Link
          href="/packages"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#071A33]/15 bg-white px-6 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/35 hover:bg-[#087E8B]/5"
        >
          Explore journeys
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!bookingNumber}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#071A33]/10 bg-[#FAF9F5] px-6 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/25 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-[#087E8B]" />
              Reference copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy reference
            </>
          )}
        </button>
      </div>
    </section>
  );
}