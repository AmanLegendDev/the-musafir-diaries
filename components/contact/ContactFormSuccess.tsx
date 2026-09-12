"use client";

import Link from "next/link";
import { Check, ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onReset: () => void;
};

export default function ContactFormSuccess({ onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden border border-[#071A33]/10 bg-[#FAF9F5] px-6 py-14 text-center sm:px-10 sm:py-20"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#087E8B]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#F59E0B]/[0.06] blur-3xl" />

      <div className="relative">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            stiffness: 180,
          }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/[0.07] text-[#087E8B]"
        >
          <Check className="h-7 w-7" strokeWidth={1.7} />
        </motion.div>

        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
          Enquiry received
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.035em] text-[#071A33] sm:text-5xl">
          And just like that,
          <span className="block text-[#087E8B]">
            the journey has begun.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
          Thank you for reaching out. We&apos;ve received your enquiry and
          will get back to you with the next steps.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-3 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0D2747]"
          >
            Explore destinations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-6 py-3.5 text-sm font-medium text-[#071A33]/65 transition-all duration-300 hover:border-[#087E8B]/30 hover:text-[#087E8B]"
          >
            Send another enquiry
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/25">
          <Compass className="h-3.5 w-3.5" />
          The Musafir Diaries
        </div>
      </div>
    </motion.div>
  );
}