"use client";

import { motion } from "framer-motion";
import { Compass, Heart, Map, MessageCircle } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell us",
    text: "Start with whatever you already know about the journey.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Understand",
    text: "We get a clearer picture of what you want from the trip.",
  },
  {
    number: "03",
    icon: Map,
    title: "Shape it",
    text: "Destinations, experiences and details begin to take form.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Set off",
    text: "When everything feels right, the journey can begin.",
  },
];

export default function ContactTrust() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                From here to there
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.15rem]">
              The first step is
              <span className="text-[#087E8B]"> simply reaching out.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              There&apos;s no complicated process. Just a conversation that
              gradually turns an idea into a journey.
            </p>
          </motion.div>
        </div>

        {/* Process */}
        <div className="mt-14 grid gap-px border border-[#071A33]/10 bg-[#071A33]/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                }}
                className="group relative min-h-[245px] bg-white p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#071A33]/20">
                    {step.number}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071A33]/10 text-[#087E8B] transition-all duration-300 group-hover:border-[#087E8B]/20 group-hover:bg-[#087E8B]/[0.06]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>

                <h3 className="mt-9 font-serif text-2xl tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B]">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-[#071A33]/45">
                  {step.text}
                </p>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#087E8B] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}