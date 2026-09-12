"use client";

import { ArrowRight, Compass, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

const JOURNEY_STAGES = [
  {
    number: "01",
    label: "THE BEGINNING",
    title: "A connection to the mountains.",
    description:
      "The Musafir Diaries began from Shimla, with Himachal at the heart of the idea — a place where travel is not simply a destination, but part of everyday life.",
  },
  {
    number: "02",
    label: "THE FIRST STEPS",
    title: "Turning an idea into real journeys.",
    description:
      "The business moved from an idea into action, helping travellers plan and experience trips through Himachal Pradesh.",
  },
  {
    number: "03",
    label: "THE EXPERIENCE",
    title: "Learning from every trip.",
    description:
      "Real journeys brought real lessons — about planning, expectations, communication, and the small details that can make travel feel better.",
  },
  {
    number: "04",
    label: "TODAY",
    title: "A business still being built.",
    description:
      "Today, The Musafir Diaries is growing from Shimla with a focus on better travel planning, stronger experiences, and a brand people can gradually come to trust.",
  },
];

export default function AboutJourney() {
  return (
    <section className="bg-[#071A33] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                The journey so far
              </span>
            </div>

            <div className="mt-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#5CC6D0]">
              <MapPinned className="h-5 w-5" strokeWidth={1.3} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <h2 className="max-w-5xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[4.3rem]">
              Not an overnight story.
              <span className="block text-[#5CC6D0]">
                A journey of its own.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              We are building The Musafir Diaries one step at a time. The
              progress matters, but so does everything we learn along the way.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 lg:mt-20">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-white/10 lg:block" />

          <div className="space-y-0">
            {JOURNEY_STAGES.map((stage, index) => (
              <motion.article
                key={stage.number}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                }}
                className="group relative grid gap-7 border-t border-white/10 py-9 lg:grid-cols-[48px_0.65fr_1.35fr] lg:gap-10 lg:py-12"
              >
                {/* Number */}
                <div>
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#071A33] text-[9px] font-semibold tracking-[0.12em] text-white/35 transition-all duration-300 group-hover:border-[#087E8B]/50 group-hover:text-[#5CC6D0]">
                    {stage.number}
                  </span>
                </div>

                {/* Label */}
                <div className="lg:pt-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    {stage.label}
                  </p>
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <h3 className="font-serif text-2xl leading-tight tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-[#5CC6D0] sm:text-3xl">
                    {stage.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                    {stage.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8"
        >
          <Compass
            className="h-4 w-4 text-[#F59E0B]"
            strokeWidth={1.4}
          />

          <span className="text-xs text-white/35">
            The road ahead is still open.
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-white/20" />
        </motion.div>
      </div>
    </section>
  );
}