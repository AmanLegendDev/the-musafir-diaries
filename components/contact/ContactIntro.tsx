"use client";

import { Compass, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactIntro() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Before the journey
              </span>
            </div>

            <p className="mt-6 max-w-[220px] font-serif text-2xl leading-tight tracking-[-0.025em] text-[#071A33]/80">
              You bring the idea.
              <span className="block text-[#087E8B]">
                We help shape it.
              </span>
            </p>
          </motion.div>

          {/* Main copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
              A little context goes a long way
            </p>

            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.25rem]">
              Good travel planning starts with{" "}
              <span className="text-[#087E8B]">being heard.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              Share as much or as little as you know. Your preferred
              destination, the kind of experience you want, your dates, or
              simply the feeling you&apos;re looking for. We&apos;ll take it
              from there.
            </p>

            {/* Two principles */}
            <div className="mt-12 grid gap-px overflow-hidden border border-[#071A33]/10 bg-[#071A33]/10 sm:grid-cols-2">
              <div className="bg-white p-7 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/[0.06] text-[#087E8B]">
                  <Compass className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                  Journey planning
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#071A33]/50">
                  Tell us where you&apos;re thinking of going and what matters
                  most to you.
                </p>
              </div>

              <div className="bg-white p-7 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/[0.07] text-[#F59E0B]">
                  <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                  A real conversation
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#071A33]/50">
                  Questions are welcome. You don&apos;t need to have the whole
                  trip figured out yet.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}