"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FooterBrand() {
  return (
    <div className="max-w-md">
      {/* Logo */}
      <Link
        href="/"
        className="group inline-flex items-center gap-3"
        aria-label="The Musafir Diaries home"
      >
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white/5">
          <Image
            src="/logo.png"
            alt="The Musafir Diaries"
            fill
            sizes="48px"
            className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <div className="font-serif text-xl leading-none tracking-tight text-white">
            The Musafir Diaries
          </div>

          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-white/40">
            Explore · Experience · Belong
          </div>
        </div>
      </Link>

      {/* Statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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

      {/* Socials */}
    <div className="mt-9 flex items-center gap-3">
  <Link
    href="/under-development"
    aria-label="Instagram"
    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/50 transition-all duration-300 hover:border-[#1597C7]/50 hover:bg-[#1597C7]/10 hover:text-[#1597C7]"
  >
    IG
  </Link>

  <Link
    href="/inquiry"
    className="group ml-2 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
  >
    Start a conversation

    <ArrowUpRight className="h-4 w-4 text-[#F59E0B] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </Link>
</div>
    </div>
  );
}