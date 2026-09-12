"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

interface PackageFAQsProps {
  packageId: string;
  packageName: string;
  faqs?: FAQ[];
}

export default function PackageFAQs({
  packageId,
  packageName,
  faqs = [],
}: PackageFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  void packageId;

  if (!faqs.length) {
    return (
      <section
        id="faqs"
        className="scroll-mt-24 border-t border-[#071A33]/8 bg-[#FAF9F5] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#1597C7]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                  Questions, answered
                </span>
              </div>

              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
                Before you set off.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#071A33]/50">
                Have a question about this journey? We are only
                a conversation away.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <HelpCircle
                  className="h-4 w-4 text-[#F59E0B]"
                  strokeWidth={1.6}
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/30">
                  {packageName}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-[#071A33]/8 bg-white p-7 sm:p-9">
                <p className="text-sm leading-7 text-[#071A33]/55">
                  Questions about dates, customisation, stays or
                  pricing can be discussed with our travel team
                  when you enquire about this journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faqs"
      className="scroll-mt-24 border-t border-[#071A33]/8 bg-[#FAF9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#1597C7]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                Questions, answered
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
              Before you set off.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#071A33]/50">
              A few useful answers before you begin planning
              your journey.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-[28px] border border-[#071A33]/8 bg-white">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq._id}
                    className="border-b border-[#071A33]/8 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                    >
                      <div>
                        {faq.category && (
                          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]/60">
                            {faq.category}
                          </span>
                        )}

                        <h3 className="mt-1 font-serif text-lg leading-7 text-[#071A33] sm:text-xl">
                          {faq.question}
                        </h3>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/8 text-[#071A33]/45">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.6}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pr-16 text-sm leading-7 text-[#071A33]/50 sm:px-8 sm:pb-7 sm:pr-20">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}