"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { STORY } from "./storyData";

export default function StoryContent() {
  return (
    <div className="max-w-2xl">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[#087E8B]" />

        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#087E8B]">
          {STORY.eyebrow}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-[#071A33] sm:text-5xl lg:text-[56px]"
      >
        {STORY.title.line1}
        <br />

        <span className="text-[#0D2747]/80">
          {STORY.title.line2}
        </span>

        <br />

        <span className="relative inline-block text-[#087E8B]">
          {STORY.title.highlight}

          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-0 h-px w-[82%] bg-[#F59E0B]/70"
          />
        </span>
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mt-7 max-w-xl text-base leading-8 text-[#0D2747]/70 sm:text-lg"
      >
        {STORY.description}
      </motion.p>

      {/* Points */}
      <div className="mt-10 space-y-6">
        {STORY.points.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.45,
              delay: 0.16 + index * 0.07,
            }}
            className="group flex gap-4"
          >
            {/* Icon */}
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 text-[#087E8B] transition-colors duration-200 group-hover:border-[#087E8B]/40 group-hover:bg-[#087E8B] group-hover:text-white">
              <Check
                className="h-4 w-4"
                strokeWidth={2}
              />
            </span>

            {/* Content */}
            <div>
              <h3 className="text-sm font-semibold tracking-[0.01em] text-[#071A33] sm:text-base">
                {point.title}
              </h3>

              <p className="mt-1.5 max-w-md text-sm leading-6 text-[#0D2747]/60">
                {point.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}