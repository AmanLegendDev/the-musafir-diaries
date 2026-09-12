"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type Accent = "teal" | "orange";

type Props = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  value: string;
  href: string;
  accent?: Accent;
};

const accentStyles = {
  teal: {
    icon: "border-[#087E8B]/15 bg-[#087E8B]/[0.06] text-[#087E8B]",
    line: "bg-[#087E8B]",
    hover: "group-hover:text-[#087E8B]",
  },
  orange: {
    icon: "border-[#F59E0B]/20 bg-[#F59E0B]/[0.07] text-[#F59E0B]",
    line: "bg-[#F59E0B]",
    hover: "group-hover:text-[#F59E0B]",
  },
};

export default function ContactMethodCard({
  icon: Icon,
  label,
  title,
  description,
  value,
  href,
  accent = "teal",
}: Props) {
  const styles = accentStyles[accent];

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group relative flex min-h-[290px] flex-col overflow-hidden border border-[#071A33]/10 bg-[#FAF9F5] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#071A33]/15 hover:shadow-[0_18px_50px_rgba(7,26,51,0.08)] sm:p-8"
    >
      {/* Hover accent */}
      <span
        className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${styles.line}`}
      />

      {/* Icon */}
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border ${styles.icon}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>

      {/* Label */}
      <div className="mt-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
          {label}
        </p>

        <h3
          className={`mt-2 font-serif text-2xl tracking-[-0.025em] text-[#071A33] transition-colors duration-300 ${styles.hover}`}
        >
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
          {description}
        </p>
      </div>

      {/* Bottom action */}
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#071A33]/8 pt-5">
        <span className="max-w-[190px] truncate text-xs font-medium text-[#071A33]/60">
          {value}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/10 bg-white text-[#071A33]/45 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#071A33] group-hover:text-white`}
        >
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.7}
          />
        </span>
      </div>
    </a>
  );
}