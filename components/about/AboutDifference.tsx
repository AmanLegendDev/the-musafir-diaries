"use client";

import {
  Compass,
  Heart,
  Map,
  MessageCircle,
  Mountain,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const DIFFERENCES = [
  {
    number: "01",
    icon: Mountain,
    title: "Rooted in Shimla",
    text: "Our story starts in Shimla, with Himachal at the centre of what we do.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Himachal-first thinking",
    text: "We are building our travel experience around the mountains, routes and destinations closest to our work.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Start with a conversation",
    text: "We want to understand the traveller before trying to fit them into a standard journey.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Personal journeys",
    text: "Different people travel differently. The planning should leave room for that.",
  },
  {
    number: "05",
    icon: Map,
    title: "Experience over excess",
    text: "We care about how a journey feels, not just how many things can be added to an itinerary.",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Built to keep improving",
    text: "We are still growing, which means every trip is another opportunity to learn and improve.",
  },
];

export default function AboutDifference() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Why Musafir Diaries
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <h2 className="max-w-5xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.3rem]">
              Small enough to stay
              <span className="text-[#087E8B]"> personal.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              We are not trying to make the experience complicated. We are
              trying to make it thoughtful — and build something that gets
              better with every journey.
            </p>
          </motion.div>
        </div>

        {/* Difference grid */}
        <div className="mt-14 grid gap-px border border-[#071A33]/10 bg-[#071A33]/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {DIFFERENCES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                }}
                className="group relative min-h-[250px] bg-white p-7 transition-colors duration-300 hover:bg-[#071A33] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#071A33]/20 transition-colors duration-300 group-hover:text-white/25">
                    {item.number}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/[0.05] text-[#087E8B] transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.06] group-hover:text-[#5CC6D0]">
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                </div>

                <h3 className="mt-9 font-serif text-2xl tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#071A33]/45 transition-colors duration-300 group-hover:text-white/45">
                  {item.text}
                </p>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#087E8B] transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-12 border-t border-[#071A33]/10 pt-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-3xl font-serif text-2xl leading-tight tracking-[-0.025em] text-[#071A33]/75 sm:text-3xl">
              We&apos;re building a travel brand where the journey feels as
              considered as the destination.
            </p>

            <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/25">
              Built from Shimla
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}