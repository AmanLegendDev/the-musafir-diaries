import Image from "next/image";

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
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover object-[68%_center]"
        />
      </div>

      {/* Left readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#071A33]/75 to-[#071A33]/10" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#071A33] via-[#071A33]/55 to-transparent" />

    

      {/* Editorial line */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-32 bg-white/20 lg:block" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1600px] items-center px-6 pb-28 pt-36 sm:px-8 lg:min-h-[calc(100svh-20px)] lg:px-12 lg:pb-32 lg:pt-32 xl:px-16">
        <div className="w-full">
          <HeroContent />
        </div>
      </div>

      {/* Destination rail */}
      <HeroDestinationRail />

      {/* Trust strip */}
      <HeroTrustBar />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 text-white/60 lg:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
          Scroll to explore
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
          <span className="text-sm" aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}