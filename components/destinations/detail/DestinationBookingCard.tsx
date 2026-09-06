"use client";

import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Phone,
  ShieldCheck,
  Star,
  Wallet,
} from "lucide-react";

interface DestinationBookingCardProps {
  startingPrice: number;
  rating: number;
  reviewCount: number;
}

export default function DestinationBookingCard({
  startingPrice,
  rating,
  reviewCount,
}: DestinationBookingCardProps) {
  return (
    <aside className="lg:sticky lg:top-24">

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-lg
        "
      >

        {/* Header */}

        <div className="border-b border-slate-100 p-6">

          <p className="text-sm text-slate-500">
            Starting From
          </p>

          <div className="mt-2 flex items-end gap-2">
            <h2 className="text-4xl font-bold text-slate-900">
              ₹{startingPrice.toLocaleString("en-IN")}
            </h2>

            <span className="pb-1 text-slate-500">
              / person
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2">

            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

            <span className="font-semibold text-slate-800">
              {rating.toFixed(1)}
            </span>

            <span className="text-slate-500">
              ({reviewCount} Reviews)
            </span>

          </div>

        </div>

        {/* Features */}

        <div className="space-y-4 p-6">

          <div className="flex items-center gap-3">

            <BadgeCheck className="h-5 w-5 text-emerald-600" />

            <span className="text-slate-700">
              Verified Destination
            </span>

          </div>

          <div className="flex items-center gap-3">

            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            <span className="text-slate-700">
              Secure Booking Process
            </span>

          </div>

          <div className="flex items-center gap-3">

            <CalendarDays className="h-5 w-5 text-emerald-600" />

            <span className="text-slate-700">
              Flexible Travel Dates
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Wallet className="h-5 w-5 text-emerald-600" />

            <span className="text-slate-700">
              Best Price Guarantee
            </span>

          </div>

        </div>

        {/* CTA */}

        <div className="space-y-3 border-t border-slate-100 p-6">

          <Link
            href="/booking"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              bg-emerald-600
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-emerald-700
            "
          >
            Book This Trip
          </Link>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-600
              font-semibold
              text-emerald-700
              transition-all
              duration-300
              hover:bg-emerald-50
            "
          >
            WhatsApp Us
          </a>

          <a
            href="tel:+919999999999"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-300
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:border-slate-400
              hover:bg-slate-50
            "
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>

        </div>

      </div>

    </aside>
  );
}