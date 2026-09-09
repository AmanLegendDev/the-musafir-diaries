"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";

export default function FAQHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="lg:sticky lg:top-28"
    >
      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-10 bg-[#F59E0B]" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
          Questions, Answered
        </span>
      </div>

      {/* Icon */}
      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/5 text-[#087E8B]">
        <MessageCircleQuestion
          size={21}
          strokeWidth={1.5}
        />
      </div>

      {/* Heading */}
      <h2
        id="faq-heading"
        className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl"
      >
        Before you
        <br />
        <span className="text-[#087E8B]">
          set off.
        </span>
      </h2>

      {/* Description */}
      <p className="mt-6 max-w-md text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8">
        A few things worth knowing before your journey begins. And if you
        still have a question, we are only a conversation away.
      </p>

      {/* Small detail */}
      <div className="mt-10 flex items-center gap-4">
        <span className="font-serif text-4xl font-light text-[#071A33]/10">
          01
        </span>

        <span className="h-px w-14 bg-[#071A33]/10" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/40">
          Travel, simply considered
        </span>
      </div>
    </motion.div>
  );
}