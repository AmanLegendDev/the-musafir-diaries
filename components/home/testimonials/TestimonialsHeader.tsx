"use client";

import { motion } from "framer-motion";

export default function TestimonialsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-3xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-[#F59E0B]" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
          From Our Travellers
        </span>
      </div>

      <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
        The best stories
        <br />
        <span className="text-[#087E8B]">come from the journey.</span>
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8">
        Every journey leaves something behind. Here are a few words from
        travellers who explored the mountains with us.
      </p>
    </motion.div>
  );
}