"use client";

import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#087E8B]/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-[#1597C7]/10 blur-3xl" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
        >
          {/* Main */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Your story could start here
              </span>
            </div>

            <h2 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.6rem]">
              The mountains are out there.
              <span className="block text-[#5CC6D0]">
                Maybe your next story is too.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Whether you already know where you want to go or you&apos;re
              simply curious about what comes next, the first step is a
              conversation.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
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

          {/* Editorial note */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-[270px] border-l border-white/10 pl-7">
              <Mountain
                className="h-7 w-7 text-[#5CC6D0]"
                strokeWidth={1.2}
              />

              <p className="mt-6 font-serif text-2xl leading-tight tracking-[-0.025em] text-white/75">
                From Shimla,
                <span className="block text-[#5CC6D0]">
                  towards somewhere new.
                </span>
              </p>

              <div className="mt-6 h-px w-12 bg-[#F59E0B]" />

              <p className="mt-5 text-xs leading-6 text-white/35">
                The Musafir Diaries
                <br />
                Himachal Pradesh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 border-t border-white/10 pt-6"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            The story continues
          </p>
        </motion.div>
      </div>
    </section>
  );
}