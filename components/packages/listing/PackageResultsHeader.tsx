import { ArrowDownUp } from "lucide-react";

interface PackageResultsHeaderProps {
  count: number;
  hasFilters?: boolean;
}

export default function PackageResultsHeader({
  count,
  hasFilters = false,
}: PackageResultsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#071A33]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
          {hasFilters
            ? "Your selection"
            : "Our journeys"}
        </p>

        <h2 className="mt-2 font-serif text-3xl font-medium tracking-[-0.03em] text-[#071A33] sm:text-4xl">
          {count}{" "}
          <span className="text-[#071A33]/35">
            {count === 1
              ? "journey"
              : "journeys"}
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/30">
        <ArrowDownUp
          className="h-3.5 w-3.5 text-[#087E8B]"
          strokeWidth={1.7}
        />

        Curated for the road ahead
      </div>
    </div>
  );
}