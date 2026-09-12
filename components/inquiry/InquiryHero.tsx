"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Compass,
} from "lucide-react";

interface InquiryHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function InquiryHero({
  title = "Let's plan a journey worth remembering.",
  subtitle = "Tell us where you want to go, when you want to travel, and what kind of Himalayan experience you're looking for.",
  backgroundImage = "/images/inquiry/inquiry-hero.jpg",
}: InquiryHeroProps) {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#071A33] sm:min-h-[720px]">
      <Image
        src={backgroundImage}
        alt="Himalayan mountain landscape"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Restrained editorial overlays */}
      <div className="absolute inset-0 bg-[#071A33]/45" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/20 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/55 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[680px] w-full max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:min-h-[720px] sm:px-6 sm:pb-18 lg:px-8 lg:pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-auto flex items-center gap-1.5 pt-2 text-xs text-white/65"
        >
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <span className="text-white/90">Inquiry</span>
        </nav>

        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#F59E0B] backdrop-blur-sm">
              <Compass size={19} strokeWidth={1.7} />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Plan Your Journey
            </span>
          </div>

          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#inquiry-form"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 text-sm font-bold text-[#071A33] transition hover:bg-[#F7B83B] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/30"
            >
              Start your inquiry
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>

            <Link
              href="/destinations"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Explore destinations
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-xs text-white/60">
            <span>Destination & dates</span>
            <span className="hidden text-white/25 sm:inline">/</span>
            <span>Traveller details</span>
            <span className="hidden text-white/25 sm:inline">/</span>
            <span>Your preferences</span>
          </div>
        </div>

        <a
          href="#inquiry-form"
          aria-label="Scroll to inquiry form"
          className="absolute bottom-6 right-5 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition hover:text-white sm:flex lg:right-8"
        >
          Begin
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}