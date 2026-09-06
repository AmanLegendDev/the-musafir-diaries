"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import type { CTAContentProps } from "./types";

export default function CTAContent({
  badge,
  title,
  highlightedText,
  description,
}: CTAContentProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative z-10 max-w-3xl"
    >
      {/* Premium Badge */}

      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-white/20
          bg-white/10
          px-6
          py-3
          backdrop-blur-xl
          shadow-[0_10px_35px_rgba(255,255,255,0.08)]
        "
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3BAEA0]/20">
          <Sparkles
            size={16}
            className="text-[#3BAEA0]"
          />
        </div>

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.28em]
            text-white/90
          "
        >
          {badge}
        </span>
      </motion.div>

      {/* Heading */}

      <h2
        className="
          mt-8
          max-w-2xl
          text-4xl
          font-black
          leading-[1.05]
          tracking-tight
          text-white

          md:text-5xl

          xl:text-6xl
        "
      >
        {title}

        <span
          className="
            mt-3
            block
            bg-gradient-to-r
            from-[#3BAEA0]
            via-cyan-300
            to-white
            bg-clip-text
            text-transparent
          "
        >
          {highlightedText}
        </span>
      </h2>

      {/* Description */}

      <p
        className="
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-slate-200

          lg:text-xl
        "
      >
        {description}
      </p>

      {/* Trust Highlights */}

      <div className="mt-10 flex flex-wrap gap-5">

        <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <span className="text-sm font-medium text-white">
            ✔ Instant Confirmation
          </span>
        </div>

        <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <span className="text-sm font-medium text-white">
            ✔ Secure Booking
          </span>
        </div>

        <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <span className="text-sm font-medium text-white">
            ✔ Local Travel Experts
          </span>
        </div>

      </div>
    </motion.div>
  );
}