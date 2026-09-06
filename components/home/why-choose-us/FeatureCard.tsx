"use client";

import { motion, type Variants } from "framer-motion";

import type {
  FeatureCardProps,
} from "./types";

import Link from "next/link";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FeatureCard({
  feature,
}: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
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
          h-40
          w-40
          rounded-full
          bg-[#3BAEA0]/10
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <div
        className="
          relative
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

      <div className="mt-8">

                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {feature.title}
        </h3>

        <p className="mt-4 text-[15px] leading-7 text-slate-600">
          {feature.description}
        </p>

        <motion.div
          whileHover={{
            x: 6,
          }}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            font-semibold
            text-[#0F4C81]
          "
        >
          <Link href="/about">
          <span>Learn More</span>
          </Link>

          <span
            className="
              text-xl
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </motion.div>
      </div>

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