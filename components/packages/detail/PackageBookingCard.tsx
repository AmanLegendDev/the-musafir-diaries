"use client";

import Link from "next/link";

import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MessageCircle,
  Phone,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

interface PackageBookingCardProps {
  packageName: string;
  duration: string;
  groupSize: string;
  originalPrice: number;
  discountedPrice: number;
}

export default function PackageBookingCard({
  packageName,
  duration,
  groupSize,
  originalPrice,
  discountedPrice,
}: PackageBookingCardProps) {
  const savings = originalPrice - discountedPrice;

  const discount =
    originalPrice > 0
      ? Math.round((savings / originalPrice) * 100)
      : 0;

  return (
    <aside className="lg:sticky lg:top-24">

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">

          <p className="text-sm opacity-90">
            Starting From
          </p>

          <div className="mt-2 flex items-end gap-3">

            <h2 className="text-4xl font-bold">
              ₹{discountedPrice.toLocaleString("en-IN")}
            </h2>

            {discount > 0 && (
              <span className="pb-1 text-lg text-emerald-100 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}

          </div>

          {discount > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">

              <Tag className="h-4 w-4" />

              Save ₹
              {savings.toLocaleString("en-IN")} ({discount}% OFF)

            </div>
          )}

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="flex items-center gap-2 text-slate-600">

                <CalendarDays className="h-5 w-5 text-emerald-600" />

                Duration

              </span>

              <span className="font-semibold text-slate-900">
                {duration}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="flex items-center gap-2 text-slate-600">

                <Users className="h-5 w-5 text-emerald-600" />

                Group Size

              </span>

              <span className="font-semibold text-slate-900">
                {groupSize}
              </span>

            </div>

          </div>

          <div className="h-px bg-slate-200" />

          {/* CTA */}

          <div className="space-y-3">

            <Link
              href="/booking"
              className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Book This Package
            </Link>

            <Link
              href="/inquiry"
              target="_blank"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" />

              Inquire Now
            </Link>

            <Link
              href="tel:+919999999999"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              <Phone className="h-5 w-5" />

              Call Travel Expert
            </Link>

          </div>

          <div className="h-px bg-slate-200" />

          {/* Trust Badges */}

          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3 text-slate-700">

              <ShieldCheck className="h-5 w-5 text-emerald-600" />

              Secure Booking Process

            </div>

            <div className="flex items-center gap-3 text-slate-700">

              <BadgeCheck className="h-5 w-5 text-emerald-600" />

              Instant Booking Confirmation

            </div>

            <div className="flex items-center gap-3 text-slate-700">

              <CreditCard className="h-5 w-5 text-emerald-600" />

              Multiple Payment Options

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}