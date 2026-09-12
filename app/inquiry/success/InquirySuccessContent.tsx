"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import InquiryNextSteps from "@/components/inquiry/success/InquiryNextSteps";
import InquiryReference from "@/components/inquiry/success/InquiryReference";
import InquirySuccessActions from "@/components/inquiry/success/InquirySuccessActions";
import InquirySuccessHero from "@/components/inquiry/success/InquirySuccessHero";
import InquirySuccessSupport from "@/components/inquiry/success/InquirySuccessSupport";
import InquirySummary from "@/components/inquiry/success/InquirySummary";

interface InquiryData {
  id: string;
  inquiryNumber: string;

  fullName: string;
  phone: string;
  email: string;

  destination: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    country: string;
  } | null;

  travelDate: string;
  travelers: number;

  budget: string;
  pickupLocation: string;
  message: string;

  status: string;
  createdAt: string;
}

interface InquirySuccessContentProps {
  inquiryId: string;
}

export default function InquirySuccessContent({
  inquiryId,
}: InquirySuccessContentProps) {
  const [inquiry, setInquiry] =
    useState<InquiryData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadInquiry() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/inquiries/${encodeURIComponent(inquiryId)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message ||
              "Unable to load your inquiry.",
          );
        }

        if (!cancelled) {
          setInquiry(data.inquiry);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your inquiry.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInquiry();

    return () => {
      cancelled = true;
    };
  }, [inquiryId]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F5] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F4F5] text-[#087E8B]">
            <Loader2
              size={22}
              className="animate-spin"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-[#071A33]">
            Loading your inquiry...
          </p>
        </div>
      </main>
    );
  }

  if (error || !inquiry) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F5] px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-[#071A33]/8 bg-white p-7 text-center shadow-[0_18px_60px_rgba(7,26,51,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F06A5B]">
            Inquiry unavailable
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#071A33]">
            We couldn&apos;t load this request.
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#071A33]/60">
            The inquiry may no longer be available at this
            address. You can return to the inquiry page and
            submit a new request if needed.
          </p>

          <Link
            href="/inquiry"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <ArrowLeft size={16} />
            Back to inquiry
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#071A33]">
      <InquirySuccessHero
        inquiryNumber={inquiry.inquiryNumber}
      />

      <InquiryReference
        inquiryNumber={inquiry.inquiryNumber}
      />

      <InquirySummary
        destination={
          inquiry.destination?.name || "Destination unavailable"
        }
        travelDate={inquiry.travelDate}
        travelers={inquiry.travelers}
        pickupLocation={inquiry.pickupLocation}
        message={inquiry.message}
      />

      <InquiryNextSteps />

      <InquirySuccessActions />

      <InquirySuccessSupport />
    </main>
  );
}