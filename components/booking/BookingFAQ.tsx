
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BookingFAQProps {
  items: FAQItem[];
}

export default function BookingFAQ({
  items,
}: BookingFAQProps) {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="booking-faq"
      aria-labelledby="booking-faq-heading"
      className="bg-[#FAF9F5] px-6 py-16 text-[#071A33] sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* INTRO */}

        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
            Booking Questions
          </p>

          <h2
            id="booking-faq-heading"
            className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            Before you book your journey.
          </h2>

          <p className="mt-5 text-base leading-7 text-[#071A33]/65">
            Planning a Himalayan journey is easier
            when you know what information is needed
            before submitting your booking. The
            Musafir Diaries booking flow lets you
            provide your destination, travel date,
            group details, pickup requirements and
            special requests in one place.
          </p>

          <p className="mt-4 text-base leading-7 text-[#071A33]/65">
            If you are planning a trip to Himachal
            Pradesh or another Himalayan destination,
            provide as much relevant information as
            possible so your travel requirements can
            be understood clearly.
          </p>
        </div>

        {/* FAQ */}

        <div className="mt-10 divide-y divide-[#071A33]/10 border-y border-[#071A33]/10">
          {items.map(
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
                    aria-controls={`booking-faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <h3 className="text-base font-semibold leading-7 sm:text-lg">
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
                    id={`booking-faq-answer-${index}`}
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

