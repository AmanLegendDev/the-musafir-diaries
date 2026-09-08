"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EXPERIENCE_HEADER = {
  eyebrow: "Beyond the Destination",

  title: {
    lineOne: "Experiences that",
    lineTwo: "become part of the story.",
  },

  description:
    "Travel deeper through mountain adventures, quiet moments, local encounters and the little experiences that make a journey truly yours.",

  exploreLabel: "Discover experiences",

  exploreHref: "/under-development",
} as const;

export default function TravelExperiencesHeader() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#F59E0B] sm:w-12"
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7] sm:text-xs">
            {EXPERIENCE_HEADER.eyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="travel-experiences-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.7,
            delay: 0.08,
          }}
          className="mt-5 max-w-3xl font-serif text-[42px] leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          {EXPERIENCE_HEADER.title.lineOne}
          <br />
          <span className="text-[#1597C7]">
            {EXPERIENCE_HEADER.title.lineTwo}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.7,
            delay: 0.16,
          }}
          className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8"
        >
          {EXPERIENCE_HEADER.description}
        </motion.p>
      </div>

      {/* Explore link */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
        }}
        className="shrink-0"
      >
        <Link
          href={EXPERIENCE_HEADER.exploreHref}
          className="group inline-flex items-center gap-4 text-sm font-semibold text-white"
        >
          <span className="relative pb-1">
            {EXPERIENCE_HEADER.exploreLabel}

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#1597C7] transition-transform duration-300 group-hover:scale-x-0"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#F59E0B] transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B]">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}