"use client";

import { motion } from "framer-motion";
import { Compass, LockKeyhole, MessageCircle } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Purposeful",
    text: "We collect information that helps us understand and respond to your travel needs.",
  },
  {
    icon: LockKeyhole,
    title: "Respectful",
    text: "Your personal information is handled with care and is not treated as a product to sell.",
  },
  {
    icon: MessageCircle,
    title: "Clear",
    text: "We aim to explain how your information may be used without unnecessary legal jargon.",
  },
];

export default function PrivacyIntro() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Editorial label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                Before you read
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#071A33]/45">
              Privacy policies can feel complicated. Ours is written
              to make the important things easy to understand.
            </p>
          </motion.div>

          {/* Main intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
              Our approach
            </p>

            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
              The same care we put into a journey should go into
              the information you share with us.
            </h2>

            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              When you contact The Musafir Diaries, you may share
              information such as your name, contact details,
              preferred destination, travel dates and details about
              the journey you are considering. We use this
              information primarily to understand your enquiry,
              communicate with you and help with travel planning or
              services you request.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              This Privacy Policy describes the general ways in which
              we may collect, use, share and protect personal
              information through our website and related
              communications.
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="mt-16 grid border-t border-[#071A33]/10 sm:grid-cols-3">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className={`py-8 sm:px-7 sm:py-9 ${
                  index > 0
                    ? "border-t border-[#071A33]/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#087E8B]/20 bg-white text-[#087E8B]">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-[#071A33]/45">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}