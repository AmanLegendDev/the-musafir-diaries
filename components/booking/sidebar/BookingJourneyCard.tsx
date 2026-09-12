"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Compass, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { BookingFormData } from "../types";

type ApiPackage = {
  _id: string;
  name: string;
  slug: string;
  duration: string;
  shortDescription?: string;
};

export default function BookingJourneyCard() {
  const { watch } = useFormContext<BookingFormData>();

  const packageId = watch("package");

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
        // The booking form itself remains functional if the sidebar fails.
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

  return (
    <section className="overflow-hidden rounded-3xl border border-[#071A33]/10 bg-white shadow-[0_18px_55px_rgba(7,26,51,0.06)]">
      <div className="relative overflow-hidden bg-[#071A33] px-5 py-6">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#087E8B]/10 blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-[#1597C7]">
              <Compass className="h-4 w-4" />
            </span>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Your journey
            </p>
          </div>

          <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
            {loading
              ? "Loading journey..."
              : selectedPackage?.name || "Choose a journey"}
          </h2>

          {selectedPackage?.duration && (
            <div className="mt-2 flex items-center gap-2 text-xs text-white/55">
              <Clock3 className="h-3.5 w-3.5 text-[#1597C7]" />
              <span>{selectedPackage.duration}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        {selectedPackage?.shortDescription ? (
          <p className="text-sm leading-6 text-[#071A33]/60">
            {selectedPackage.shortDescription}
          </p>
        ) : (
          <div className="flex items-start gap-3 rounded-2xl bg-[#FAF9F5] p-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#087E8B]" />

            <p className="text-xs leading-5 text-[#071A33]/55">
              Select a journey to see its details here.
            </p>
          </div>
        )}

        {selectedPackage && (
          <div className="mt-5 border-t border-[#071A33]/10 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/35">
              Planning note
            </p>

            <p className="mt-1 text-xs leading-5 text-[#071A33]/50">
              Your selected journey can be reviewed and adjusted before the
              booking request is submitted.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}