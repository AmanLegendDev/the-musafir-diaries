"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_DESTINATIONS } from "./heroData";



export default function HeroDestinationRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col gap-5">
       {HERO_DESTINATIONS.map((destination) => (
        <Link
  key={destination.name}
  href={destination.href}
  className="group flex items-center gap-3"
>
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/50 shadow-lg">
              <img
                src={destination.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-[#071A33]/10" />
            </div>

            <div className="min-w-[120px] border-l border-white/20 pl-3">
              <p className="text-sm font-semibold text-white">
                {destination.name}
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/50">
                {destination.subtitle}
              </p>
            </div>
          </Link>
        ))}

        <Link
          href="/destinations"
          className="group mt-2 flex items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF9F5] text-[#071A33] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            Explore More
          </span>
        </Link>
      </div>
    </motion.aside>
  );
}