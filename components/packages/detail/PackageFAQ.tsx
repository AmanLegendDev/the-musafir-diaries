"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface PackageFAQProps {
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is included in this package?",
    answer:
      "Your package includes all services listed in the Included section. Please review the Included & Excluded section for complete details.",
  },
  {
    question: "How can I book this package?",
    answer:
      "You can book instantly using the Book Now button or contact our travel experts via WhatsApp or phone for personalized assistance.",
  },
  {
    question: "Can I customize this itinerary?",
    answer:
      "Yes. We offer fully customizable travel packages. Contact our team and we'll create a personalized itinerary based on your preferences.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies depend on the destination, travel dates, and hotel bookings. Our travel advisor will explain all cancellation terms before confirming your booking.",
  },
  {
    question: "Are flights included?",
    answer:
      "Flights are included only if specifically mentioned in the package inclusions. Otherwise, they can be added on request.",
  },
  {
    question: "Is this package suitable for families?",
    answer:
      "Yes. Most of our packages are suitable for families, couples, solo travelers, and groups. Please check the package details or contact us for recommendations.",
  },
];

export default function PackageFAQ({
  faqs,
}: PackageFAQProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const data =
    faqs && faqs.length ? faqs : defaultFAQs;

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <HelpCircle className="h-4 w-4" />

            Frequently Asked Questions

          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Have Questions?
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Find quick answers to the most common questions
            before booking your journey.
          </p>

        </div>

        {/* Accordion */}

        <div className="mx-auto max-w-4xl space-y-5">

          {data.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition hover:bg-slate-50"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`h-6 w-6 text-emerald-600 transition-transform duration-300 ${
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
                    <div className="border-t border-slate-100 px-6 py-5">

                      <p className="leading-8 text-slate-600">
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