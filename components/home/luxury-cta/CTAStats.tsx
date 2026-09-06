"use client";

import { motion } from "framer-motion";

import type {
  CTAStatsProps,
} from "./types";

export default function CTAStats({
  stats,
}: CTAStatsProps) {
  return (
    <motion.div
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
      }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
      className="
        mt-16
        grid
        grid-cols-2
        gap-5

        lg:grid-cols-4
      "
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
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
            delay: index * 0.15,
            duration: 0.5,
          }}
          whileHover={{
            y: -6,
            scale: 1.03,
          }}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/10
            p-6
            text-center
            backdrop-blur-lg
            transition-all
            duration-300
            hover:border-[#3BAEA0]/50
            hover:bg-white/15
          "
        >
          <h3
            className="
              text-3xl
              font-bold
              text-white

              lg:text-4xl
            "
          >
            {stat.value}
          </h3>

          <p
            className="
              mt-3
              text-sm
              font-medium
              uppercase
              tracking-[0.15em]
              text-slate-200
            "
          >
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}