"use client";

import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Mountain,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const VISION_STEPS = [
  {
    number: "TODAY",
    title: "A growing travel business",
    text: "Rooted in Shimla and focused on creating better journeys through Himachal Pradesh.",
    icon: Mountain,
  },
  {
    number: "NEXT",
    title: "A stronger travel experience",
    text: "Better planning, more thoughtful journeys, and a digital experience that makes discovering Himachal easier.",
    icon: Compass,
  },
  {
    number: "FUTURE",
    title: "A trusted Himalayan brand",
    text: "A travel brand people can discover, trust, return to, and recommend because of the experiences behind it.",
    icon: Sparkles,
  },
];

export default function AboutVision() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#087E8B]/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-[#1597C7]/10 blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Where we&apos;re headed
              </span>
            </div>

            <p className="mt-7 max-w-[220px] font-serif text-2xl leading-tight tracking-[-0.025em] text-white/70">
              The story is still
              <span className="text-[#5CC6D0]"> unfolding.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <h2 className="max-w-5xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[4.4rem]">
              We&apos;re not trying to become the biggest.
              <span className="block text-[#5CC6D0]">
                We&apos;re trying to build something worth remembering.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              The goal is simple: build a Himalayan travel brand that grows
              with its travellers, learns from every journey, and becomes
              better with time.
            </p>
          </motion.div>
        </div>

        {/* Vision path */}
        <div className="relative mt-16 lg:mt-20">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {VISION_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.09,
                  }}
                  className="group relative border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:p-8"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-[#F59E0B]">
                      {step.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#5CC6D0]">
                      <Icon className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                  </div>

                  <h3 className="mt-10 font-serif text-2xl leading-tight tracking-[-0.025em] text-white/90 sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/40">
                    {step.text}
                  </p>

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#087E8B] transition-all duration-500 group-hover:w-full" />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl font-serif text-xl leading-tight tracking-[-0.02em] text-white/65 sm:text-2xl">
            Growth, but with the mountains and the traveller still at the
            centre.
          </p>

          <Link
            href="/destinations"
            className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-[#5CC6D0]"
          >
            Explore the journey

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}