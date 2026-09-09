"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface DestinationFAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder?: number;
}

interface DestinationFAQsProps {
  faqs: DestinationFAQ[];
  destinationName: string;
}

export default function DestinationFAQs({
  faqs,
  destinationName,
}: DestinationFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? 0 : null
  );

  const sortedFaqs = [...faqs].sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  return (
    <section
      id="faqs"
      className="scroll-mt-24 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Editorial heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
                  Before you set off
                </span>
              </div>

              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#071A33] sm:text-5xl">
                Questions,
                <span className="block text-[#087E8B]">
                  answered.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                A few useful things to know before your
                {` ${destinationName}`} journey begins.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs text-[#071A33]/40">
                <HelpCircle
                  className="h-4 w-4 text-[#087E8B]"
                  strokeWidth={1.6}
                />

                <span>
                  Still have a question? We&apos;re here to help.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ list */}
          <div className="lg:col-span-8">
            {sortedFaqs.length > 0 ? (
              <div className="border-t border-[#071A33]/10">
                {sortedFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={faq._id}
                      className="border-b border-[#071A33]/10"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenIndex(
                            isOpen ? null : index
                          )
                        }
                        aria-expanded={isOpen}
                        aria-controls={`destination-faq-${faq._id}`}
                        className="group flex w-full items-start gap-5 py-6 text-left sm:gap-7 sm:py-7"
                      >
                        {/* Number */}
                        <span className="mt-1 w-7 shrink-0 text-[10px] font-semibold tracking-[0.16em] text-[#071A33]/25">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Question */}
                        <span className="flex-1">
                          {faq.category && (
                            <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
                              {faq.category}
                            </span>
                          )}

                          <span
                            className={[
                              "block pr-2 font-serif text-xl font-medium leading-tight tracking-[-0.02em] transition-colors duration-200 sm:text-2xl",
                              isOpen
                                ? "text-[#087E8B]"
                                : "text-[#071A33] group-hover:text-[#087E8B]",
                            ].join(" ")}
                          >
                            {faq.question}
                          </span>
                        </span>

                        {/* Toggle */}
                        <span
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "border-[#087E8B]/30 bg-[#087E8B] text-white"
                              : "border-[#071A33]/10 bg-white text-[#071A33]/45 group-hover:border-[#087E8B]/30 group-hover:text-[#087E8B]",
                          ].join(" ")}
                        >
                          <ChevronDown
                            className={[
                              "h-4 w-4 transition-transform duration-300",
                              isOpen
                                ? "rotate-180"
                                : "rotate-0",
                            ].join(" ")}
                            strokeWidth={1.7}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`destination-faq-${faq._id}`}
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
                              duration: 0.25,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="ml-12 max-w-2xl border-l-2 border-[#F59E0B]/60 pb-7 pl-5 sm:ml-14 sm:pl-6">
                              <p className="whitespace-pre-line text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[28px] border border-[#071A33]/10 bg-white p-8 sm:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#087E8B]">
                  Need to know something?
                </p>

                <h3 className="mt-3 font-serif text-2xl font-medium text-[#071A33] sm:text-3xl">
                  We&apos;re happy to talk through your journey.
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#071A33]/50">
                  If you have a question about {destinationName},
                  your dates or the kind of experience you are
                  looking for, get in touch with us directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}