
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
      className="group ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10"
    >
      <ArrowUp className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#F59E0B]" />
    </button>
  );
}
