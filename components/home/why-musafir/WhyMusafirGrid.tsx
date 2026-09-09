"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Heart,
  Map,
  Sparkles,
} from "lucide-react";

const REASONS = [
  {
    number: "01",
    icon: Compass,
    title: "Thoughtfully Curated",
    description:
      "Journeys built around the places, pace and experiences that make the Himalayas worth discovering.",
  },
  {
    number: "02",
    icon: Map,
    title: "Beyond the Obvious",
    description:
      "Go beyond a list of attractions and discover the quieter corners, viewpoints and experiences along the way.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Made for Your Journey",
    description:
      "Travel should have room for your interests, your pace and the moments you want to remember.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Details That Matter",
    description:
      "From where you stay to how your days unfold, every detail contributes to a more considered journey.",
  },
] as const;

export default function WhyMusafirGrid() {
  return (
    <div className="grid border-t border-white/10 sm:grid-cols-2 sm:border-l sm:border-t-0">
      {REASONS.map((reason, index) => {
        const Icon = reason.icon;

        return (
          <motion.article
            key={reason.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "group relative p-6 sm:p-7 lg:p-8",
              index % 2 === 0
                ? "sm:border-r sm:border-white/10"
                : "",
              index < 2
                ? "sm:border-b sm:border-white/10"
                : "",
              "transition-colors duration-500 hover:bg-white/[0.025]",
            ].join(" ")}
          >
            {/* Number */}
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl font-light text-white/20 transition-colors duration-300 group-hover:text-[#F59E0B]/60">
                {reason.number}
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#5CC5CE] transition-all duration-300 group-hover:border-[#5CC5CE]/40 group-hover:bg-[#087E8B]/10">
                <Icon size={18} strokeWidth={1.5} />
              </span>
            </div>

            {/* Content */}
            <div className="mt-12">
              <h3 className="font-serif text-2xl font-medium tracking-[-0.02em] text-white sm:text-[27px]">
                {reason.title}
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
                {reason.description}
              </p>
            </div>

            {/* Bottom accent */}
            <div className="mt-7 h-px w-8 bg-[#F59E0B]/50 transition-all duration-500 group-hover:w-16" />
          </motion.article>
        );
      })}
    </div>
  );
}