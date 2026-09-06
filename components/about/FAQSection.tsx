"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I book a trip with Altitude Escapes?",
    answer:
      "Booking is simple. Browse our packages, submit an inquiry, or contact our travel experts. We'll guide you through destination selection, itinerary planning, payment, and confirmation.",
  },
  {
    question: "Can I customize my travel itinerary?",
    answer:
      "Absolutely. Every traveler is different, so we create personalized itineraries based on your interests, travel style, budget, and preferred destinations.",
  },
  {
    question: "Do you arrange hotels and transportation?",
    answer:
      "Yes. We provide carefully selected accommodations, private transfers, local transportation, and complete travel coordination for a seamless experience.",
  },
  {
    question: "Are your trips suitable for families and honeymoon couples?",
    answer:
      "Yes. We design memorable experiences for families, honeymoon couples, solo travelers, groups, and corporate retreats with customized recommendations.",
  },
  {
    question: "Is it safe to travel in the Himalayas?",
    answer:
      "Safety is our highest priority. We work only with trusted local partners, experienced drivers, verified accommodations, and continuously monitor weather and travel conditions.",
  },
  {
    question: "What if I need help during my trip?",
    answer:
      "Our support team remains available throughout your journey. Whether it's itinerary changes, assistance, or emergencies, we're just a call or message away.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-28">

      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <div className="text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Frequently Asked Questions

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Everything You Need
            <span className="text-emerald-600">
              {" "}Before You Travel
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            We've answered some of the most common questions to help
            you plan your Himalayan adventure with complete confidence.

          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {

            const open = active === index;

            return (

              <motion.div
                key={faq.question}
                layout
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  onClick={() =>
                    setActive(open ? null : index)
                  }
                  className="flex w-full items-center justify-between p-7 text-left"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">

                      <HelpCircle className="h-6 w-6 text-emerald-600"/>

                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">

                      {faq.question}

                    </h3>

                  </div>

                  <ChevronDown
                    className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />

                </button>

                <AnimatePresence>

                  {open && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: .3,
                      }}
                    >

                      <div className="border-t border-slate-200 px-7 pb-7 pt-6">

                        <p className="leading-8 text-slate-600">

                          {faq.answer}

                        </p>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}