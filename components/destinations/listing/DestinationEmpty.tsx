"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  RotateCcw,
} from "lucide-react";

interface DestinationEmptyProps {
  onClear?: () => void;
}

export default function DestinationEmpty({
  onClear,
}: DestinationEmptyProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5">
          <Compass
            className="h-7 w-7 text-[#087E8B]"
            strokeWidth={1.5}
          />
        </div>

        {/* Eyebrow */}
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
          The trail goes quiet here
        </p>

        {/* Heading */}
        <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
          We couldn&apos;t find
          <span className="block text-[#087E8B]">
            that destination.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#071A33]/50 sm:text-base">
          Nothing matched your current search or filters. Try
          another place, clear your filters, or explore the full
          collection again.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#087E8B]"
            >
              <RotateCcw
                className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={1.8}
              />

              Clear all filters
            </button>
          ) : (
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#087E8B]"
            >
              <RotateCcw
                className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={1.8}
              />

              View all destinations
            </Link>
          )}

          <Link
            href="/inquiry"
            className="group inline-flex items-center gap-3 rounded-full border border-[#071A33]/12 bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:border-[#087E8B]/30 hover:text-[#087E8B]"
          >
            Plan a custom journey

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
            </span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}