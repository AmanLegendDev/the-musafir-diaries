"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";

export default function DestinationCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      {/* Editorial accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-28 bg-[#F59E0B] sm:w-40"
      />

      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#1597C7]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#1597C7]/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-px w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1597C7]">
                Where next?
              </span>
            </div>

            <h2 className="max-w-4xl font-serif text-4xl font-medium leading-[1.06] tracking-[-0.035em] text-[#FAF9F5] sm:text-5xl lg:text-6xl xl:text-7xl">
              Every destination has
              <span className="block text-[#1597C7]">
                a story waiting for you.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              You choose the place. We help shape the journey
              around it — thoughtfully planned, personally
              considered and made to be remembered.
            </p>
          </motion.div>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-4 lg:flex lg:flex-col lg:items-end"
          >
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#FAF9F5]"
            >
              Plan Your Journey

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </Link>

            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              <Compass
                className="h-3.5 w-3.5 text-[#1597C7]"
                strokeWidth={1.7}
              />

              Thoughtfully considered
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}