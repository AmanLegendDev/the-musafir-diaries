"use client";

import { useState } from "react";
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

export default function FAQGrid({ faqs }: FAQGridProps) {
  const visibleFAQs = faqs
    .filter((faq) => faq.status === undefined || faq.status === "active")
    .sort(
      (a, b) =>
        (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
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
        const answerId = `faq-answer-${faq._id}`;

        return (
          <div
            key={faq._id}
            className="border-b border-[#071A33]/10"
          >
            {/* Question */}
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              className="group flex w-full items-start gap-5 py-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#087E8B] sm:py-7 lg:py-8"
            >
              {/* Number */}
              <span
                aria-hidden="true"
                className={[
                  "hidden shrink-0 pt-1 font-serif text-sm font-light transition-colors duration-300 sm:block sm:w-8",
                  isOpen ? "text-[#F59E0B]" : "text-[#071A33]/40",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question and category */}
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

                {faq.category && (
                  <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.17em] text-[#071A33]/60">
                    {faq.category}
                  </span>
                )}
              </span>

              {/* Toggle */}
              <span
                aria-hidden="true"
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11",
                  isOpen
                    ? "border-[#087E8B] bg-[#087E8B] text-white"
                    : "border-[#071A33]/10 text-[#071A33]/70 group-hover:border-[#087E8B] group-hover:text-[#087E8B]",
                ].join(" ")}
              >
                <Plus
                  size={17}
                  strokeWidth={1.6}
                  className={[
                    "transition-transform duration-300",
                    isOpen ? "rotate-45" : "rotate-0",
                  ].join(" ")}
                />
              </span>
            </button>

            {/* Answer */}
            <div
              id={answerId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="pb-7 pl-0 sm:pb-8 sm:pl-8">
                  <div className="max-w-2xl border-l-2 border-[#F59E0B]/50 pl-5 sm:pl-6">
                    <p className="text-sm leading-7 text-[#071A33]/75 sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087E8B]">
                      <span>Good to know</span>

                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}