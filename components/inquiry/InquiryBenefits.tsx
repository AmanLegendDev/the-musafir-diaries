"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  BadgeDollarSign,
  Compass,
  Headset,
  Map,
} from "lucide-react";




const benefits = [
  {
    title: "Customized Itineraries",
    description:
      "Every trip is tailored to your interests and budget.",
    icon: Compass,
  },
  {
    title: "Best Value Guaranteed",
    description:
      "Transparent pricing with no hidden costs.",
    icon: BadgeDollarSign,
  },
  {
    title: "Local Experts",
    description:
      "Explore Himachal with experienced local guides.",
    icon: Map,
  },
  {
    title: "Dedicated Support",
    description:
      "We're with you before, during, and after your journey.",
    icon: Headset,
  },
];

export default function InquiryBenefits() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}

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
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
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
            Why Start With an Inquiry?
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
            Every Great Journey Begins
            <br />
            With the Right Plan
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Share your travel preferences with our local experts.
            We'll design a personalized Himalayan experience
            tailored to your budget, interests, and travel style.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
            mt-16
            grid
            gap-8

            md:grid-cols-2

            xl:grid-cols-4
          "
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
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
                  delay: index * 0.1,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#3BAEA0]/30
                  hover:shadow-2xl
                "
              >
                {/* Icon */}

                <div
                  className="
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
                  <Icon size={30} />
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-8
                    text-xl
                    font-bold
                    text-[#081C2D]
                  "
                >
                  {benefit.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-600
                  "
                >
                  {benefit.description}
                </p>

                {/* Link */}

                
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}