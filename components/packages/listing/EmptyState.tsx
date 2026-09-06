"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Compass,
  RotateCcw,
  SearchX,
} from "lucide-react";

export default function EmptyState() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">

        <motion.div
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
          className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl"
        >
          {/* Icon */}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

            <SearchX className="h-12 w-12 text-emerald-600" />

          </div>

          {/* Heading */}

          <h2 className="mt-8 text-4xl font-bold text-slate-900">
            No Packages Found
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">
            We couldn't find any travel packages matching your
            selected filters. Try adjusting your search or explore
            all available adventures.
          </p>

          {/* Suggestions */}

          <div className="mt-10 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-slate-50 p-5">

              <Compass className="mx-auto h-8 w-8 text-emerald-600" />

              <h3 className="mt-3 font-semibold text-slate-900">
                Explore More
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Browse destinations across the Himalayas.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <RotateCcw className="mx-auto h-8 w-8 text-emerald-600" />

              <h3 className="mt-3 font-semibold text-slate-900">
                Reset Filters
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Clear your filters to view every available package.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <SearchX className="mx-auto h-8 w-8 text-emerald-600" />

              <h3 className="mt-3 font-semibold text-slate-900">
                Try Another Search
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Search using another destination or category.
              </p>

            </div>

          </div>

          {/* Actions */}

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <RotateCcw className="h-5 w-5" />

              Reset Filters
            </button>

            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Compass className="h-5 w-5" />

              Explore Destinations
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}