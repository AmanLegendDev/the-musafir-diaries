"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

export interface HomeFAQ {
  _id: string;
  question: string;
  answer: string;

  category?: string;

  featured?: boolean;
  displayOrder?: number;

  status?: "active" | "draft";
}

interface FAQGridProps {
  faqs: HomeFAQ[];
}

export default function FAQGrid({
  faqs,
}: FAQGridProps) {
  const visibleFAQs = faqs
    .filter((faq) => {
      if (faq.status === undefined) return true;

      return faq.status === "active";
    })
    .sort(
      (a, b) =>
        (a.displayOrder ?? 0) -
        (b.displayOrder ?? 0)
    )
    .slice(0, 6);

  const [openId, setOpenId] = useState<string | null>(
    visibleFAQs[0]?._id ?? null
  );

  if (visibleFAQs.length === 0) return null;

  return (
    <div className="border-t border-[#071A33]/10">
      {visibleFAQs.map((faq, index) => {
        const isOpen = openId === faq._id;

        return (
          <motion.div
            key={faq._id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-[#071A33]/10"
          >
            <button
              type="button"
              onClick={() =>
                setOpenId(
                  isOpen ? null : faq._id
                )
              }
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq._id}`}
              className="group flex w-full items-start gap-5 py-6 text-left sm:py-7 lg:py-8"
            >
              {/* Number */}
              <span
                className={[
                  "hidden shrink-0 pt-1 font-serif text-sm font-light transition-colors duration-300 sm:block sm:w-8",
                  isOpen
                    ? "text-[#F59E0B]"
                    : "text-[#071A33]/20",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question */}
              <span className="flex-1">
                <span
                  className={[
                    "block font-serif text-xl leading-tight tracking-[-0.015em] transition-colors duration-300 sm:text-2xl lg:text-[27px]",
                    isOpen
                      ? "text-[#087E8B]"
                      : "text-[#071A33] group-hover:text-[#087E8B]",
                  ].join(" ")}
                >
                  {faq.question}
                </span>

                {/* Category */}
                {faq.category && (
                  <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.17em] text-[#071A33]/35">
                    {faq.category}
                  </span>
                )}
              </span>

              {/* Toggle */}
              <span
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11",
                  isOpen
                    ? "border-[#087E8B] bg-[#087E8B] text-white"
                    : "border-[#071A33]/10 text-[#071A33]/60 group-hover:border-[#087E8B] group-hover:text-[#087E8B]",
                ].join(" ")}
              >
                <Plus
                  size={17}
                  strokeWidth={1.6}
                  className={[
                    "transition-transform duration-500",
                    isOpen
                      ? "rotate-45"
                      : "rotate-0",
                  ].join(" ")}
                />
              </span>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${faq._id}`}
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    height: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 0.25,
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 pl-0 sm:pb-8 sm:pl-8">
                    <div className="max-w-2xl border-l-2 border-[#F59E0B]/50 pl-5 sm:pl-6">
                      <p className="text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
                        {faq.answer}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087E8B]">
                        <span>Good to know</span>

                        <ArrowUpRight
                          size={12}
                          strokeWidth={1.7}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}