"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PackageSectionNavProps {
  packageSlug: string;
}

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "#overview",
  },
  {
    label: "Highlights",
    href: "#highlights",
  },
  {
    label: "Itinerary",
    href: "#itinerary",
  },
  {
    label: "Stay",
    href: "#stay",
  },
  {
    label: "Gallery",
    href: "#gallery",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
];

export default function PackageSectionNav({
  packageSlug,
}: PackageSectionNavProps) {
  void packageSlug;

  return (
    <div className="sticky top-0 z-30 border-b border-[#071A33]/8 bg-[#FAF9F5]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
        <nav
          aria-label="Package sections"
          className="flex min-w-0 flex-1 overflow-x-auto scrollbar-none"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/45 transition-colors hover:text-[#087E8B] first:pl-0 sm:px-5 sm:py-5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/inquiry"
          className="ml-4 hidden shrink-0 items-center gap-2 rounded-full bg-[#071A33] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#087E8B] sm:inline-flex"
        >
          Enquire
          <ArrowUpRight
            className="h-3 w-3"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </div>
  );
}