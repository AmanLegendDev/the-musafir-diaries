"use client";

import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroDestinationRail from "./HeroDestinationRail";
import HeroTrustBar from "./HeroTrustBar";
import { HERO_IMAGE } from "./heroData";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[760px] overflow-hidden bg-[#071A33] lg:min-h-[calc(100svh-20px)]"
    >
      {/* Cinematic Hero Image */}
      <div className="absolute inset-0">
       <img
  src={HERO_IMAGE.src}
  alt=""
  aria-hidden="true"
  fetchPriority="high"
  className="h-full w-full object-cover object-[68%_center]"
/>
      </div>

      {/* Left editorial readability layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#071A33]/75 to-[#071A33]/10" />

      {/* Bottom cinematic depth */}
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#071A33] via-[#071A33]/55 to-transparent" />

      {/* Very subtle warm light */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#1597C7]/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-[140px]" />

      {/* Fine editorial line */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-32 bg-white/20 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1600px] items-center px-6 pb-28 pt-36 sm:px-8 lg:min-h-[calc(100svh-20px)] lg:px-12 lg:pb-32 lg:pt-32 xl:px-16">
        <div className="w-full">
          <HeroContent />
        </div>
      </div>

      {/* Right destination rail */}
      <HeroDestinationRail />

      {/* Bottom trust strip */}
      <HeroTrustBar />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 text-white/60 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
          Scroll to explore
        </span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30"
        >
          <span className="text-sm">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}