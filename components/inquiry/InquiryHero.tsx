"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  Phone,
} from "lucide-react";

import type { InquiryHeroProps } from "./types";

export default function InquiryHero({
  title,
  subtitle,
  backgroundImage,
}: InquiryHeroProps) {
  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#081C2D]/90 via-[#081C2D]/70 to-[#081C2D]/40" />

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}

          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[#3BAEA0]">
            Home / Inquiry
          </p>

          {/* Heading */}

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {subtitle}
          </p>

          {/* Trust Points */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "100% Personalized Travel Plans",
              "Response Within 30 Minutes",
              "Trusted Himalayan Experts",
              "Transparent Pricing",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md"
              >
                <CheckCircle2
                  size={20}
                  className="text-[#3BAEA0]"
                />

                <span className="text-sm text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#inquiry-form"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#3BAEA0]
                px-7
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Start Your Inquiry

              <ArrowDown size={18} />
            </Link>

            <Link
              href="tel:+919999999999"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/10
                px-7
                py-4
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#3BAEA0]
              "
            >
              <Phone size={18} />

              Call Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}