"use client";

import { useEffect, useMemo, useState } from "react";
import { IndianRupee, ReceiptText } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { BookingFormData } from "../types";
import { calculateBookingPrice } from "@/lib/booking/calculate-booking-price";

type ApiPackage = {
  _id: string;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingPriceCard() {
  const { watch } = useFormContext<BookingFormData>();

  const packageId = watch("package");
  const adults = watch("adults") || 1;
  const childrenCount = watch("childrenCount") || 0;
  const childrenAges = watch("childrenAges") || [];

  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadPackages() {
      try {
        setLoading(true);

        const response = await fetch("/api/packages", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const result = await response.json();

        const data = Array.isArray(result)
          ? result
          : Array.isArray(result?.packages)
            ? result.packages
            : Array.isArray(result?.data)
              ? result.data
              : [];

        if (mounted) {
          setPackages(data);
        }
      } catch {
        // Keep the form usable if the sidebar request fails.
      } finally {
        if (mounted) {
          setLoading(false);
        }
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
    childrenCount > 0
      ? childrenAges.slice(0, childrenCount)
      : [];

  const pricing = useMemo(() => {
    if (!selectedPackage) return null;

    return calculateBookingPrice({
      adultPrice: selectedPackage.discountedPrice,
      adults,
      childrenAges: safeChildrenAges,
      childPolicy: selectedPackage.childPolicy,
    });
  }, [
    selectedPackage,
    adults,
    safeChildrenAges,
  ]);

  return (
    <section className="overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_18px_55px_rgba(7,26,51,0.07)]">
      {/* Header */}
      <div className="bg-[#071A33] px-5 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#1597C7]">
            <ReceiptText className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Price overview
            </p>

            <h2 className="mt-1 text-sm font-semibold">
              Current estimate
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {!packageId ? (
          <div className="rounded-2xl bg-[#FAF9F5] p-4">
            <p className="text-sm font-medium text-[#071A33]">
              Select a journey
            </p>

            <p className="mt-1 text-xs leading-5 text-[#071A33]/50">
              Your estimated total will appear here once a package is
              selected.
            </p>
          </div>
        ) : loading || !pricing ? (
          <div className="space-y-4">
            <div className="h-5 w-32 animate-pulse rounded bg-[#FAF9F5]" />
            <div className="h-5 w-24 animate-pulse rounded bg-[#FAF9F5]" />
            <div className="h-px bg-[#071A33]/10" />
            <div className="h-9 w-36 animate-pulse rounded bg-[#FAF9F5]" />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <PriceRow
                label={`${adults} adult${adults === 1 ? "" : "s"}`}
                value={pricing.adultTotal}
              />

              {childrenCount > 0 && (
                <PriceRow
                  label={`${childrenCount} child${
                    childrenCount === 1 ? "" : "ren"
                  }`}
                  value={pricing.childTotal}
                />
              )}
            </div>

            <div className="my-5 h-px bg-[#071A33]/10" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
                Estimated total
              </p>

              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-[#071A33]/45">
                  Based on current selections
                </span>

                <span className="flex items-center text-xl font-bold text-[#071A33]">
                  <IndianRupee className="mr-0.5 h-4 w-4" />
                  {formatCurrency(pricing.total)}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mt-5 rounded-2xl border border-[#087E8B]/15 bg-[#087E8B]/5 p-4">
          <p className="text-xs font-semibold text-[#071A33]">
            Final quotation after review
          </p>

          <p className="mt-1 text-[11px] leading-5 text-[#071A33]/50">
            This estimate is calculated from the selected package and
            traveller details. Final availability and quotation will be
            confirmed separately.
          </p>
        </div>
      </div>
    </section>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#071A33]/60">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#071A33]">
        ₹{formatCurrency(value)}
      </span>
    </div>
  );
}