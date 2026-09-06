"use client";

import { motion } from "framer-motion";

import FeatureGrid from "./FeatureGrid";

import { features } from "./data";

export default function WhyChooseUs() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        py-24
        lg:py-32
      "
    >
      {/* Background Decoration */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-sky-200
              bg-sky-50
              px-4
              py-2
              text-sm
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#0F4C81]
            "
          >
            Why Choose Altitude Escapes
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-slate-900

              md:text-5xl
            "
          >
            Travel With Confidence,
            <span className="block text-[#0F4C81]">
              Explore Without Limits
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            From carefully curated itineraries to premium stays and
            dedicated local support, every journey is designed to
            deliver comfort, safety, and unforgettable Himalayan
            experiences.
          </p>
        </motion.div>

        <div className="mt-20">

                      <FeatureGrid
            features={features}
          />
        </div>
      </div>
    </section>
  );
}