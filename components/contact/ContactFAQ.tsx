"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "Our travel experts typically respond within 30–60 minutes during business hours. Inquiries submitted after hours are answered on the next working day.",
  },
  {
    question: "Can I request a fully customized itinerary?",
    answer:
      "Absolutely. Every trip can be tailored to your destination, travel dates, budget, accommodation preferences, and activities.",
  },
  {
    question: "Do I need to pay before discussing my trip?",
    answer:
      "No. Your initial consultation is completely free. We'll discuss your travel plans, recommend the best options, and answer all your questions before any booking.",
  },
  {
    question: "Can I contact you through WhatsApp?",
    answer:
      "Yes. You can reach us via WhatsApp, phone, email, or the inquiry form—whichever is most convenient for you.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <div className="text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            Need More Information?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Frequently Asked
            <span className="text-emerald-600"> Questions</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Here are some common questions travelers ask before
            contacting our team.
          </p>

        </div>

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => {

            const active = open === index;

            return (

              <motion.div
                layout
                key={faq.question}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  onClick={() =>
                    setOpen(active ? null : index)
                  }
                  className="flex w-full items-center justify-between p-7 text-left"
                >

                  <h3 className="text-lg font-semibold text-slate-900">

                    {faq.question}

                  </h3>

                  <ChevronDown
                    className={`transition duration-300 ${
                      active ? "rotate-180" : ""
                    }`}
                  />

                </button>

                <AnimatePresence>

                  {active && (

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
                    >

                      <div className="border-t border-slate-200 px-7 pb-7 pt-5">

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