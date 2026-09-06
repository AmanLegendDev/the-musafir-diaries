"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DestinationFAQProps {
  name: string;
  bestTime: string;
  duration: string;
  country: string;
  state: string;
  city: string;
  startingPrice: number;
}

export default function DestinationFAQ({
  name,
  bestTime,
  duration,
  country,
  state,
  city,
  startingPrice,
}: DestinationFAQProps) {
  const faqs = [
    {
      question: `What is the best time to visit ${name}?`,
      answer: `The best time to visit ${name} is ${
        bestTime || "throughout the year"
      }. Weather conditions during this period are generally ideal for sightseeing and outdoor activities.`,
    },
    {
      question: `How many days are recommended for ${name}?`,
      answer: `We recommend spending ${
        duration || "a few days"
      } to comfortably explore the destination and nearby attractions.`,
    },
    {
      question: `Where is ${name} located?`,
      answer: `${name} is located in ${city}, ${state}, ${country}. It is a popular destination known for its natural beauty and memorable travel experiences.`,
    },
    {
      question: `What is the starting price for this trip?`,
      answer: `Packages for ${name} start from ₹${startingPrice.toLocaleString(
        "en-IN"
      )} per person. Final pricing may vary depending on travel dates, accommodation, and package inclusions.`,
    },
    {
      question: "Can I customize my travel package?",
      answer:
        "Yes. We can customize your itinerary based on your travel dates, budget, accommodation preferences, and activities.",
    },
    {
      question: "How can I book this destination?",
      answer:
        "You can contact us through the Book Now button, WhatsApp, or Call Now option. Our travel experts will assist you with the complete booking process.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-10 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Have Questions?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Find answers to the most common questions before
            planning your journey.
          </p>

        </div>

        <div className="mx-auto max-w-4xl space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="pr-6 text-lg font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-6 py-5 text-slate-600 leading-7">
                      {faq.answer}
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