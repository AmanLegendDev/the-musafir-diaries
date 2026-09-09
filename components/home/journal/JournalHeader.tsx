"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function JournalHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
    >
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-[#F59E0B]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
            Stories From The Road
          </span>
        </div>

        {/* Heading */}
        <h2
          id="journal-heading"
          className="font-serif text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl"
        >
          The Musafir
          <br />
          <span className="text-[#087E8B]">Journal.</span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8">
          Notes, guides and stories from the Himalayas — places to discover,
          journeys to plan and little moments worth knowing before you go.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/blog"
        className="group inline-flex w-fit items-center gap-3 border-b border-[#071A33]/20 pb-2 text-sm font-semibold text-[#071A33] transition-colors duration-300 hover:border-[#F59E0B] hover:text-[#087E8B]"
      >
        <span>Read all stories</span>

        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#071A33]/15 transition-all duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B] group-hover:text-white">
          <ArrowUpRight
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </Link>
    </motion.div>
  );
} 