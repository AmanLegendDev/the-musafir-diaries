"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Mountain } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative isolate min-h-[82vh] overflow-hidden bg-[#071A33] text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/hero/himalayan-hero.webp"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Image treatment */}
      <div className="absolute inset-0 -z-10 bg-[#071A33]/65" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,26,51,0.42)_0%,rgba(7,26,51,0.72)_55%,rgba(7,26,51,0.96)_100%)]" />

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#087E8B]/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#1597C7]/10 blur-3xl" />

      {/* Editorial grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="mx-auto flex min-h-[82vh] max-w-7xl items-end px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="grid w-full gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          {/* Main content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                About The Musafir Diaries
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="mt-7 max-w-5xl font-serif text-[3.4rem] leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-[6.35rem]"
            >
              More than a trip.
              <span className="block text-[#5CC6D0]">
                A way of seeing
              </span>
              <span className="block">the mountains.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-8 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
            >
              Born in Shimla, The Musafir Diaries is a growing travel business
              built around meaningful journeys through Himachal Pradesh —
              shaped by the mountains, real travel experiences, and the people
              we meet along the way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.27 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#f8b83f]"
              >
                Explore our journeys

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
              >
                Our story
              </a>
            </motion.div>
          </div>

          {/* Editorial side panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="max-w-[280px] border-l border-white/15 pl-7">
              <Mountain
                className="h-7 w-7 text-[#5CC6D0]"
                strokeWidth={1.2}
              />

              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Rooted in Himachal
              </p>

              <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.025em] text-white/85">
                A travel business growing from the mountains we call home.
              </p>

              <div className="mt-6 h-px w-14 bg-[#F59E0B]/70" />

              <p className="mt-5 text-xs leading-6 text-white/40">
                Shimla · Himachal Pradesh
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#our-story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-7 right-5 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white/70 sm:flex lg:right-12"
      >
        <span>Our story</span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
          <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </motion.a>
    </section>
  );
}