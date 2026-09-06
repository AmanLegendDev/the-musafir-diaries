"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPinned,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export default function PackageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Background */}

      <div className="absolute inset-0">
        <img
          src="/images/packages/packages-hero.jpg"
          alt="Altitude Escapes Tour Packages"
          className="h-full w-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-emerald-950/80" />
      </div>

      {/* Glow */}

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 py-24 lg:py-36">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
          >
            <MapPinned className="h-4 w-4" />
            Premium Himalayan Tour Packages
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl"
          >
            Curated Experiences,
            <br />
            <span className="text-emerald-400">
              Unforgettable Journeys.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Explore handpicked travel packages across Himachal,
            Kashmir, Uttarakhand and beyond. Luxury stays,
            experienced local guides, curated itineraries and
            unforgettable mountain adventures—all crafted for a
            seamless travel experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="#packages"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Explore Packages

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/inquiry"
              className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Plan Custom Trip
            </Link>
          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Star className="mb-3 h-7 w-7 text-yellow-400" />

              <h3 className="text-2xl font-bold text-white">
                4.9★
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Average Rating
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <MapPinned className="mb-3 h-7 w-7 text-emerald-400" />

              <h3 className="text-2xl font-bold text-white">
                50+
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Tour Packages
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Users className="mb-3 h-7 w-7 text-cyan-400" />

              <h3 className="text-2xl font-bold text-white">
                5K+
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Happy Travelers
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <ShieldCheck className="mb-3 h-7 w-7 text-green-400" />

              <h3 className="text-2xl font-bold text-white">
                100%
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Trusted Support
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}