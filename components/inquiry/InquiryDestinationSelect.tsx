"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { InquiryInput } from "@/lib/validations/inquiry";

interface Destination {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
}

interface InquiryDestinationSelectProps {
  error?: string;
}

export default function InquiryDestinationSelect({
  error,
}: InquiryDestinationSelectProps) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<InquiryInput>();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDestinations() {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch("/api/destinations", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load destinations.");
        }

        const data = await response.json();

        if (!cancelled) {
          setDestinations(
            Array.isArray(data)
              ? data
              : Array.isArray(data?.destinations)
                ? data.destinations
                : [],
          );
        }
      } catch {
        if (!cancelled) {
          setFetchError(
            "Destinations could not be loaded. Please refresh and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  const describedBy = [
    error ? "destination-error" : "",
    fetchError ? "destination-load-error" : "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor="destination"
        className="text-sm font-semibold text-[#071A33]"
      >
        Destination
        <span className="ml-1 text-[#F06A5B]" aria-hidden="true">
          *
        </span>
      </label>

      <div className="relative">
        <MapPin
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#087E8B]"
        />

        <select
          id="destination"
          disabled={loading || isSubmitting}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            "h-13 w-full appearance-none rounded-2xl border bg-white pl-11 pr-11 text-sm text-[#071A33] outline-none transition",
            "focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10",
            error
              ? "border-[#F06A5B]"
              : "border-[#071A33]/10",
            loading
              ? "cursor-wait text-[#071A33]/45"
              : "",
          ].join(" ")}
          {...register("destination")}
        >
          <option value="">
            {loading
              ? "Loading destinations..."
              : "Select your destination"}
          </option>

          {destinations.map((destination) => (
            <option
              key={destination._id}
              value={destination._id}
            >
              {destination.name}
            </option>
          ))}
        </select>

        {loading ? (
          <Loader2
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#087E8B]"
          />
        ) : (
          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#071A33]/45"
          />
        )}
      </div>

      {fetchError && (
        <p
          id="destination-load-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {fetchError}
        </p>
      )}

      {error && (
        <p
          id="destination-error"
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}