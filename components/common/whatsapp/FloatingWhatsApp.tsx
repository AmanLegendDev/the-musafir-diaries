"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { WHATSAPP_HREF } from "./whatsapp.config";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with The Musafir Diaries on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group fixed bottom-5 right-5 z-[80]
        flex items-center gap-3
        rounded-full
        border border-white/15
        bg-[#071A33]
        px-3 py-3
        text-white
        shadow-[0_18px_50px_rgba(7,26,51,0.25)]
        backdrop-blur-md
        transition-shadow duration-300
        hover:shadow-[0_22px_60px_rgba(7,26,51,0.32)]
        sm:bottom-7 sm:right-7
        sm:px-4 sm:py-3.5
      "
    >
      {/* WhatsApp Icon */}
      <span
        className="
          relative flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-full
          bg-[#087E8B]
          text-white
          shadow-[0_8px_25px_rgba(8,126,139,0.25)]
        "
      >
        {/* Subtle pulse */}
        <span
          className="
            absolute inset-0
            rounded-full
            bg-[#087E8B]
            opacity-20
            animate-ping
          "
        />

        <MessageCircle
          size={21}
          strokeWidth={2.2}
          className="relative"
        />
      </span>

      {/* Desktop Text */}
      <span className="hidden pr-1 text-left sm:block">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          Plan your journey
        </span>

        <span className="mt-0.5 block text-sm font-semibold text-white">
          Chat with us
        </span>
      </span>
    </motion.a>
  );
}