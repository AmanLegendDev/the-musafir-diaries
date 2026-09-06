"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Hotel,
  Headphones,
  Mountain,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Your booking is protected with verified reservations and transparent pricing.",
  },
  {
    icon: Hotel,
    title: "Luxury Stays",
    description:
      "Handpicked premium hotels, resorts and boutique mountain stays.",
  },
  {
    icon: Mountain,
    title: "Local Experts",
    description:
      "Travel with experienced Himalayan guides who know every hidden gem.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description:
      "Dedicated travel assistance before, during and after your journey.",
  },
];

export default function BookingFeatures() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-sky-50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0F4C81]">
            Why Book With Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Every Journey Built Around
            <span className="block text-[#0F4C81]">
              Comfort & Trust
            </span>
          </h2>

        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg transition"
              >
                <div className="inline-flex rounded-2xl bg-sky-100 p-4 text-[#0F4C81]">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
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