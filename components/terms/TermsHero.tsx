"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";

import { TERMS_CONFIG } from "@/lib/config/terms";

export default function TermsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] text-white">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
      >
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#087E8B]/15 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#1597C7]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.07),transparent_30%)]" />
      </div>

      {/* Editorial grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[12%] hidden w-px bg-white/[0.07] lg:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[30%] hidden w-px bg-white/[0.045] lg:block"
      />

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:min-h-[680px] lg:px-12 lg:pb-24">
        <div className="grid w-full gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                Terms of Travel
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-[3.3rem] leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
              The details
              <span className="block text-[#8ED9DF]">
                behind the journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8 lg:text-lg">
              These Terms & Conditions explain the general
              framework that applies when you enquire about,
              arrange or book travel services through The Musafir
              Diaries.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#terms-content"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#071A33] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Read the terms

                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

              <span className="text-xs text-white/35">
                Last updated {TERMS_CONFIG.lastUpdated}
              </span>
            </div>
          </motion.div>

          {/* Editorial side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:justify-self-end"
          >
            <div className="max-w-sm border-l border-white/15 pl-6 sm:pl-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5">
                <FileText className="h-5 w-5 text-[#8ED9DF]" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Before you book
              </p>

              <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                Know what to expect.
                <span className="block text-white/45">
                  Then enjoy the journey.
                </span>
              </p>

              <p className="mt-5 text-sm leading-6 text-white/45">
                Travel plans can involve accommodation, transport,
                local services and changing mountain conditions.
                These terms help set clear expectations around them.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            {TERMS_CONFIG.businessName}
          </p>

          <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
            Terms & Conditions · {TERMS_CONFIG.effectiveDate}
          </p>
        </div>
      </div>
    </section>
  );
}