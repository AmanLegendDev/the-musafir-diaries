"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

type Props = {
  faqs?: FAQ[];
};

function formatAnswer(answer: string) {
  return answer
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function AboutFAQ({ faqs = [] }: Props) {
  const items = faqs.slice(0, 5);

  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="min-w-0"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#087E8B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Before you go
              </span>
            </div>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
              A few things you might be wondering.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#071A33]/50">
              Have a question about planning a journey? Our full FAQ section
              has more answers to help you travel with clarity.
            </p>

            <Link
              href="/faqs"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#087E8B]"
            >
              Read all FAQs

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="min-w-0 w-full border-t border-[#071A33]/10"
          >
            {items.map((faq, index) => (
              <div
                key={faq._id}
                className="group min-w-0 w-full border-b border-[#071A33]/10"
              >
                <Link
                  href={`/faqs?search=${encodeURIComponent(faq.question)}`}
                  className="flex min-w-0 w-full items-start gap-3 py-6 sm:gap-5 sm:py-7"
                >
                  <span className="w-7 shrink-0 pt-0.5 text-[10px] font-semibold tracking-[0.12em] text-[#071A33]/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    {faq.category && (
                      <span className="block min-w-0 truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/30">
                        {faq.category}
                      </span>
                    )}

                    <span className="mt-1.5 block min-w-0 whitespace-normal break-words font-serif text-xl leading-[1.2] tracking-[-0.02em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-2xl">
                      {faq.question}
                    </span>

                    <span className="mt-2 block min-w-0 truncate text-xs leading-5 text-[#071A33]/35">
                      {formatAnswer(faq.answer)}
                    </span>
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/10 text-[#071A33]/40 transition-all duration-300 group-hover:border-[#087E8B]/25 group-hover:text-[#087E8B]">
                    <Plus className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}