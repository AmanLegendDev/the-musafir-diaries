import Link from "next/link";
import { ChevronRight, MapPin, Package as PackageIcon } from "lucide-react";

interface PackageBreadcrumbProps {
  packageName: string;
  destinationName: string;
  destinationSlug?: string;
}

export default function PackageBreadcrumb({
  packageName,
  destinationName,
  destinationSlug,
}: PackageBreadcrumbProps) {
  return (
    <div className="border-b border-white/10 bg-[#071A33]/20 backdrop-blur-sm pt-22">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-12 items-center gap-2 overflow-x-auto whitespace-nowrap"
        >
          {/* Home */}
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

          {/* Packages */}
          <Link
            href="/packages"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B]"
          >
            Packages
          </Link>

          {/* Destination */}
          {destinationName && (
            <>
              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-white/25"
                strokeWidth={1.7}
              />

              {destinationSlug ? (
                <Link
                  href={`/destinations/${destinationSlug}`}
                  className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#087E8B] sm:flex"
                >
                  <MapPin
                    aria-hidden="true"
                    className="h-3 w-3 text-[#1597C7]"
                    strokeWidth={1.7}
                  />

                  {destinationName}
                </Link>
              ) : (
                <span className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:flex">
                  <MapPin
                    aria-hidden="true"
                    className="h-3 w-3 text-[#1597C7]"
                    strokeWidth={1.7}
                  />

                  {destinationName}
                </span>
              )}
            </>
          )}

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/25"
            strokeWidth={1.7}
          />

          {/* Current Package */}
          <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            <PackageIcon
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-[#F59E0B]"
              strokeWidth={1.7}
            />

            <span className="truncate">{packageName}</span>
          </span>
        </nav>
      </div>
    </div>
  );
}