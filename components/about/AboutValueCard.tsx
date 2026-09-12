"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type Accent = "teal" | "orange";

type Props = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: Accent;
  index?: number;
};

export default function AboutValueCard({
  number,
  icon: Icon,
  title,
  description,
  accent = "teal",
  index = 0,
}: Props) {
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

      <div className="flex items-start justify-between gap-6">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-[#071A33]/20">
          {number}
        </span>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
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