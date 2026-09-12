import Link from "next/link";
import { ChevronRight, Home, MapPin } from "lucide-react";

type Props = {
  hotelName: string;
  destinationName: string;
  destinationSlug: string;
};

export default function HotelBreadcrumb({
  hotelName,
  destinationName,
  destinationSlug,
}: Props) {
  return (
    <div className="border-b border-white/10 bg-[#071A33]/20 backdrop-blur-sm mt-22">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-12 items-center gap-2 overflow-x-auto whitespace-nowrap"
        >
          {/* Home */}
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B]"
          >
            <Home
              aria-hidden="true"
              className="h-3 w-3"
              strokeWidth={1.7}
            />

            <span>Home</span>
          </Link>

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/25"
            strokeWidth={1.7}
          />

          {/* Hotels */}
          <Link
            href="/hotels"
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B]"
          >
            Hotels
          </Link>

          {/* Destination */}
          {destinationName && (
            <>
              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-white/25"
                strokeWidth={1.7}
              />

              <Link
                href={
                  destinationSlug
                    ? `/destinations/${destinationSlug}`
                    : "/destinations"
                }
                className="hidden shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B] sm:flex"
              >
                <MapPin
                  aria-hidden="true"
                  className="h-3 w-3 text-[#1597C7]"
                  strokeWidth={1.7}
                />

                <span>{destinationName}</span>
              </Link>
            </>
          )}

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/25"
            strokeWidth={1.7}
          />

          {/* Current Hotel */}
          <span
            aria-current="page"
            className="max-w-[220px] truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:max-w-[360px]"
          >
            {hotelName}
          </span>
        </nav>
      </div>
    </div>
  );
}