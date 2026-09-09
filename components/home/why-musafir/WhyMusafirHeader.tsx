"use client";

import { motion } from "framer-motion";

export default function WhyMusafirHeader() {
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

        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5CC5CE]">
          Why The Musafir Diaries
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
        Travel should
        <br />
        feel{" "}
        <span className="text-[#5CC5CE]">
          personal.
        </span>
      </h2>

      {/* Supporting copy */}
      <p className="mt-7 max-w-lg text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
        Not just a checklist of places, but a journey shaped by the
        landscapes, experiences and moments that make travel worth
        remembering.
      </p>

      {/* Small brand statement */}
      <div className="mt-10 border-l border-[#F59E0B]/60 pl-5">
        <p className="max-w-md font-serif text-lg leading-7 text-white/85 sm:text-xl">
          “Go somewhere beautiful. Come back with a story.”
        </p>
      </div>
    </motion.div>
  );
}