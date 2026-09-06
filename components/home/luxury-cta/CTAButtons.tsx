"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

import type {
  CTAButtonsProps,
} from "./types";

export default function CTAButtons({
  primaryHref,
  secondaryHref,
}: CTAButtonsProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
      }}
      className="
        mt-10
        flex
        flex-col
        gap-4

        sm:flex-row
      "
    >
      {/* Primary Button */}

      <Link
        href={primaryHref}
        className="
          group
          inline-flex
          items-center
          justify-center
          gap-3
          rounded-full
          bg-white
          px-8
          py-4
          font-semibold
          text-[#0F4C81]
          shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-2xl
        "
      >
        Explore Packages

        <ArrowRight
          size={20}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>

      {/* Secondary Button */}

      <Link
        href={secondaryHref}
        className="
          group
          inline-flex
          items-center
          justify-center
          gap-3
          rounded-full
          border
          border-white/20
          bg-white/10
          px-8
          py-4
          font-semibold
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-white/40
          hover:bg-white/20
        "
      >
        <PhoneCall
          size={19}
          className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />

        Contact Us
      </Link>
    </motion.div>
  );
}