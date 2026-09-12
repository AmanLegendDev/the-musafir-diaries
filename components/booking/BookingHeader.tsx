"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Compass, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function BookingHeader() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      {/* Decorative atmosphere */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#087E8B]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-[#1597C7]/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        {/* Back */}

        <Link
          href="/packages"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to packages
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          {/* Main copy */}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7FD8DE]"
            >
              <Compass size={14} />

              Plan your journey
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-7xl">
              Your Himalayan escape,
              <span className="block text-[#7FD8DE]">
                thoughtfully planned.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Tell us how you want to travel, when you want to go, and who is
              coming with you. We&apos;ll review the details and help shape the
              journey around you.
            </p>
          </motion.div>

          {/* Side statement */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="border-l border-white/10 pl-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-[#7FD8DE]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    A considered way to book
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Your request is reviewed before your journey is confirmed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge */}

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}