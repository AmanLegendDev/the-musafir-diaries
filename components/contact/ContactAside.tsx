"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactAside() {
  return (
    <aside className="space-y-5">
      {/* Intro card */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="border border-[#071A33]/10 bg-[#071A33] p-7 text-white sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#5CC6D0]">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
            What happens next
          </span>
        </div>

        <h3 className="mt-7 max-w-sm font-serif text-3xl leading-tight tracking-[-0.03em] text-white">
          No pressure.
          <span className="block text-[#5CC6D0]">Just a conversation.</span>
        </h3>

        <p className="mt-5 text-sm leading-7 text-white/50">
          You don&apos;t need a perfect itinerary before getting in touch.
          Start with the idea, and we can take it from there.
        </p>
      </motion.div>

      {/* Process */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="border border-[#071A33]/10 bg-[#FAF9F5]"
      >
        <div className="border-b border-[#071A33]/10 px-6 py-5 sm:px-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
            The simple version
          </p>
        </div>

        <div className="divide-y divide-[#071A33]/8">
          <ProcessStep
            number="01"
            title="Tell us"
            text="Share your destination, dates or travel idea."
          />

          <ProcessStep
            number="02"
            title="We understand"
            text="We look at what kind of journey fits your plans."
          />

          <ProcessStep
            number="03"
            title="Shape the journey"
            text="The details start coming together from there."
          />
        </div>
      </motion.div>

      {/* Direct contact */}
      <motion.a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="group flex items-center justify-between gap-5 border border-[#087E8B]/15 bg-[#087E8B]/[0.05] px-6 py-5 transition-all duration-300 hover:border-[#087E8B]/30 hover:bg-[#087E8B]/[0.08] sm:px-7"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#087E8B] text-white">
            <MessageCircle className="h-4 w-4" />
          </span>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/35">
              Prefer WhatsApp?
            </p>

            <p className="mt-1 text-sm font-semibold text-[#071A33]">
              Message us directly
            </p>
          </div>
        </div>

        <ArrowUpRight
          className="h-4 w-4 text-[#087E8B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.7}
        />
      </motion.a>
    </aside>
  );
}

function ProcessStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 px-6 py-5 sm:px-7">
      <span className="pt-0.5 text-[9px] font-semibold tracking-[0.12em] text-[#087E8B]/60">
        {number}
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-[#071A33]">{title}</h4>
          <CheckCircle2 className="h-3.5 w-3.5 text-[#087E8B]/60" />
        </div>

        <p className="mt-1 text-xs leading-5 text-[#071A33]/45">{text}</p>
      </div>
    </div>
  );
}