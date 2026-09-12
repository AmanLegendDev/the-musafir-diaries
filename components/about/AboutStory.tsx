"use client";

import { ArrowDown, ArrowRight, Mountain, Route } from "lucide-react";
import { motion } from "framer-motion";

const STORY_STEPS = [
  {
    number: "01",
    label: "WHERE IT BEGAN",
    title: "Shimla was the starting point.",
    text: "The story begins in the mountains of Himachal Pradesh — a place that naturally shaped the way we think about travel.",
  },
  {
    number: "02",
    label: "THE FIRST JOURNEYS",
    title: "People started trusting us with their trips.",
    text: "What began as a travel idea grew through conversations, planning, and the opportunity to help people experience the mountains for themselves.",
  },
  {
    number: "03",
    label: "WHAT WE LEARNED",
    title: "Every trip taught us something.",
    text: "Real journeys bring real lessons. Each experience helps us understand what makes planning smoother, travel more personal, and memories more meaningful.",
  },
  {
    number: "04",
    label: "WHERE WE ARE",
    title: "A growing travel business.",
    text: "Today, The Musafir Diaries is continuing to grow from Shimla — building its experience, its systems, and its vision one step at a time.",
  },
];

export default function AboutStory() {
  return (
    <section
      id="our-story"
      className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
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
              <span className="h-px w-9 bg-[#087E8B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Our story
              </span>
            </div>

            <div className="mt-7 flex h-11 w-11 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/[0.05] text-[#087E8B]">
              <Route className="h-5 w-5" strokeWidth={1.4} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.25rem]">
              From a place we know
              <span className="text-[#087E8B]"> to journeys we share.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              There is no overnight success story here. Just a growing
              business, real travel experiences, and a lot of learning along
              the way.
            </p>
          </motion.div>
        </div>

        {/* Story timeline */}
        <div className="relative mt-16 lg:mt-20">
          {/* Desktop line */}
          <div className="absolute bottom-0 left-[31px] top-0 hidden w-px bg-[#071A33]/10 lg:block" />

          <div className="space-y-0">
            {STORY_STEPS.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                }}
                className="group relative grid gap-7 border-t border-[#071A33]/10 py-9 lg:grid-cols-[64px_0.7fr_1.3fr] lg:gap-10 lg:py-12"
              >
                {/* Number */}
                <div className="flex items-start">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#071A33]/10 bg-white text-[10px] font-semibold tracking-[0.12em] text-[#071A33]/35 transition-all duration-300 group-hover:border-[#087E8B]/30 group-hover:text-[#087E8B]">
                    {step.number}
                  </span>
                </div>

                {/* Label */}
                <div className="lg:pt-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/30">
                    {step.label}
                  </p>
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <h3 className="font-serif text-2xl leading-tight tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                    {step.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-t border-[#071A33]/10 pt-10"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Mountain
                className="h-5 w-5 text-[#087E8B]"
                strokeWidth={1.3}
              />

              <p className="font-serif text-xl tracking-[-0.02em] text-[#071A33]/75">
                And the story is still being written.
              </p>

              <ArrowDown className="hidden h-4 w-4 rotate-[-90deg] text-[#F59E0B] sm:block" />
            </div>
          </motion.div>
        </div>

        {/* Small CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12"
        >
          <a
            href="#what-we-believe"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-[#087E8B]"
          >
            What we believe

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}