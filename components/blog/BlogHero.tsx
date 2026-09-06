"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import { ArrowRight, BookOpen } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src="/images/blog/blog-hero.jpg"
          alt="Altitude Escapes Travel Journal"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-blue-900/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Decorative Blur */}

      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Content */}

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-28 lg:px-8">

        <div className="max-w-3xl">

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md"
          >
            <BookOpen className="h-4 w-4 text-cyan-300" />

            <span className="text-sm font-medium tracking-wide text-white">
              Travel Journal
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Discover Stories
            <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Beyond The Journey.
            </span>
          </motion.h1>

          {/* Paragraph */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-200"
          >
            Explore luxury travel guides, hidden Himalayan gems,
            destination insights, local experiences and expert tips
            crafted to inspire your next unforgettable adventure.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="#articles"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore Articles

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/packages"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Packages
            </Link>
          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-14 flex flex-wrap gap-8"
          >
            <div>
              <p className="text-3xl font-bold text-white">100+</p>

              <p className="mt-1 text-sm text-slate-300">
                Travel Guides
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">25+</p>

              <p className="mt-1 text-sm text-slate-300">
                Destinations
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">Expert</p>

              <p className="mt-1 text-sm text-slate-300">
                Local Insights
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}