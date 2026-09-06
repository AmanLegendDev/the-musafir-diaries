"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import PackageGrid from "./PackageGrid";

import type {
  FeaturedPackagesProps,
} from "./types";

export default function FeaturedPackages({
  packages,
}: FeaturedPackagesProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
      "
    >
      {/* Background Decoration */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-100/40 blur-3xl" />

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
          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
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
              Featured Tour Packages
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
              Curated Packages For
              <span className="block text-[#0F4C81]">
                Your Next Adventure
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
              Explore carefully crafted travel packages with
              premium stays, unforgettable experiences, and
              seamless planning designed for every traveler.
            </p>
          </div>

          <Link
            href="/packages"
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
            View All Packages

            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="mt-16">

                      {packages.length > 0 ? (
            <PackageGrid packages={packages} />
          ) : (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-[32px]
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-8
                py-24
                text-center
              "
            >
              <h3 className="text-2xl font-bold text-slate-900">
                Packages Coming Soon
              </h3>

              <p className="mt-4 max-w-xl text-slate-600">
                We're currently preparing premium travel packages
                for every kind of traveler. Check back soon for
                exciting journeys and unforgettable experiences.
              </p>

              <Link
                href="/contact"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#0F4C81]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#0B3B63]
                "
              >
                Contact Us

                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}