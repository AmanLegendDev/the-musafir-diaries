"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { FAQItem } from "./types";

interface InquiryFAQProps {
  faqs: FAQItem[];
}

export default function InquiryFAQ({
  faqs,
}: InquiryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) {
    return null;
  }

  return (
    <section
      id="inquiry-faq"
      className="bg-[#F7F6F1] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        {/* Intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E7F4F5] text-[#087E8B]">
            <HelpCircle size={21} strokeWidth={1.7} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#087E8B]">
            Before you begin
          </p>

          <h2 className="mt-3 max-w-md font-serif text-3xl font-semibold tracking-tight text-[#071A33] sm:text-4xl">
            A few things worth knowing.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#071A33]/60 sm:text-base">
            If you're still deciding on the details of your
            journey, these answers should help you understand
            what happens after an inquiry.
          </p>
        </div>

        {/* Accordion */}
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  className="border-b border-[#071A33]/8 last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(
                        isOpen ? null : index,
                      )
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-[#FAF9F5] sm:px-7 sm:py-6"
                  >
                    <span className="text-sm font-semibold leading-6 text-[#071A33] sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition",
                        isOpen
                          ? "border-[#087E8B] bg-[#087E8B] text-white"
                          : "border-[#071A33]/10 text-[#071A33]/50",
                      ].join(" ")}
                    >
                      <ChevronDown
                        size={16}
                        className={[
                          "transition-transform duration-200",
                          isOpen ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-7">
                      <div className="max-w-2xl border-l-2 border-[#087E8B]/25 pl-4">
                        <p className="text-sm leading-7 text-[#071A33]/60">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}