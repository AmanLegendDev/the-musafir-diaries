"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccessHero() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#087E8B]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#1597C7]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/30 bg-[#087E8B]/10 text-[#087E8B] sm:h-20 sm:w-20"
        >
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.8} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#1597C7]">
            Request received
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your journey request is on its way.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Thank you for choosing The Musafir Diaries. We have received your
            booking request and the details are now ready for review.
          </p>
        </motion.div>
      </div>
    </section>
  );
}