"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function BookingNavigation() {
  return (
    <div className="border-b border-[#071A33]/8 bg-[#FAF9F5]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/packages"
          className="group inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-[#071A33]/65 transition-colors hover:text-[#071A33]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />

          <span>Back to journeys</span>
        </Link>

        {/* Secure request indicator */}
        <div className="hidden items-center gap-2 text-xs text-[#071A33]/45 sm:flex">
          <ShieldCheck className="h-4 w-4 text-[#087E8B]" />

          <span>Booking request</span>
        </div>
      </div>
    </div>
  );
}