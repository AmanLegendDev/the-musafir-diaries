"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder?: number;
};

type Props = {
  faqs: FAQ[];
  hotelName: string;
};

export default function HotelFAQs({
  faqs,
  hotelName,
}: Props) {
  const validFAQs = faqs.filter(
    (faq) =>
      faq.question?.trim() &&
      faq.answer?.trim()
  );

  const [openId, setOpenId] = useState<
    string | null
  >(validFAQs[0]?._id ?? null);

  if (validFAQs.length === 0) {
    return null;
  }

  return (
    <section
      id="faqs"
      className="scroll-mt-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:py-28">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-px w-8 bg-[#087E8B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
              Helpful answers
            </span>

            <span className="h-px w-8 bg-[#087E8B]" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[#071A33] sm:text-4xl lg:text-5xl">
            Questions about
            <span className="block text-[#087E8B]">
              your stay?
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#071A33]/50">
            Everything you need to know about{" "}
            {hotelName}.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-12 space-y-3">
          {validFAQs.map((faq, index) => {
            const isOpen =
              openId === faq._id;

            return (
              <div
                key={faq._id}
                className={`overflow-hidden rounded-2xl border transition duration-300 ${
                  isOpen
                    ? "border-[#087E8B]/20 bg-white shadow-[0_12px_35px_rgba(7,26,51,0.06)]"
                    : "border-[#071A33]/8 bg-white"
                }`}
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
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  {/* Number */}
                  <span
                    className={`hidden shrink-0 text-[10px] font-bold tracking-[0.16em] sm:block ${
                      isOpen
                        ? "text-[#087E8B]"
                        : "text-[#071A33]/25"
                    }`}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF9F5] text-[#087E8B]">
                    <HelpCircle className="h-4 w-4" />
                  </span>

                  <span
                    className={`flex-1 text-sm font-semibold leading-6 transition sm:text-[15px] ${
                      isOpen
                        ? "text-[#087E8B]"
                        : "text-[#071A33]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-[#087E8B] text-white"
                        : "bg-[#071A33]/5 text-[#071A33]/45"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq._id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#071A33]/7 px-5 pb-6 pt-4 sm:ml-[4.5rem] sm:px-6">
                      <p className="whitespace-pre-line text-sm leading-7 text-[#071A33]/55">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}