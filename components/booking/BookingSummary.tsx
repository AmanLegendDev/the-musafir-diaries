"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { BookingFormData } from "./types";
import { calculateBookingPrice } from "@/lib/booking/calculate-booking-price";

type ApiPackage = {
  _id: string;
  name: string;
  duration: string;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
};

function formatDate(value?: string) {
  if (!value) return "Not selected";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingSummary() {
  const { watch } = useFormContext<BookingFormData>();

  const packageId = watch("package");
  const travelDate = watch("travelDate");
  const adults = watch("adults");
  const childrenCount = watch("childrenCount");
  const childrenAges = watch("childrenAges");
  const pickupLocation = watch("pickupLocation");

  const [packages, setPackages] = useState<ApiPackage[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadPackages() {
      try {
        const response = await fetch("/api/packages", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const result = await response.json();

        const rawPackages = Array.isArray(result)
          ? result
          : Array.isArray(result?.packages)
            ? result.packages
            : Array.isArray(result?.data)
              ? result.data
              : [];

        if (mounted) {
          setPackages(rawPackages);
        }
      } catch {
        // Main booking form remains usable even if summary package fetch fails.
      }
    }

    loadPackages();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedPackage = useMemo(
    () => packages.find((item) => item._id === packageId),
    [packages, packageId],
  );

  const safeChildrenAges =
    childrenCount > 0 ? childrenAges?.slice(0, childrenCount) ?? [] : [];

  const pricing = useMemo(() => {
    if (!selectedPackage) return null;

    return calculateBookingPrice({
      adultPrice: selectedPackage.discountedPrice,
      adults,
      childrenAges: safeChildrenAges,
      childPolicy: selectedPackage.childPolicy,
    });
  }, [selectedPackage, adults, safeChildrenAges]);

  return (
    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      {/* Main summary */}
      <div className="overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_20px_60px_rgba(7,26,51,0.07)]">
        <div className="bg-[#071A33] px-5 py-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1597C7]">
            Your journey
          </p>

          <h2 className="mt-2 text-lg font-semibold">
            {selectedPackage?.name || "Select a journey"}
          </h2>

          {selectedPackage?.duration && (
            <div className="mt-2 flex items-center gap-2 text-xs text-white/55">
              <Clock3 className="h-3.5 w-3.5 text-[#1597C7]" />
              {selectedPackage.duration}
            </div>
          )}
        </div>

        <div className="space-y-5 p-5">
          <SummaryRow
            icon={<CalendarDays className="h-4 w-4" />}
            label="Travel date"
            value={formatDate(travelDate)}
          />

          <SummaryRow
            icon={<Users className="h-4 w-4" />}
            label="Travellers"
            value={`${adults} adult${adults === 1 ? "" : "s"}${
              childrenCount > 0
                ? ` · ${childrenCount} child${
                    childrenCount === 1 ? "" : "ren"
                  }`
                : ""
            }`}
          />

          <SummaryRow
            icon={<MapPin className="h-4 w-4" />}
            label="Pickup"
            value={pickupLocation || "Not selected"}
          />

          <div className="border-t border-[#071A33]/10 pt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
                  Current estimate
                </p>

                <p className="mt-1 text-xs text-[#071A33]/45">
                  Subject to final confirmation
                </p>
              </div>

              <p className="text-xl font-bold text-[#071A33]">
                {pricing ? `₹${formatCurrency(pricing.total)}` : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / process */}
      <div className="rounded-3xl border border-[#087E8B]/15 bg-[#FAF9F5] p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#071A33]">
              Request first, confirmation next
            </p>

            <p className="mt-1 text-xs leading-5 text-[#071A33]/55">
              Nothing is charged while you submit this request. Your details
              are reviewed before final confirmation.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-[#071A33]/10 pt-4">
          <ProcessItem text="Journey details reviewed" />
          <ProcessItem text="Availability checked" />
          <ProcessItem text="Final quotation shared" />
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#071A33]/40">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-[#071A33]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProcessItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#087E8B]" />

      <span className="text-xs text-[#071A33]/60">{text}</span>
    </div>
  );
}