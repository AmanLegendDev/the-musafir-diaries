"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import type {
  BookingFormData,
  BookingPriceBreakdown,
  BookingPackageSnapshot,
} from "./types";
import { calculateBookingPrice } from "@/lib/booking/calculate-booking-price";

type ApiPackage = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  duration: string;
  originalPrice: number;
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

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StepThree() {
  const { watch, setValue } = useFormContext<BookingFormData>();

  const packageId = watch("package");
  const customerName = watch("customerName");
  const phone = watch("phone");
  const email = watch("email");
  const travelDate = watch("travelDate");
  const adults = watch("adults");
  const childrenCount = watch("childrenCount");
  const childrenAges = watch("childrenAges");
  const pickupLocation = watch("pickupLocation");
  const specialRequest = watch("specialRequest");

  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPackages() {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch("/api/packages", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load packages.");
        }

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
        if (mounted) {
          setLoadError(
            "We couldn't load the selected journey details. Please go back and try again.",
          );
        }
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
    childrenCount > 0 ? childrenAges?.slice(0, childrenCount) ?? [] : [];

  const pricing: BookingPriceBreakdown | null = useMemo(() => {
    if (!selectedPackage) return null;

    return calculateBookingPrice({
      adultPrice: selectedPackage.discountedPrice,
      adults,
      childrenAges: safeChildrenAges,
      childPolicy: selectedPackage.childPolicy,
    });
  }, [selectedPackage, adults, safeChildrenAges]);

  useEffect(() => {
    if (!pricing) return;

    setValue("totalPrice", pricing.total, {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [pricing, setValue]);

  const packageSnapshot: BookingPackageSnapshot | null = selectedPackage
    ? {
        name: selectedPackage.name,
        slug: selectedPackage.slug,
        duration: selectedPackage.duration,
        originalPrice: selectedPackage.originalPrice,
        discountedPrice: selectedPackage.discountedPrice,
      }
    : null;

  if (loading) {
    return (
      <section className="rounded-3xl border border-[#071A33]/10 bg-white p-6 shadow-[0_20px_60px_rgba(7,26,51,0.07)] sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-7 w-48 rounded bg-[#FAF9F5]" />
          <div className="h-28 rounded-2xl bg-[#FAF9F5]" />
          <div className="h-48 rounded-2xl bg-[#FAF9F5]" />
        </div>
      </section>
    );
  }

  if (loadError || !selectedPackage || !packageSnapshot) {
    return (
      <section className="rounded-3xl border border-[#F06A5B]/20 bg-white p-6 shadow-[0_20px_60px_rgba(7,26,51,0.07)] sm:p-8">
        <div className="rounded-2xl border border-[#F06A5B]/20 bg-[#F06A5B]/5 p-6">
          <h2 className="text-lg font-semibold text-[#071A33]">
            Review details unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#071A33]/65">
            {loadError ||
              "The selected package could not be found. Please return to the journey step and select a package again."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Intro */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          Final review
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#071A33] sm:text-3xl">
          Review your journey
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#071A33]/60">
          Please check your travel details carefully before sending your
          booking request.
        </p>
      </div>

      {/* Package */}
      <div className="overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_20px_60px_rgba(7,26,51,0.07)]">
        <div className="border-b border-[#071A33]/10 bg-[#071A33] px-5 py-5 text-white sm:px-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1597C7]">
            Selected journey
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-xl font-semibold sm:text-2xl">
                {packageSnapshot.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-white/65">
                <Clock3 className="h-4 w-4 text-[#1597C7]" />
                {packageSnapshot.duration}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-white/45">From</p>
              <p className="text-xl font-semibold text-[#F59E0B]">
                ₹{formatCurrency(packageSnapshot.discountedPrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
          <ReviewStat
            icon={<CalendarDays className="h-4 w-4" />}
            label="Travel date"
            value={formatDate(travelDate)}
          />

          <ReviewStat
            icon={<Users className="h-4 w-4" />}
            label="Travellers"
            value={`${adults} adult${adults === 1 ? "" : "s"}${
              childrenCount > 0
                ? ` · ${childrenCount} child${childrenCount === 1 ? "" : "ren"}`
                : ""
            }`}
          />

          <ReviewStat
            icon={<MapPin className="h-4 w-4" />}
            label="Pickup"
            value={pickupLocation || "Not provided"}
          />
        </div>
      </div>

      {/* Traveller details */}
      <ReviewSection title="Traveller details">
        <div className="grid gap-5 sm:grid-cols-2">
          <ReviewItem label="Full name" value={customerName} />
          <ReviewItem label="Phone" value={phone} />
          <ReviewItem label="Email" value={email} />
          <ReviewItem
            label="Children"
            value={
              childrenCount > 0
                ? `${childrenCount} child${
                    childrenCount === 1 ? "" : "ren"
                  }`
                : "No children"
            }
          />
        </div>
      </ReviewSection>

      {/* Child ages */}
      {childrenCount > 0 && (
        <ReviewSection title="Children's ages">
          <div className="flex flex-wrap gap-3">
            {safeChildrenAges.map((age, index) => (
              <div
                key={`${index}-${age}`}
                className="rounded-xl border border-[#071A33]/10 bg-[#FAF9F5] px-4 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/45">
                  Child {index + 1}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#071A33]">
                  {age} years
                </p>
              </div>
            ))}
          </div>
        </ReviewSection>
      )}

      {/* Special request */}
      {specialRequest?.trim() && (
        <ReviewSection title="Special request">
          <p className="whitespace-pre-wrap text-sm leading-7 text-[#071A33]/70">
            {specialRequest}
          </p>
        </ReviewSection>
      )}

      {/* Price */}
      {pricing && (
        <div className="overflow-hidden rounded-3xl border border-[#087E8B]/20 bg-[#FAF9F5]">
          <div className="border-b border-[#071A33]/10 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                <IndianRupee className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold text-[#071A33]">
                  Estimated journey total
                </h3>

                <p className="text-xs text-[#071A33]/50">
                  Based on the package and traveller details provided
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5 sm:px-7">
            <PriceRow
              label={`${adults} adult${adults === 1 ? "" : "s"}`}
              value={pricing.adultTotal}
            />

            {pricing.childTotal > 0 && (
              <PriceRow
                label={`${childrenCount} child${
                  childrenCount === 1 ? "" : "ren"
                }`}
                value={pricing.childTotal}
              />
            )}

            <div className="border-t border-[#071A33]/10 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#071A33]/45">
                    Estimated total
                  </p>

                  <p className="mt-1 text-xs text-[#071A33]/50">
                    Final quotation after review
                  </p>
                </div>

                <p className="text-2xl font-bold text-[#071A33] sm:text-3xl">
                  ₹{formatCurrency(pricing.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consent */}
      <div className="rounded-2xl border border-[#087E8B]/15 bg-white p-5">
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#087E8B]/10 text-[#087E8B]">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#071A33]">
              Before you submit
            </p>

            <p className="mt-1 text-sm leading-6 text-[#071A33]/60">
              Your request will be reviewed by The Musafir Diaries. The
              displayed amount is an estimate based on the selected package
              and traveller details. Final availability and quotation will be
              confirmed separately.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 border-t border-[#071A33]/10 pt-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087E8B]" />

          <p className="text-xs leading-5 text-[#071A33]/55">
            By submitting this request, you confirm that the traveller and
            travel information provided above is accurate.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#071A33]/10 bg-white p-5 shadow-[0_15px_45px_rgba(7,26,51,0.045)] sm:p-7">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#071A33]/65">
        {title}
      </h3>

      <div className="mt-5">{children}</div>
    </div>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-[#071A33]">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function ReviewStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#071A33]/10 bg-[#FAF9F5] p-4">
      <div className="flex items-center gap-2 text-[#087E8B]">
        {icon}

        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/45">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-[#071A33]">
        {value}
      </p>
    </div>
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
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#071A33]/60">{label}</span>

      <span className="font-semibold text-[#071A33]">
        ₹{formatCurrency(value)}
      </span>
    </div>
  );
}