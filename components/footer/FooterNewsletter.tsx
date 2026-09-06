"use client";

import { motion } from "framer-motion";

import {
  Mail,
  Send,
} from "lucide-react";

import type {
  FooterNewsletterProps,
} from "./types";

export default function FooterNewsletter({
  title,
  description,
}: FooterNewsletterProps) {
  return (
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
        duration: 0.7,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-14
          w-14
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
        <Mail size={24} />
      </div>

      {/* Heading */}

      <h3
        className="
          mt-6
          text-2xl
          font-bold
          text-white
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-3
          leading-7
          text-slate-300
        "
      >
        {description}
      </p>

      {/* Form */}

      <form
        className="
          mt-8
          flex
          flex-col
          gap-4

          sm:flex-row
        "
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="
            flex-1
            rounded-full
            border
            border-white/10
            bg-white/10
            px-6
            py-4
            text-white
            placeholder:text-slate-400
            outline-none
            backdrop-blur-md
            transition-all
            duration-300
            focus:border-[#3BAEA0]
            focus:ring-2
            focus:ring-[#3BAEA0]/30
          "
        />

        <button
          type="submit"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#3BAEA0]
            px-7
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#2f988d]
            hover:shadow-xl
          "
        >
          Subscribe

          <Send
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </button>
      </form>

      {/* Footer Note */}

      <p
        className="
          mt-5
          text-sm
          text-slate-400
        "
      >
        No spam. Only travel inspiration, exclusive offers,
        and Himalayan adventure updates.
      </p>
    </motion.div>
  );
}