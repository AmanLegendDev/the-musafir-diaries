"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import {
  MapPin,
  Quote,
  Mountain,
} from "lucide-react";

import RatingStars from "./RatingStars";

import type {
  TestimonialCardProps,
} from "./types";

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200/70
        bg-white
        p-8
        shadow-[0_18px_55px_rgba(15,23,42,.06)]
        transition-all
        duration-300
        hover:border-[#3BAEA0]/40
        hover:shadow-[0_24px_70px_rgba(15,76,129,.12)]
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-44
          w-44
          rounded-full
          bg-[#3BAEA0]/10
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Quote */}

      <Quote
        size={42}
        className="
          absolute
          right-8
          top-8
          text-[#3BAEA0]/20
        "
      />

      <div className="relative flex items-center gap-4">
        <div
          className="
            relative
            h-16
            w-16
            overflow-hidden
            rounded-full
            ring-4
            ring-sky-100
          "
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            {testimonial.name}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {testimonial.designation}
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              text-sm
              text-slate-500
            "
          >
            <MapPin size={15} />

            <span>{testimonial.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <RatingStars
          rating={testimonial.rating}
        />
      </div>

      <div className="mt-6">

                <p
          className="
            text-[15px]
            leading-7
            text-slate-600
          "
        >
          "{testimonial.review}"
        </p>
      </div>

      {testimonial.trip && (
        <div className="mt-8">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-sky-50
              px-4
              py-2
              text-sm
              font-medium
              text-[#0F4C81]
            "
          >
            <Mountain size={16} />

            {testimonial.trip}
          </span>
        </div>
      )}

      {/* Bottom Accent Line */}

      <motion.div
        initial={{
          width: "0%",
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-1
          rounded-r-full
          bg-gradient-to-r
          from-[#0F4C81]
          to-[#3BAEA0]
        "
      />
    </motion.article>
  );
}