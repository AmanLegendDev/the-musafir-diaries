"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Back to top"
      className="group ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-[border-color,background-color] duration-200 hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 motion-reduce:transition-none"
    >
      <ArrowUp
        aria-hidden="true"
        className="h-4 w-4 text-white/65 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-[#F59E0B] motion-reduce:transition-none"
      />
    </button>
  );
}