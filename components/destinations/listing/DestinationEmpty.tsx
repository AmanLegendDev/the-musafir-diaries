"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";

export default function DestinationEmpty() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="py-20"
    >
      <div
        className="
          mx-auto
          max-w-3xl
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-10
          text-center
          shadow-sm
        "
      >
        {/* Icon */}

        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-emerald-100
          "
        >
          <Compass className="h-10 w-10 text-emerald-600" />
        </div>

        {/* Heading */}

        <h2 className="mt-8 text-3xl font-bold text-slate-900">
          No Destinations Found
        </h2>

        {/* Description */}

        <p className="mx-auto mt-5 max-w-xl text-slate-500 leading-7">
          We couldn't find any destinations matching your current
          search or filter selection. Try changing your filters
          or explore all available destinations.
        </p>

        {/* CTA */}

        <div className="mt-10">

          <Link
            href="/destinations"
            className="
              group
              inline-flex
              items-center
              rounded-2xl
              bg-gradient-to-r
              from-emerald-600
              to-teal-600
              px-7
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            View All Destinations

            <ArrowRight
              className="
                ml-2
                h-5
                w-5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

      </div>
    </motion.section>
  );
}