"use client";

import {
  Compass,
  Heart,
  Mountain,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const VALUES = [
  {
    number: "01",
    icon: Compass,
    title: "Travel with intention",
    description:
      "Not every journey needs to be rushed. We believe there should be room to actually experience where you are.",
    accent: "teal",
  },
  {
    number: "02",
    icon: Heart,
    title: "Keep it personal",
    description:
      "A journey should reflect the people taking it — their pace, interests, expectations and sense of adventure.",
    accent: "orange",
  },
  {
    number: "03",
    icon: Mountain,
    title: "Let the mountains lead",
    description:
      "Himachal is more than a destination on a map. The landscape, culture and roads are part of the experience.",
    accent: "teal",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Details matter",
    description:
      "The little things can change how a trip feels. Good planning is about paying attention before the journey begins.",
    accent: "orange",
  },
];

export default function AboutValues() {
  return (
    <section
      id="what-we-believe"
      className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
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
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                What we believe
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.25rem]">
              The principles behind
              <span className="text-[#087E8B]"> every journey.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              We are building the business around a few simple ideas — the
              kind that matter when a journey becomes more than just a
              booking.
            </p>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16">
          {VALUES.map((value, index) => (
            <ValueCard
              key={value.number}
              {...value}
              index={index}
            />
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-12 border-t border-[#071A33]/10 pt-8"
        >
          <p className="max-w-3xl font-serif text-2xl leading-tight tracking-[-0.025em] text-[#071A33]/75 sm:text-3xl">
            We want every traveller to return with more than photographs —
            <span className="text-[#087E8B]">
              {" "}
              with a story worth telling.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({
  number,
  icon: Icon,
  title,
  description,
  accent,
  index,
}: {
  number: string;
  icon: typeof Compass;
  title: string;
  description: string;
  accent: string;
  index: number;
}) {
  const isOrange = accent === "orange";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
      }}
      className="group relative overflow-hidden border border-[#071A33]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#071A33]/15 hover:shadow-[0_18px_55px_rgba(7,26,51,0.07)] sm:p-9"
    >
      {/* Top accent */}
      <span
        className={`absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
          isOrange ? "bg-[#F59E0B]" : "bg-[#087E8B]"
        }`}
      />

      <div className="flex items-start justify-between">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-[#071A33]/20">
          {number}
        </span>

        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full border ${
            isOrange
              ? "border-[#F59E0B]/20 bg-[#F59E0B]/[0.06] text-[#F59E0B]"
              : "border-[#087E8B]/15 bg-[#087E8B]/[0.05] text-[#087E8B]"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.35} />
        </span>
      </div>

      <h3 className="mt-10 max-w-md font-serif text-2xl tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-3xl">
        {title}
      </h3>

      <p className="mt-4 max-w-lg text-sm leading-7 text-[#071A33]/50">
        {description}
      </p>

      <div className="mt-9 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/25">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isOrange ? "bg-[#F59E0B]" : "bg-[#087E8B]"
          }`}
        />

        A Musafir principle
      </div>
    </motion.article>
  );
}