"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import type {
  FooterBrandProps,
} from "./types";

export default function FooterBrand({
  socialLinks,
}: FooterBrandProps) {
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
      className="max-w-sm"
    >
      {/* Logo */}

      <Link
        href="/"
        className="
          inline-flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0F4C81]
            to-[#3BAEA0]
            text-xl
            font-bold
            text-white
            shadow-lg
          "
        >
          AE
        </div>

        <div>
          <h3
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Altitude Escapes
          </h3>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            Luxury Himalayan Experiences
          </p>
        </div>
      </Link>

      {/* Description */}

      <p
        className="
          mt-6
          leading-8
          text-slate-300
        "
      >
        Discover handcrafted Himalayan adventures,
        luxury stays, breathtaking destinations, and
        unforgettable journeys created by passionate
        travel experts.
      </p>

      {/* Social Icons */}

      <div
        className="
          mt-8
          flex
          gap-4
        "
      >
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <motion.div
              key={social.label}
              whileHover={{
                y: -5,
                scale: 1.08,
              }}
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-slate-300
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#3BAEA0]
                  hover:bg-[#3BAEA0]/10
                  hover:text-white
                "
              >
                <Icon size={18} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}