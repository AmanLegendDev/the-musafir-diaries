"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#071A33] text-white">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-18%] h-[420px] w-[420px] rounded-full bg-[#087E8B]/15 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#1597C7]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,51,0.72),rgba(7,26,51,0.96))]" />

        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Top editorial line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

      <div className="mx-auto flex min-h-[78vh] max-w-7xl items-end px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="grid w-full gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          {/* Main copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#F59E0B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Start a conversation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-4xl font-serif text-[3.35rem] leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-[6.25rem]"
            >
              Let&apos;s talk about
              <span className="block text-[#5CC6D0]">
                where you&apos;re going.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 max-w-2xl text-sm leading-7 text-white/58 sm:text-base sm:leading-8"
            >
              Tell us what kind of journey you have in mind. Whether you already
              know where you&apos;re headed or you&apos;re still figuring it out,
              we&apos;ll help you shape the next step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#f8b83f]"
              >
                Plan your journey
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/destinations"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                Explore destinations
              </Link>
            </motion.div>
          </div>

          {/* Editorial side note */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="max-w-[250px] border-l border-white/15 pl-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                The Musafir Diaries
              </p>

              <p className="mt-5 font-serif text-2xl leading-tight tracking-[-0.025em] text-white/85">
                Every memorable journey begins with a simple conversation.
              </p>

              <p className="mt-5 text-xs leading-6 text-white/40">
                Destinations, ideas, questions — start wherever feels right.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-7 right-5 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white/70 sm:flex lg:right-12"
      >
        <span>Continue</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
          <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </motion.a>
    </section>
  );
}