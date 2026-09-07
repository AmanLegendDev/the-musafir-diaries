"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Compass,
  Construction,
} from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071A33] text-[#FAF9F5]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/home/hero/himalayan-hero.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-[#071A33]/85" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33] via-[#071A33]/85 to-[#071A33]/55" />

      {/* Atmospheric Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#1597C7]/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#F59E0B]/10 blur-[140px]" />

      {/* Decorative Lines */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-px w-32 bg-white/15" />
      <div className="pointer-events-none absolute bottom-32 right-0 h-px w-40 bg-white/10" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
          <Link
            href="/"
            aria-label="The Musafir Diaries home"
            className="group flex items-center gap-3"
          >
            <div className="relative h-11 w-11 shrink-0">
              <img
                src="/logo.png"
                alt="The Musafir Diaries"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="flex flex-col font-serif leading-[0.9]">
              <span className="text-[15px] font-bold text-white">
                The Musafir
              </span>

              <span className="mt-1 text-[15px] font-bold text-[#087E8B]">
                Diaries
              </span>
            </span>
          </Link>

          <span className="hidden text-[9px] font-medium uppercase tracking-[0.3em] text-white/40 sm:block">
            Himalayan Travel Stories
          </span>
        </header>

        {/* Main */}
        <div className="flex flex-1 items-center px-6 pb-24 pt-12 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-7 flex items-center gap-4"
              >
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65 sm:text-xs">
                  A new chapter is coming
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-4xl font-serif text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.055em]"
              >
                This journey
                <br />
                is still being
                <br />
                <span className="text-[#1597C7]">written.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                }}
                className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
              >
                We're carefully crafting this part of The Musafir Diaries.
                New places, new experiences and new stories are on their way.
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#FAF9F5] px-6 py-3.5 text-sm font-bold text-[#071A33] transition-all duration-300 hover:bg-white hover:shadow-[0_15px_45px_rgba(250,249,245,0.16)]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

                  Back Home
                </Link>

                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/15"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#087E8B]">
                    <Compass className="h-3.5 w-3.5" />
                  </span>

                  Explore The Diaries

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* Bottom Editorial Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Construction className="h-4 w-4 text-[#F59E0B]" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
                    Currently crafting
                  </p>

                  <p className="mt-1 font-serif text-lg text-white/80">
                    Something worth the journey.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                  The Musafir Diaries
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Himachal Pradesh · India
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#087E8B] via-[#1597C7] to-[#F59E0B]" />
      </div>
    </main>
  );
}