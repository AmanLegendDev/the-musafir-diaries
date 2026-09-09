"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTAVisual() {
  return (
    <div className="relative min-h-[430px] lg:min-h-full">
      {/* Image */}
      <Image
        src="/images/hero/himalayan-hero.webp"
        alt="Himalayan mountains"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33] via-[#071A33]/20 to-transparent lg:from-[#071A33] lg:via-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/70 via-transparent to-[#071A33]/10" />

      {/* Editorial frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 right-6 hidden sm:block lg:bottom-12 lg:right-12"
      >
        <div className="flex items-center gap-3 border border-white/20 bg-[#071A33]/45 px-4 py-3 backdrop-blur-md">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Himalayan Stories
          </span>

          <ArrowUpRight className="h-4 w-4 text-[#F59E0B]" />
        </div>
      </motion.div>

      {/* Orange accent */}
      <div className="absolute bottom-0 left-0 h-1 w-24 bg-[#F59E0B]" />
    </div>
  );
}