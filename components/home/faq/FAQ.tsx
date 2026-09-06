"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "What destinations does Altitude Escapes cover?",
    answer:
      "Altitude Escapes offers curated Himalayan travel experiences across destinations such as Himachal Pradesh and other mountain regions. Explore our destinations to discover the places currently available.",
  },
  {
    question: "Can I customize my travel package?",
    answer:
      "Yes. Our travel experts can help you plan an experience around your preferred destination, travel dates, number of travellers, budget, and travel style.",
  },
  {
    question: "How can I book a trip?",
    answer:
      "You can start your trip inquiry through our booking or inquiry form. Share your travel requirements and our team can help you with the next steps.",
  },
  {
    question: "Do you arrange accommodation and transportation?",
    answer:
      "Depending on the selected travel experience, accommodation, transportation, activities, and other services may be included. The exact inclusions are mentioned on the respective package.",
  },
  {
    question: "Can you help plan honeymoon and family trips?",
    answer:
      "Absolutely. Whether you're travelling as a couple, family, group of friends, or solo traveller, we can help you explore experiences suited to your travel preferences.",
  },
  {
    question: "How early should I plan my Himalayan trip?",
    answer:
      "Planning ahead is recommended, especially during peak travel seasons. It gives you more flexibility when choosing dates, accommodation, transportation, and experiences.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <section
      id="faq"
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
      "
    >
      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-72
          w-72
          rounded-full
          bg-emerald-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-96
          w-96
          rounded-full
          bg-sky-100/40
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 flex justify-center">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-2
                text-sm
                font-semibold
                uppercase
                tracking-[0.16em]
                text-emerald-700
              "
            >
              <HelpCircle size={16} />

              Travel FAQs
            </span>
          </div>

          <h2
            className="
              text-4xl
              font-bold
              tracking-tight
              text-slate-900
              md:text-5xl
            "
          >
            Everything You Need
            <span className="block text-emerald-600">
              To Know Before You Go
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            Have questions about planning your Himalayan
            adventure? Find quick answers to the things
            travellers ask us most.
          </p>
        </motion.div>

        {/* FAQ List */}

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "border-emerald-200 bg-emerald-50/40 shadow-lg shadow-emerald-100/40"
                      : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    px-6
                    py-6
                    text-left
                    md:px-7
                  "
                >
                  <span
                    className={`
                      text-base
                      font-semibold
                      leading-7
                      transition-colors
                      md:text-lg

                      ${
                        isOpen
                          ? "text-emerald-700"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-colors

                      ${
                        isOpen
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    <ChevronDown size={19} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
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
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7">
                        <div className="border-t border-emerald-100 pt-5">
                          <p className="max-w-3xl text-[15px] leading-7 text-slate-600 md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-12
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-6
            text-center
            md:p-8
          "
        >
          <h3 className="text-xl font-bold text-slate-900">
            Still planning your perfect escape?
          </h3>

          <p className="mt-2 text-slate-600">
            Our travel experts are happy to help you plan it.
          </p>

          <a
            href="/inquiry"
            className="
              mt-5
              inline-flex
              items-center
              rounded-full
              bg-emerald-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-emerald-200
              transition-all
              hover:-translate-y-0.5
              hover:bg-emerald-700
            "
          >
            Plan My Trip
          </a>
        </motion.div>
      </div>
    </section>
  );
}