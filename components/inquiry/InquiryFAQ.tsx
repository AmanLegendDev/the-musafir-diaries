
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface InquiryFAQProps {
  faqs: FAQItem[];
}

export default function InquiryFAQ({
  faqs = [],
}: InquiryFAQProps) {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="inquiry-faq"
      aria-labelledby="inquiry-faq-heading"
      className="bg-[#FAF9F5] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}

        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
            Trip Planning
          </p>

          <h2
            id="inquiry-faq-heading"
            className="mt-4 font-serif text-4xl leading-tight text-[#071A33] sm:text-5xl"
          >
            Questions before you plan?
          </h2>

          <p className="mt-5 text-base leading-7 text-[#071A33]/60">
            Find answers to common questions
            about making a travel enquiry and
            planning a personalised Himalayan
            journey.
          </p>
        </div>

        {/* FAQ LIST */}

        <div className="mt-10 divide-y divide-[#071A33]/10 border-y border-[#071A33]/10">
          {faqs.map(
            (item, index) => {
              const isOpen =
                openIndex === index;

              return (
                <div
                  key={item.question}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(
                        isOpen
                          ? null
                          : index,
                      )
                    }
                    aria-expanded={
                      isOpen
                    }
                    aria-controls={`inquiry-faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <h3 className="text-base font-semibold leading-7 text-[#071A33] sm:text-lg">
                      {item.question}
                    </h3>

                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-[#087E8B] transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`inquiry-faq-answer-${index}`}
                    hidden={!isOpen}
                    className="pb-6"
                  >
                    <p className="max-w-3xl text-sm leading-7 text-[#071A33]/60 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

