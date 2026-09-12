"use client";

import Link from "next/link";
import { ArrowRight, Check, Mountain, Route, Users } from "lucide-react";
import { motion } from "framer-motion";

const EXPERIENCE_POINTS = [
  {
    icon: Route,
    title: "Real journeys",
    text: "We have already helped travellers turn plans into actual trips.",
  },
  {
    icon: Mountain,
    title: "Himachal at the centre",
    text: "Our work is rooted in the places, landscapes and routes we know around Himachal.",
  },
  {
    icon: Users,
    title: "People first",
    text: "Every journey starts with understanding the traveller behind the booking.",
  },
];

export default function AboutExperience() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          {/* Editorial visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="relative min-h-[480px] overflow-hidden bg-[#071A33] sm:min-h-[560px]"
          >
            {/* Atmospheric shapes */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#087E8B]/20 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#1597C7]/15 blur-3xl" />

            {/* Mountain-inspired lines */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-20">
              <svg
                viewBox="0 0 800 500"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M0 430 L150 250 L235 345 L360 145 L510 330 L620 210 L800 410 V500 H0 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[#5CC6D0]"
                />

                <path
                  d="M0 455 L190 320 L285 380 L420 220 L565 360 L690 280 L800 430"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white"
                />
              </svg>
            </div>

            {/* Editorial copy */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
                Real experience
              </p>

              <h3 className="mt-5 max-w-md font-serif text-3xl leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                The journey isn&apos;t just something we talk about.
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
                It is something we continue to learn from — trip after trip,
                conversation after conversation.
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#087E8B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Real travel experience
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.15rem]">
              We&apos;ve already taken the
              <span className="text-[#087E8B]"> first steps.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              The Musafir Diaries is still a growing business, but the
              experience behind it is not only an idea. We have already helped
              travellers experience journeys through Himachal — and every trip
              continues to teach us how to do the work better.
            </p>

            {/* Experience points */}
            <div className="mt-10 space-y-0 border-t border-[#071A33]/10">
              {EXPERIENCE_POINTS.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.title}
                    className="flex gap-4 border-b border-[#071A33]/10 py-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/[0.05] text-[#087E8B]">
                      <Icon className="h-4 w-4" strokeWidth={1.4} />
                    </div>

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

            {/* Trust note */}
            <div className="mt-8 flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087E8B]" />

              <p className="text-xs leading-5 text-[#071A33]/40">
                We would rather let real journeys shape our reputation than
                fill this page with numbers that don&apos;t tell the whole
                story.
              </p>
            </div>

            <Link
              href="/destinations"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#087E8B]"
            >
              See where you can go

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}