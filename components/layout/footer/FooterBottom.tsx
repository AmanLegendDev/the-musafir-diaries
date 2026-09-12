"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function FooterBottom() {
  return (
    <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
      {/* Copyright */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-[11px] text-white/35">
          © {new Date().getFullYear()} The Musafir Diaries. All rights reserved.
        </p>

        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

        <p className="text-[11px] text-white/25">
          Crafted for journeys worth remembering.
        </p>
      </div>

      {/* Legal + Credit + Back to Top */}
      <div className="flex flex-wrap items-center gap-5">
        <Link
          href="/privacy-policy"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms-and-conditions"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Terms & Conditions
        </Link>

        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

        <Link
          href="https://amandigitalsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Built with <span className="text-[#F06A5B]">♥</span> by{" "}
          <span className="text-white/50 hover:text-[#F59E0B]">
            Aman Digital Solutions
          </span>
        </Link>

        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Back to top"
          className="group ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10"
        >
          <ArrowUp className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#F59E0B]" />
        </button>
      </div>
    </div>
  );
}