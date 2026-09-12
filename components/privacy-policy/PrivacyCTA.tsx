"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function PrivacyCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#087E8B]/12 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#1597C7]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                One last thing
              </span>
            </div>

            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Good journeys start with
              <span className="block text-[#8ED9DF]">
                good conversations.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              If you have a question about this policy, your
              information or your next journey, we're happy to hear
              from you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#071A33] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact us

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/65 transition-colors duration-300 hover:border-white/25 hover:text-white"
              >
                Back to home
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:justify-self-end"
          >
            <div className="max-w-sm border-l border-white/12 pl-6 sm:pl-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Compass className="h-5 w-5 text-[#8ED9DF]" />
              </div>

              <p className="mt-5 font-serif text-2xl leading-tight tracking-[-0.02em] text-white">
                From Shimla,
                <span className="block text-white/40">
                  towards somewhere new.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}