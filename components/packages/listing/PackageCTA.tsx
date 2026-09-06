"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

export default function PackageCTA() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700" />

      <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />

      {/* Glow */}

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">

            <Sparkles className="h-4 w-4" />

            Tailor-Made Experiences

          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            Can't Find Your
            <br />
            Perfect Travel Package?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
            Every traveler is unique. Tell us your destination,
            budget, travel dates and preferences, and our travel
            experts will craft a personalized itinerary designed
            just for you.
          </p>

          {/* Features */}

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">

              <h3 className="font-semibold text-white">
                Personalized Itinerary
              </h3>

              <p className="mt-2 text-sm text-emerald-50">
                Customized day-wise plans based on your travel
                style.
              </p>

            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">

              <h3 className="font-semibold text-white">
                Best Price Guarantee
              </h3>

              <p className="mt-2 text-sm text-emerald-50">
                Premium experiences at transparent pricing.
              </p>

            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">

              <h3 className="font-semibold text-white">
                24×7 Travel Support
              </h3>

              <p className="mt-2 text-sm text-emerald-50">
                Dedicated assistance before and during your trip.
              </p>

            </div>

          </div>

          {/* CTA Buttons */}

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-emerald-700 transition hover:bg-slate-100"
            >
              <ArrowRight className="h-5 w-5" />

              Plan My Trip

            </Link>

            <Link
              href="https://wa.me/919999999999"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />

              WhatsApp Us

            </Link>

            <Link
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />

              Call Now

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}