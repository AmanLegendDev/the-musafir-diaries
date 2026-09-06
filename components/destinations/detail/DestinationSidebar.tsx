import {
  BadgeCheck,
  CalendarDays,
  Headphones,
  MapPin,
  Mountain,
  Phone,
  ShieldCheck,
} from "lucide-react";

import DestinationBookingCard from "./DestinationBookingCard";

interface DestinationSidebarProps {
  startingPrice: number;
  rating: number;
  reviewCount: number;
  city: string;
  state: string;
  country: string;
  altitude: string;
  bestTime: string;
}

export default function DestinationSidebar({
  startingPrice,
  rating,
  reviewCount,
  city,
  state,
  country,
  altitude,
  bestTime,
}: DestinationSidebarProps) {
  const quickInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: [city, state, country]
        .filter(Boolean)
        .join(", "),
    },
    {
      icon: Mountain,
      label: "Altitude",
      value: altitude || "Not Available",
    },
    {
      icon: CalendarDays,
      label: "Best Time",
      value: bestTime || "Year Round",
    },
  ];

  const whyChooseUs = [
    "Trusted Travel Experts",
    "Best Price Guarantee",
    "Secure Booking Process",
    "24×7 Customer Support",
  ];

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">

      {/* Booking Card */}

      <DestinationBookingCard
        startingPrice={startingPrice}
        rating={rating}
        reviewCount={reviewCount}
      />

      {/* Quick Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="text-xl font-bold text-slate-900">
          Quick Information
        </h3>

        <div className="mt-6 space-y-5">

          {quickInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Why Choose Us */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="text-xl font-bold text-slate-900">
          Why Book With Us
        </h3>

        <div className="mt-6 space-y-4">

          {whyChooseUs.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <BadgeCheck className="h-5 w-5 text-emerald-600" />

              <span className="text-slate-700">
                {item}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Contact */}

      <div className="rounded-3xl bg-emerald-600 p-6 text-white shadow-lg">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
          <Headphones className="h-7 w-7" />
        </div>

        <h3 className="mt-5 text-2xl font-bold">
          Need Assistance?
        </h3>

        <p className="mt-3 leading-7 text-emerald-50">
          Our travel specialists are ready to help you
          choose the perfect package and answer all your
          questions.
        </p>

        <a
          href="tel:+919999999999"
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-5
            py-3
            font-semibold
            text-emerald-700
            transition-all
            hover:scale-[1.02]
          "
        >
          <Phone className="h-5 w-5" />
          Call Now
        </a>

      </div>

      {/* Trust Note */}

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck className="mt-1 h-6 w-6 text-emerald-700" />

          <div>

            <h4 className="font-semibold text-slate-900">
              Safe & Reliable Travel
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              We partner with trusted hotels, transport
              providers and local experts to ensure a safe,
              comfortable and memorable travel experience.
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}