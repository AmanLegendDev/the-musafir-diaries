"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FooterBrand() {
  return (
    <div className="max-w-md">
      {/* Logo + Brand */}
      <Link
        href="/"
        className="group inline-flex items-center gap-4"
        aria-label="The Musafir Diaries home"
      >
       <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-2.5">
  <Image
    src="/logo.png"
    alt="The Musafir Diaries"
    width={64}
    height={64}
    priority
    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
  />
</div>
        <div className="flex flex-col">
          <span className="font-serif text-[21px] font-medium leading-none tracking-[-0.025em] text-white">
            The Musafir
          </span>

          <span className="mt-1 font-serif text-[21px] font-medium leading-none tracking-[-0.025em] text-[#8ED9DF]">
            Diaries
          </span>

          <span className="mt-2 text-[8px] font-medium uppercase tracking-[0.28em] text-white/35">
            Explore · Experience · Belong
          </span>
        </div>
      </Link>

      {/* Statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-lg leading-8 text-white/65"
      >
        Thoughtfully crafted journeys through the Himalayas,
        beautiful stays and experiences that become part of
        your story.
      </motion.p>

      {/* Quote */}
      <div className="mt-8 border-l border-[#F59E0B] pl-5">
        <p className="font-serif text-xl italic leading-8 text-white/85">
          “Go somewhere beautiful. Come back with a story.”
        </p>
      </div>

      {/* Socials / CTA */}
      <div className="mt-9 flex items-center gap-3">
        <Link
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/50 transition-all duration-200 hover:border-[#1597C7]/50 hover:bg-[#1597C7]/10 hover:text-[#1597C7]"
        >
          IG
        </Link>

        <Link
          href="/inquiry"
          className="group ml-2 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white"
        >
          Start a conversation

          <ArrowUpRight className="h-4 w-4 text-[#F59E0B] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}