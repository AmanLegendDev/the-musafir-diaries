"use client";

import { motion } from "framer-motion";

import TestimonialGrid from "./TestimonialGrid";

import type {
  TestimonialsProps,
} from "./types";

export default function Testimonials({
  testimonials,
}: TestimonialsProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
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
            Testimonials
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
            Stories From Travelers
            <span className="block text-[#0F4C81]">
              Who Explored With Us
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
            Every journey leaves behind unforgettable memories. Here's
            what our travelers have to say about their luxury Himalayan
            experiences with Altitude Escapes.
          </p>
        </motion.div>

        <div className="mt-20">

                      {testimonials.length > 0 ? (
            <TestimonialGrid
              testimonials={testimonials}
            />
          ) : (
            <div
              className="
                rounded-[30px]
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-8
                py-16
                text-center
              "
            >
              <h3
                className="
                  text-2xl
                  font-semibold
                  text-slate-900
                "
              >
                Testimonials Coming Soon
              </h3>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-slate-600
                "
              >
                We're collecting authentic experiences from our
                travelers. Check back soon to read real stories from
                unforgettable Himalayan adventures.
              </p>
            </div>
          )}
        </div>
        {/* Google Review CTA */}
<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.6,
    delay: 0.1,
  }}
  viewport={{
    once: true,
  }}
  className="mt-14 flex justify-center"
>
  <div
    className="
      flex
      w-full
      max-w-2xl
      flex-col
      items-center
      gap-5
      rounded-[28px]
      border
      border-slate-200
      bg-white
      px-6
      py-8
      text-center
      shadow-[0_20px_60px_rgba(15,76,129,0.08)]
      sm:px-10
      sm:py-9
    "
  >
    <div>
      <p
        className="
          text-sm
          font-semibold
          uppercase
          tracking-[0.16em]
          text-[#0F4C81]
        "
      >
        Share Your Experience
      </p>

      <h3
        className="
          mt-2
          text-2xl
          font-bold
          tracking-tight
          text-slate-900
          md:text-3xl
        "
      >
        Loved your journey with us?
      </h3>

      <p
        className="
          mx-auto
          mt-3
          max-w-lg
          text-sm
          leading-6
          text-slate-600
          md:text-base
        "
      >
        Your experience can help other travelers discover
        unforgettable journeys with Altitude Escapes.
      </p>
    </div>

    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-[#0F4C81]
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-sky-900/10
        transition
        duration-300
        hover:-translate-y-0.5
        hover:bg-[#0B3A63]
        hover:shadow-xl
        focus:outline-none
        focus:ring-2
        focus:ring-[#0F4C81]/30
        focus:ring-offset-2
      "
    >
      Leave Us a Google Review
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</motion.div>
      </div>
    </section>
  );
}