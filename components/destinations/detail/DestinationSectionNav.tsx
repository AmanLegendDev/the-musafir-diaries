import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface DestinationSectionNavProps {
  destinationSlug: string;
}

const sections = [
  {
    label: "Overview",
    href: "#overview",
  },
  {
    label: "Journeys",
    href: "#packages",
  },
  {
    label: "Stays",
    href: "#stays",
  },
  {
    label: "Experiences",
    href: "#experiences",
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

export default function DestinationSectionNav({
  destinationSlug,
}: DestinationSectionNavProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-[#071A33]/10 bg-[#FAF9F5]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex h-[68px] items-center justify-between gap-6">
          {/* Section links */}
          <nav
            aria-label="Destination sections"
            className="flex min-w-0 flex-1 items-center gap-6 overflow-x-auto overscroll-x-contain scrollbar-none sm:gap-7"
          >
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative flex shrink-0 items-center py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/45 transition-colors duration-200 hover:text-[#087E8B]"
              >
                {section.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#087E8B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop action */}
          <Link
            href={`/inquiry?destination=${encodeURIComponent(
              destinationSlug
            )}`}
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-[#071A33] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#087E8B] sm:inline-flex"
          >
            Plan this journey

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}