"use client";

import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#087E8B]/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#1597C7]/10 blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Your next chapter
              </span>
            </div>

            <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.6rem]">
              Some journeys
              <span className="block text-[#5CC6D0]">
                need a conversation.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              You don&apos;t have to know every answer yet. Tell us what you
              are imagining, and let&apos;s take the first step together.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#f8b83f]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/destinations"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                Explore destinations
              </Link>
            </div>
          </div>

          {/* Decorative editorial block */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-[270px] border-l border-white/10 pl-7">
              <Mountain
                className="h-7 w-7 text-[#5CC6D0]"
                strokeWidth={1.2}
              />

              <p className="mt-6 font-serif text-2xl leading-tight tracking-[-0.025em] text-white/75">
                The mountains are waiting.
              </p>

              <p className="mt-4 text-xs leading-6 text-white/35">
                All that&apos;s left is deciding where the story begins.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}