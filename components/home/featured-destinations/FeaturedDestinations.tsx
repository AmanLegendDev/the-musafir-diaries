"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import DestinationGrid from "./DestinationGrid";

import type {
  FeaturedDestinationsProps,
} from "./types";

export default function FeaturedDestinations({
  destinations,
}: FeaturedDestinationsProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        py-24
        lg:py-32
      "
    >
      {/* Background Decoration */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-sky-200
                bg-sky-50
                px-4
                py-2
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#0F4C81]
              "
            >
              Featured Destinations
            </span>

            <h2
              className="
                mt-6
                text-4xl
                font-bold
                tracking-tight
                text-slate-900

                md:text-5xl
              "
            >
              Discover Places That
              <span className="block text-[#0F4C81]">
                Inspire Every Journey
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-600
              "
            >
              Handpicked destinations chosen for unforgettable
              experiences, breathtaking landscapes, and seamless
              travel planning.
            </p>
          </div>

          <Link
            href="/destinations"
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              bg-[#0F4C81]
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:translate-x-1
              hover:bg-[#0B3B63]
            "
          >
            View All Destinations

            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="mt-16">

                      {destinations.length > 0 ? (
            <DestinationGrid
              destinations={destinations}
            />
          ) : (
            <div
              className="
                flex
                min-h-[320px]
                items-center
                justify-center
                rounded-[32px]
                border
                border-dashed
                border-slate-300
                bg-white
                p-10
                text-center
              "
            >
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold text-slate-900">
                  No Featured Destinations
                </h3>

                <p className="mt-3 text-slate-500">
                  Featured destinations will appear here once they
                  are added from the admin dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}