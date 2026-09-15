"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Compass,
  Map,
  Plane,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Tell Us Your Plan",
    description:
      "Share your destination, travel dates, interests and the kind of experience you have in mind.",
  },
  {
    number: "02",
    icon: Map,
    title: "Get Your Itinerary",
    description:
      "We shape your journey around your preferences, with thoughtfully selected places, stays and experiences.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Confirm Your Trip",
    description:
      "Review the plan, clarify anything you need and confirm the journey when everything feels right.",
  },
  {
    number: "04",
    icon: Plane,
    title: "Travel",
    description:
      "Pack your bags and enjoy the Himalayas while we remain available to support you along the way.",
  },
] as const;

export default function HowItWorksGrid() {
  return (
    <div className="relative">
      {/* Desktop connecting line */}
      <div
        aria-hidden="true"
        className="
          absolute left-[12.5%] right-[12.5%] top-[29px]
          hidden h-px
          bg-[#071A33]/10
          lg:block
        "
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {STEPS.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.article
              key={step.number}
              initial={{
                opacity: 0,
                y: 24,
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
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group relative
                px-0
                sm:px-4
                lg:px-6
              "
            >
              {/* Mobile / tablet vertical connector */}
              {index < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="
                    absolute left-[29px] top-[64px]
                    h-[calc(100%+40px)]
                    w-px
                    bg-[#071A33]/10
                    sm:hidden
                  "
                />
              )}

              {/* Number + Icon */}
              <div className="relative z-10 flex items-center gap-4">
                <div
                  className="
                    flex h-[58px] w-[58px] shrink-0
                    items-center justify-center
                    rounded-full
                    border border-[#087E8B]/20
                    bg-[#FAF9F5]
                    text-[#087E8B]
                    shadow-[0_8px_30px_rgba(7,26,51,0.06)]
                    transition-all duration-500
                    group-hover:-translate-y-1
                    group-hover:border-[#087E8B]/40
                    group-hover:shadow-[0_14px_35px_rgba(8,126,139,0.12)]
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.6}
                  />
                </div>

                <span
                  className="
                    font-serif text-3xl font-light
                    tracking-[-0.03em]
                    text-[#071A33]/15
                    transition-colors duration-300
                    group-hover:text-[#F59E0B]/65
                    lg:hidden
                  "
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="ml-[74px] mt-5 sm:ml-0 sm:mt-7">
                <p
                  className="
                    hidden
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#087E8B]
                    lg:block
                  "
                >
                  Step {step.number}
                </p>

                <h3
                  className="
                    font-serif
                    text-2xl
                    font-medium
                    tracking-[-0.025em]
                    text-[#071A33]
                    sm:text-[25px]
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[260px]
                    text-sm
                    leading-6
                    text-[#071A33]/50
                  "
                >
                  {step.description}
                </p>

                {/* Accent */}
                <div
                  className="
                    mt-6
                    h-px
                    w-8
                    bg-[#F59E0B]/50
                    transition-all duration-500
                    group-hover:w-14
                  "
                />
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}