"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative h-[90vh] min-h-[720px] overflow-hidden pt-16">

      <Image
        src="/images/about/about-hero.jpg"
        alt="About Altitude Escapes"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />

      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">

            <Compass className="h-4 w-4 text-emerald-400" />

            <span className="text-sm font-medium text-white">

              About Altitude Escapes

            </span>

          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-white md:text-7xl">

            Crafting
            <span className="text-emerald-400">
              {" "}Extraordinary
            </span>

            <br />

            Himalayan Journeys

          </h1>

          

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/packages"
              className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore Packages

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Contact Us
            </Link>

          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6">

            <div>

              <h3 className="text-3xl font-bold text-white">

                5000+

              </h3>

              <p className="mt-2 text-sm text-slate-300">

                Happy Travelers

              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold text-white">

                25+

              </h3>

              <p className="mt-2 text-sm text-slate-300">

                Destinations

              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold text-white">

                4.9★

              </h3>

              <p className="mt-2 text-sm text-slate-300">

                Guest Rating

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}