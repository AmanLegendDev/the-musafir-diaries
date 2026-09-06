"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type {
  FooterLinksProps,
} from "./types";

export default function FooterLinks({
  sections,
}: FooterLinksProps) {
  return (
    <div
      className="
        grid
        gap-10

        sm:grid-cols-2

        lg:grid-cols-3
      "
    >
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
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
            delay: sectionIndex * 0.15,
          }}
        >
          <h3
            className="
              mb-6
              text-lg
              font-semibold
              text-white
            "
          >
            {section.title}
          </h3>

          <ul className="space-y-4">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-slate-300
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-[#3BAEA0]
                  "
                >
                  <ChevronRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}