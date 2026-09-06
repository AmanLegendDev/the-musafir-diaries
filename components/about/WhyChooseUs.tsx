"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mountain,
  Hotel,
  Clock3,
  MapPinned,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Mountain,
    title: "Local Himalayan Experts",
    description:
      "Our team knows the Himalayas inside out, helping you discover hidden gems beyond the usual tourist routes.",
  },
  {
    icon: Hotel,
    title: "Handpicked Premium Stays",
    description:
      "Every hotel, resort, and homestay is carefully selected to ensure comfort, quality, and unforgettable views.",
  },
  {
    icon: MapPinned,
    title: "Tailor-Made Itineraries",
    description:
      "No two travelers are the same. We customize every itinerary to match your interests, pace, and travel goals.",
  },
  {
    icon: Clock3,
    title: "24/7 Travel Assistance",
    description:
      "Our support team is always available before, during, and after your journey for complete peace of mind.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable Travel",
    description:
      "Safety comes first. We partner only with trusted drivers, accommodations, and local operators.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Pricing",
    description:
      "No hidden charges, no surprises. We believe in honest pricing and exceptional value for every traveler.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Why Choose Us

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            More Than A Tour —
            <span className="text-emerald-600">
              {" "}A Trusted Travel Partner
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Every journey is carefully planned with attention to detail,
            local expertise, premium hospitality, and genuine care so
            that your travel experience becomes unforgettable.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-xl"
              >

                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon className="h-8 w-8 text-emerald-600 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">

                  {feature.title}

                </h3>

                <p className="mt-5 leading-8 text-slate-600">

                  {feature.description}

                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}