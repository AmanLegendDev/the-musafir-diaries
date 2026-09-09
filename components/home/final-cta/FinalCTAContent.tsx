"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";

export default function FinalCTAContent() {
  return (
    <div className="relative z-10 flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-20">
      <div className="max-w-xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#F59E0B]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
            Your Next Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-[#FAF9F5] sm:text-5xl lg:text-6xl xl:text-[68px]"
        >
          Your next story
          <span className="block text-[#1597C7]">
            could begin here.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-7 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
        >
          The mountains are waiting. Let&apos;s plan something
          worth remembering — thoughtfully, beautifully and at
          your own pace.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href="/inquiry"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-[#ffffff] hover:shadow-[0_12px_40px_rgba(245,158,11,0.18)]"
          >
            Plan Your Journey

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-[#FAF9F5] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/destinations"
            className="group inline-flex w-fit items-center gap-2 px-2 py-3 text-sm font-medium text-white/75 transition-colors duration-300 hover:text-white"
          >
            <Compass className="h-4 w-4 text-[#1597C7]" />

            Explore the Himalayas

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Small trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />

          <span className="text-xs tracking-wide text-white/40">
            Explore · Experience · Belong
          </span>
        </motion.div>
      </div>
    </div>
  );
}