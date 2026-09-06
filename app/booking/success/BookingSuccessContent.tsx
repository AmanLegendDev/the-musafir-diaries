"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId =
    searchParams.get("id");

  return (
  <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">

  {/* Background */}

  <div className="absolute inset-0 overflow-hidden">

    <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-[#0F4C81]/5 blur-3xl" />

    <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[#3BAEA0]/10 blur-3xl" />

    <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl" />

  </div>

  <div className="relative mx-auto max-w-5xl px-6">

    <div className="overflow-hidden rounded-[40px] border border-white/60 bg-white/90 shadow-[0_30px_80px_rgba(15,76,129,0.12)] backdrop-blur-xl">

      {/* Hero */}

      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F4C81] via-[#17669B] to-[#3BAEA0] px-8 py-14 text-white md:px-12">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10 bg-white/5" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col items-center text-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">

              <CheckCircle2
                size={54}
                className="text-emerald-500"
              />

            </div>

          </div>

          <div className="mt-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">

            Booking Request Received

          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">

            Thank You For Choosing
            <br />
            Altitude Escapes

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">

            Your booking request has been successfully submitted.

            <br />

            Our travel specialists are now reviewing your request and will
            contact you shortly to confirm availability, answer any questions,
            and guide you through the next steps.

          </p>

        </div>

      </div>

      <div className="p-6 sm:p-8 lg:p-10">
                {/* Booking Reference */}

        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-8">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
              🎟️
            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#081C2D]">
                Booking Reference
              </h2>

              <p className="mt-1 text-slate-600">
                Save these details for future communication.
              </p>

            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Booking ID */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Booking Reference
              </p>

              <p className="mt-3 break-all font-mono text-lg font-bold text-[#081C2D]">
                {bookingId ?? "Generating..."}
              </p>

            </div>

            {/* Date */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Booking Date
              </p>

              <p className="mt-3 text-lg font-semibold text-[#081C2D]">

                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}

              </p>

            </div>

            {/* Email */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Support Email
              </p>

              <p className="mt-3 break-all text-lg font-semibold text-[#081C2D]">
                support@altitudeescapes.com
              </p>

            </div>

            {/* Phone */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Support Phone
              </p>

              <p className="mt-3 text-lg font-semibold text-[#081C2D]">
                +91 98765 43210
              </p>

            </div>

          </div>

        </div>
                {/* What Happens Next */}

        <div className="mt-10 rounded-[32px] bg-gradient-to-br from-[#0F4C81] via-[#17669B] to-[#3BAEA0] p-8 text-white shadow-2xl">

          <div className="mb-10">

            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
              Next Steps
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              What Happens Next?
            </h2>

            <p className="mt-3 max-w-2xl leading-8 text-white/85">
              Our team will take care of everything from here. You don't need
              to do anything right now—we'll contact you shortly.
            </p>

          </div>

          <div className="space-y-8">

            {/* Step */}

            <div className="flex gap-5">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0F4C81]">
                1
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Booking Under Review
                </h3>

                <p className="mt-2 leading-7 text-white/80">
                  Our travel specialist is reviewing your booking request and
                  checking package availability.
                </p>

              </div>

            </div>

            {/* Step */}

            <div className="flex gap-5">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0F4C81]">
                2
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Personal Confirmation Call
                </h3>

                <p className="mt-2 leading-7 text-white/80">
                  One of our travel experts will contact you to confirm your
                  travel dates, guests, and answer any questions.
                </p>

              </div>

            </div>

            {/* Step */}

            <div className="flex gap-5">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0F4C81]">
                3
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Payment & Confirmation
                </h3>

                <p className="mt-2 leading-7 text-white/80">
                  After confirmation, we'll securely share your payment details,
                  invoice, hotel information, and complete itinerary.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Important Notice */}

        <div className="mt-10 rounded-[32px] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8">

          <div className="flex items-start gap-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
              ⚠️
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#081C2D]">
                Important Information
              </h3>

              <p className="mt-4 leading-8 text-slate-700">
                Please keep your booking reference safe. Our travel specialist
                will normally contact you within the next <strong>30–60 minutes</strong>
                during business hours. Response times may vary slightly during
                weekends and public holidays.
              </p>

            </div>

          </div>

        </div>
                {/* Need Help */}

        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

          <div className="text-center">

            <div className="inline-flex items-center rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81]">
              We're Here To Help
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#081C2D]">
              Need Assistance?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
              Have questions before our team contacts you? Reach out anytime.
              Our travel specialists are always happy to help.
            </p>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                📞
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#081C2D]">
                Call Us
              </h3>

              <p className="mt-2 text-slate-600">
                +91 98765 43210
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#081C2D]">
                WhatsApp
              </h3>

              <p className="mt-2 text-slate-600">
                Instant Travel Support
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                ✉️
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#081C2D]">
                Email
              </h3>

              <p className="mt-2 break-all text-slate-600">
                support@altitudeescapes.com
              </p>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-10 flex flex-col gap-5 sm:flex-row">

          <Link
            href="/packages"
            className="
              flex-1
              rounded-full
              bg-gradient-to-r
              from-[#0F4C81]
              via-[#17669B]
              to-[#3BAEA0]
              px-8
              py-4
              text-center
              text-lg
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            Explore More Packages
          </Link>

          <Link
            href="/"
            className="
              flex-1
              rounded-full
              border
              border-slate-300
              bg-white
              px-8
              py-4
              text-center
              text-lg
              font-semibold
              text-[#081C2D]
              transition-all
              duration-300
              hover:border-[#0F4C81]
              hover:bg-slate-50
            "
          >
            Back To Home
          </Link>

        </div>

      </div>

    </div>

  </div>

</section>
  );
}