"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircleQuestion,
} from "lucide-react";

import type { InquiryFAQProps } from "./types";

export default function InquiryFAQ({
  faqs,
}: InquiryFAQProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}

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
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#0F4C81]
              to-[#3BAEA0]
              text-white
              shadow-lg
            "
          >
            <MessageCircleQuestion size={30} />
          </div>

          <span
            className="
              mt-6
              inline-flex
              rounded-full
              bg-[#3BAEA0]/10
              px-4
              py-2
              text-sm
              font-semibold
              text-[#0F4C81]
            "
          >
            Frequently Asked Questions
          </span>

          <h2
            className="
              mt-5
              text-3xl
              font-bold
              text-[#081C2D]
              md:text-5xl
            "
          >
            Everything You Need
            <br />
            Before You Travel
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Still have questions? Here are the
            most common things travelers ask
            before submitting an inquiry.
          </p>
        </motion.div>

        {/* FAQ */}

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen =
              activeIndex === index;

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
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      isOpen
                        ? null
                        : index
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-6
                    text-left
                    transition-colors
                    hover:bg-slate-50
                  "
                >
                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-[#081C2D]
                    "
                  >
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`
                      transition-transform
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                <AnimatePresence>
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
                      }}
                    >
                      <div
                        className="
                          border-t
                          border-slate-100
                          px-6
                          py-5
                        "
                      >
                        <p
                          className="
                            leading-8
                            text-slate-600
                          "
                        >
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

        {/* Bottom */}

        <div
          className="
            mt-16
            rounded-3xl
            bg-gradient-to-r
            from-[#0F4C81]
            to-[#3BAEA0]
            p-8
            text-center
            text-white
          "
        >
          <h3 className="text-2xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mt-3 text-white/90">
            Our travel specialists are happy to
            help you plan your perfect Himalayan
            adventure.
          </p>

          <a
            href="tel:+919999999999"
            className="
              mt-6
              inline-flex
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#0F4C81]
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            Call Our Travel Expert
          </a>
        </div>
      </div>
    </section>
  );
}