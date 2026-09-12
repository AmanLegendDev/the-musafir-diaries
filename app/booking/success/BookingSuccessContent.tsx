"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import BookingSuccessHero from "@/components/booking/success/BookingSuccessHero";
import BookingReference from "@/components/booking/success/BookingReference";
import BookingJourneySummary from "@/components/booking/success/BookingJourneySummary";
import BookingNextSteps from "@/components/booking/success/BookingNextSteps";
import BookingSuccessActions from "@/components/booking/success/BookingSuccessActions";
import BookingSuccessSupport from "@/components/booking/success/BookingSuccessSupport";

type BookingData = {
  bookingNumber: string;

  bookingStatus?: string;

  packageSnapshot?: {
    name: string;
    slug: string;
    duration: string;
    originalPrice: number;
    discountedPrice: number;
  };

  travelDate?: string;

  adults?: number;

  children?: number;

  pickupLocation?: string;

  pricing?: {
    adultTotal: number;
    childTotal: number;
    subtotal: number;
    total: number;
  };
};

export default function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("id");

  const [booking, setBooking] =
    useState<BookingData | null>(null);

  const [loading, setLoading] = useState(
    Boolean(bookingId),
  );

  const [error, setError] = useState(
    bookingId
      ? ""
      : "Booking reference is missing.",
  );

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    let cancelled = false;

 async function loadBooking() {
  try {
    const id = bookingId;

    if (!id) {
      return;
    }

    const response = await fetch(
      `/api/bookings/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

        const result = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Booking could not be loaded.",
          );
        }

        const data =
          result?.booking ??
          result?.data ??
          result;

        if (!data?.bookingNumber) {
          throw new Error(
            "Invalid booking response.",
          );
        }

        if (!cancelled) {
          setBooking(data);
        }
      } catch {
        if (!cancelled) {
          setError(
            "We received your request, but the booking details could not be loaded right now.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBooking();

    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  /*
   * Missing booking reference
   */
  if (!bookingId) {
    return (
      <main className="min-h-screen bg-[#FAF9F5]">
        <BookingSuccessHero />

        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#F06A5B]/20 bg-white p-6 text-center shadow-[0_20px_60px_rgba(7,26,51,0.07)] sm:p-8">
            <h2 className="text-xl font-semibold text-[#071A33]">
              Booking reference is missing
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#071A33]/60">
              We couldn&apos;t find a booking reference in
              this URL. Please return to the booking page
              and try again.
            </p>

            <a
              href="/booking"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
            >
              Back to booking
            </a>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Loading
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F5]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-[#071A33]/10" />

            <div className="mx-auto h-10 max-w-md rounded-xl bg-[#071A33]/10" />

            <div className="mx-auto h-5 max-w-xl rounded bg-[#071A33]/5" />

            <div className="mx-auto mt-10 h-28 max-w-4xl rounded-3xl bg-white" />

            <div className="mx-auto h-80 max-w-4xl rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * Fetch failed
   */
  if (error || !booking) {
    return (
      <main className="min-h-screen bg-[#FAF9F5]">
        <BookingSuccessHero />

        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#F06A5B]/20 bg-white p-6 text-center shadow-[0_20px_60px_rgba(7,26,51,0.07)] sm:p-8">
            <h2 className="text-xl font-semibold text-[#071A33]">
              Your request was submitted
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#071A33]/60">
              {error ||
                "Your booking request has been received. Please contact us if you need help retrieving the reference."}
            </p>

            <div className="mt-6 rounded-2xl bg-[#FAF9F5] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/40">
                Reference
              </p>

              <p className="mt-1 break-all font-mono text-sm font-semibold text-[#071A33]">
                {bookingId}
              </p>
            </div>

            <div className="mt-6">
              <BookingSuccessSupport />
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Success
   */
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#071A33]">
      <BookingSuccessHero />

      <BookingReference
        bookingNumber={booking.bookingNumber}
      />

      <BookingJourneySummary
        packageSnapshot={booking.packageSnapshot}
        travelDate={booking.travelDate}
        adults={booking.adults}
        childCount={booking.children}
        pickupLocation={booking.pickupLocation}
        total={booking.pricing?.total}
      />

      <BookingNextSteps />

      <BookingSuccessActions
        bookingNumber={booking.bookingNumber}
      />

      <BookingSuccessSupport />
    </main>
  );
}