import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

interface DestinationBreadcrumbProps {
  destinationName: string;
}

export default function DestinationBreadcrumb({
  destinationName,
}: DestinationBreadcrumbProps) {
  return (
    <div className="border-b border-white/10 bg-[#071A33]/20 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-12 items-center gap-2 overflow-x-auto whitespace-nowrap"
        >
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B]"
          >
            Home
          </Link>

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/25"
            strokeWidth={1.7}
          />

          <Link
            href="/destinations"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B]"
          >
            Destinations
          </Link>

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/25"
            strokeWidth={1.7}
          />

          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            <MapPin
              aria-hidden="true"
              className="h-3 w-3 text-[#1597C7]"
              strokeWidth={1.7}
            />

            {destinationName}
          </span>
        </nav>
      </div>
    </div>
  );
}