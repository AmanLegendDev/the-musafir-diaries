

"use client";

import {
  Check,
  Heart,
  Mountain,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const TRUST_POINTS = [
  {
    icon: Mountain,
    title: "Rooted in Shimla",
    text: "Our story and work are connected to Himachal Pradesh.",
  },
  {
    icon: Heart,
    title: "Real travel experience",
    text: "The business has already helped travellers turn plans into actual journeys.",
  },
  {
    icon: ShieldCheck,
    title: "Honest by design",
    text: "We would rather show where we are today than make claims that belong to tomorrow.",
  },
];

export default function AboutTrust() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Left statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                A little honesty
              </span>
            </div>

            <h2 className="mt-6 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
              Still growing.
              <span className="block text-[#087E8B]">
                Still learning.
              </span>
              Still going.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              The Musafir Diaries is a growing business. We think that is
              worth saying clearly.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <div className="border border-[#071A33]/10 bg-white p-7 sm:p-9 lg:p-10">
              <p className="max-w-3xl font-serif text-2xl leading-[1.25] tracking-[-0.025em] text-[#071A33] sm:text-3xl">
                We don&apos;t want to dress the business up with numbers that
                don&apos;t mean anything.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                We would rather earn trust one journey at a time — by
                communicating clearly, learning from the experience, and
                continuously improving what we do.
              </p>

              <div className="mt-9 border-t border-[#071A33]/10 pt-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/30">
                  What that means
                </p>

                <div className="mt-6 space-y-0">
                  {TRUST_POINTS.map((point) => {
                    const Icon = point.icon;

                    return (
                      <div
                        key={point.title}
                        className="flex gap-4 border-b border-[#071A33]/8 py-5 first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/[0.05] text-[#087E8B]">
                          <Icon className="h-4 w-4" strokeWidth={1.4} />
                        </span>

                        <div>
                          <h3 className="text-sm font-semibold text-[#071A33]">
                            {point.title}
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-[#071A33]/45">
                            {point.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Honest positioning */}
            <div className="mt-5 flex items-start gap-3 border border-[#087E8B]/10 bg-[#087E8B]/[0.04] px-5 py-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087E8B]" />

              <p className="text-xs leading-5 text-[#071A33]/45">
                Our aim is not to appear established overnight. It is to build
                something genuinely worth trusting over time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}