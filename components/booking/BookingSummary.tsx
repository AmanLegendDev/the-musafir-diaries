"use client";

import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

export default function BookingSummary() {
  return (
    <div className="space-y-6">

      {/* Summary Card */}

      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#0F4C81] to-[#3BAEA0] px-7 py-6 text-white">

          <p className="text-xs uppercase tracking-[0.25em] text-white/80">
            Booking Summary
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Your Journey
          </h2>

        </div>

        {/* Body */}

        <div className="space-y-5 p-7">

          <SummaryItem
            icon={<MapPin size={18} />}
            label="Package"
            value="Select a Package"
          />

          <SummaryItem
            icon={<CalendarDays size={18} />}
            label="Travel Date"
            value="Not Selected"
          />

          <SummaryItem
            icon={<Users size={18} />}
            label="Guests"
            value="0 Adults"
          />

          <div className="border-t border-dashed pt-5">

            <div className="flex items-center justify-between">

              <span className="text-slate-500">
                Estimated Price
              </span>

              <span className="text-3xl font-bold text-[#0F4C81]">
                ₹0
              </span>

            </div>

            <p className="mt-2 text-xs text-slate-500">
              Final quotation will be shared after booking confirmation.
            </p>

          </div>

        </div>

      </div>

      {/* Trust Card */}

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
            <ShieldCheck size={22} />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Secure Booking
            </h3>

            <p className="text-sm text-slate-500">
              100% Safe & Verified
            </p>

          </div>

        </div>

        <div className="mt-6 space-y-3 text-sm">

          <Feature text="Instant Booking Confirmation" />

          <Feature text="No Hidden Charges" />

          <Feature text="Trusted Local Experts" />

          <Feature text="24×7 Customer Support" />

        </div>

      </div>

      {/* Contact Card */}

      <div className="rounded-[28px] bg-gradient-to-br from-[#0F4C81] to-[#114E83] p-7 text-white shadow-xl">

        <h3 className="text-xl font-bold">
          Need Help?
        </h3>

        <p className="mt-2 text-sm leading-7 text-white/80">
          Our travel experts are available to help you plan the perfect Himalayan journey.
        </p>

        <div className="mt-6 space-y-3">

          <Link
            href="tel:+919999999999"
            className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/20"
          >
            <Phone size={18} />

            Call Now
          </Link>

          <Link
            href="https://wa.me/919999999999"
            className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/20"
          >
            <MessageCircle size={18} />

            WhatsApp
          </Link>

        </div>

      </div>

      {/* Payment */}

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-sky-100 p-3 text-[#0F4C81]">

            <CreditCard size={22} />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Flexible Payment
            </h3>

            <p className="text-sm text-slate-500">
              Pay securely after confirmation
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-slate-100 p-2 text-[#0F4C81]">
          {icon}
        </div>

        <span className="text-slate-600">
          {label}
        </span>

      </div>

      <span className="font-semibold text-slate-900">
        {value}
      </span>

    </div>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <BadgeCheck
        size={18}
        className="text-emerald-500"
      />

      <span className="text-slate-600">
        {text}
      </span>

    </div>
  );
}