"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

import {
  HERO_CONTENT,
  HERO_STATS,
} from "./heroData";

export default function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="max-w-3xl"
    >
      {/* Eyebrow */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 },
          },
        }}
        className="mb-7 flex items-center gap-4"
      >
        <span className="h-px w-10 bg-[#F59E0B]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/75 sm:text-xs">
         {HERO_CONTENT.eyebrow}
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        id="hero-heading"
        variants={{
          hidden: { opacity: 0, y: 35 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className="font-serif text-[clamp(3.6rem,7vw,7.8rem)] font-medium leading-[0.84] tracking-[-0.055em] text-[#FAF9F5]"
      >
       {HERO_CONTENT.title.lineOne}
<br />
{HERO_CONTENT.title.lineTwo}
<br />

<span className="relative inline-block text-[#1597C7]">
  {HERO_CONTENT.title.highlight}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 18"
            className="absolute -bottom-3 left-0 w-[82%]"
          >
            <path
              d="M3 12C65 3 170 4 294 10"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 },
          },
        }}
        className="mt-9 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
      >
       {HERO_CONTENT.description}
      </motion.p>

      {/* Actions */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 },
          },
        }}
        className="mt-9 flex flex-wrap items-center gap-4"
      >
       <Link
  href={HERO_CONTENT.primaryCta.href}
          className="group inline-flex items-center gap-3 rounded-full bg-[#FAF9F5] px-6 py-3.5 text-sm font-bold text-[#071A33] transition-all duration-300 hover:bg-white hover:shadow-[0_15px_45px_rgba(250,249,245,0.18)]"
        >
         {HERO_CONTENT.primaryCta.label}

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
  href={HERO_CONTENT.secondaryCta.href}
          className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1597C7]">
            <CalendarCheck className="ml-0.5 h-3.5 w-3.5 fill-white" />
          </span>

          {HERO_CONTENT.secondaryCta.label}
        </Link>
      </motion.div>

      {/* Trust stats */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 },
          },
        }}
        className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-5 sm:gap-x-10"
      >
    <div className="flex flex-wrap items-center gap-x-7 gap-y-5 sm:gap-x-10">
  {HERO_STATS.map((stat, index) => (
    <div
      key={stat.label}
      className="flex items-center gap-x-7 sm:gap-x-10"
    >
      <Stat
        value={stat.value}
        label={stat.label}
      />

      {index < HERO_STATS.length - 1 && <Divider />}
    </div>
  ))}
</div>
      </motion.div>

      {/* Small story mark */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.8 },
          },
        }}
        className="mt-9 hidden items-center gap-2 text-white/45 sm:flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />

        <span className="text-[10px] uppercase tracking-[0.22em]">
          {HERO_CONTENT.storyLabel}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="font-serif text-xl text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/50">
        {label}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-10 w-px bg-white/20 sm:block"
    />
  );
}