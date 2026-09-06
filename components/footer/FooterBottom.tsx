"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowUp,
  Heart,
} from "lucide-react";

import type {
  FooterBottomProps,
} from "./types";

export default function FooterBottom({
  year,
}: FooterBottomProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        mt-16
        border-t
        border-white/10
        pt-8
      "
    >
      <div
        className="
          flex
          flex-col
          gap-8

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}

        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            © {year}{" "}
            <span className="font-semibold text-white">
              Altitude Escapes
            </span>
            . All rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-5
              text-sm
            "
          >
            <Link
              href="/privacy-policy"
              className="
                text-slate-400
                transition-colors
                hover:text-[#3BAEA0]
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-slate-400
                transition-colors
                hover:text-[#3BAEA0]
              "
            >
              Terms & Conditions
            </Link>

            <Link
              href="/sitemap"
              className="
                text-slate-400
                transition-colors
                hover:text-[#3BAEA0]
              "
            >
              Sitemap
            </Link>
          </div>

          <p
            className="
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-slate-400
            "
          >
            Developed with

            <Heart
              size={16}
              className="
                fill-red-500
                text-red-500
              "
            />

            by

            <Link
              href="https://www.amandigitalsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-semibold
                text-[#3BAEA0]
                transition-colors
                hover:text-white
              "
            >
              Aman Digital Solutions
            </Link>
          </p>
        </div>

        {/* Scroll To Top */}

        <motion.button
          whileHover={{
            y: -5,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={scrollToTop}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            self-start
            rounded-full
            border
            border-white/10
            bg-white/5
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-[#3BAEA0]
            hover:bg-[#3BAEA0]
          "
          aria-label="Back to top"
        >
          <ArrowUp size={22} />
        </motion.button>
      </div>
    </motion.div>
  );
}