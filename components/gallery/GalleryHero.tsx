"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Camera, Images, ArrowRight } from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="relative h-[75vh] min-h-[650px] overflow-hidden">

      {/* Background */}

      <Image
        src="/images/gallery/gallery-hero.jpg"
        alt="Altitude Escapes Gallery"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/30" />

      {/* Floating Blur */}

      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Content */}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-3xl"
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-xl">

            

            <span className="text-sm font-medium text-white">

             

            </span>

          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-white md:text-7xl">

            Explore Our
            <span className="text-emerald-400">
              {" "}Gallery
            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-200">

            Every photograph tells a story. Discover breathtaking Himalayan
            landscapes, unforgettable adventures, luxury stays, and cherished
            travel memories captured through our journeys.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="#gallery"
              className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore Gallery

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              <Images className="h-5 w-5" />

              View Packages
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}