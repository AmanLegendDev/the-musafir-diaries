"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Handshake,
  Mountain,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Clear planning",
    text: "We want the important details of your journey to be understood before you travel.",
  },
  {
    icon: Handshake,
    title: "Shared understanding",
    text: "A smooth trip works best when both the traveller and the travel business know their responsibilities.",
  },
  {
    icon: Mountain,
    title: "Real conditions",
    text: "Mountain travel can change with weather, roads, availability and local circumstances.",
  },
];

export default function TermsIntro() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          {/* Editorial label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                A note before you travel
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#071A33]/45">
              We know terms and conditions aren't the most exciting
              part of planning a trip. They're here so the important
              things are clear.
            </p>
          </motion.div>

          {/* Main copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
              About these terms
            </p>

            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
              A journey is better when the expectations are clear
              from the beginning.
            </h2>

            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              The Musafir Diaries helps travellers explore and plan
              journeys through Himachal Pradesh and other
              destinations offered through our services. Depending
              on your trip, your journey may involve independent
              accommodation providers, transportation operators,
              activity providers and other third-party services.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              These Terms & Conditions describe the general basis on
              which enquiries, bookings, payments, travel
              arrangements and related services are handled. Some
              journeys may also have specific terms or supplier
              conditions that apply to that particular booking.
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="mt-16 grid border-t border-[#071A33]/10 sm:grid-cols-3">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className={`py-8 sm:px-7 sm:py-9 ${
                  index > 0
                    ? "border-t border-[#071A33]/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#087E8B]/20 bg-white text-[#087E8B]">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-[#071A33]/45">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}