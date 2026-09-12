"use client";

import { Grid2X2, List, MapPin } from "lucide-react";

type Props = {
  count: number;
  destinationName?: string;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
};

export default function HotelResultsHeader({
  count,
  destinationName,
  view,
  onViewChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#071A33]/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#087E8B]">
          <MapPin className="h-3.5 w-3.5" />

          <span>
            {destinationName || "Himalayan stays"}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-3">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#071A33]">
            Places to stay
          </h2>

          <span className="text-sm text-[#071A33]/40">
            {count} {count === 1 ? "stay" : "stays"}
          </span>
        </div>
      </div>

      {/* View switcher */}
      <div className="flex items-center self-start rounded-xl border border-[#071A33]/10 bg-white p-1 sm:self-auto">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
            view === "grid"
              ? "bg-[#071A33] text-white"
              : "text-[#071A33]/40 hover:text-[#071A33]"
          }`}
        >
          <Grid2X2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onViewChange("list")}
          aria-label="List view"
          aria-pressed={view === "list"}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
            view === "list"
              ? "bg-[#071A33] text-white"
              : "text-[#071A33]/40 hover:text-[#071A33]"
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}