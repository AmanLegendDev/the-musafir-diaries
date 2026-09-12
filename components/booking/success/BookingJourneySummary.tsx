"use client";

import {
  CalendarDays,
  Clock3,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

type Props = {
  packageSnapshot?: {
    name: string;
    duration: string;
    originalPrice: number;
    discountedPrice: number;
  } | null;
  travelDate?: string;
  adults?: number;
  childCount?: number;
  pickupLocation?: string;
  total?: number;
};

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCurrency(value?: number) {
  if (typeof value !== "number") return "—";

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingJourneySummary({
  packageSnapshot,
  travelDate,
  adults = 0,
  childCount = 0,
  pickupLocation,
  total,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_20px_60px_rgba(7,26,51,0.07)]">
        {/* Header */}
        <div className="border-b border-[#071A33]/10 px-5 py-6 sm:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
            Journey summary
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#071A33] sm:text-2xl">
                {packageSnapshot?.name || "Your selected journey"}
              </h2>

              {packageSnapshot?.duration && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#071A33]/50">
                  <Clock3 className="h-4 w-4 text-[#087E8B]" />
                  {packageSnapshot.duration}
                </div>
              )}
            </div>

            {typeof total === "number" && (
              <div className="sm:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
                  Estimated total
                </p>

                <p className="mt-1 flex items-center gap-1 text-xl font-bold text-[#071A33] sm:justify-end">
                  <IndianRupee className="h-4 w-4" />
                  {formatCurrency(total)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-px bg-[#071A33]/10 sm:grid-cols-2">
          <SummaryItem
            icon={<CalendarDays className="h-4 w-4" />}
            label="Travel date"
            value={formatDate(travelDate)}
          />

          <SummaryItem
            icon={<Users className="h-4 w-4" />}
            label="Travellers"
        value={`${adults} adult${adults === 1 ? "" : "s"}${
  childCount > 0
    ? ` · ${childCount} child${
        childCount === 1 ? "" : "ren"
      }`
    : ""
}`}
          />

          <SummaryItem
            icon={<MapPin className="h-4 w-4" />}
            label="Pickup location"
            value={pickupLocation || "Not provided"}
            fullWidth
          />
        </div>

        {/* Pricing note */}
        <div className="border-t border-[#071A33]/10 bg-[#FAF9F5] px-5 py-5 sm:px-7">
          <p className="text-xs leading-6 text-[#071A33]/55">
            The amount shown is an estimate based on the package and traveller
            details submitted. Final availability and quotation will be
            confirmed after review.
          </p>
        </div>
      </div>
    </section>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  fullWidth = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`bg-white p-5 sm:p-6 ${
        fullWidth ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[#087E8B]">
        {icon}

        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-[#071A33]">
        {value}
      </p>
    </div>
  );
}