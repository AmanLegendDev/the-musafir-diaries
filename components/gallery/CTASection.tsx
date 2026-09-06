"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950" />

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

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
          className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl lg:p-16"
        >

          <span className="inline-flex rounded-full bg-emerald-500/20 px-5 py-2 text-sm font-semibold text-emerald-300">

            Your Journey Starts Here

          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">

            Ready to Create
            <span className="text-emerald-400">
              {" "}Your Own Story?
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">

            The mountains are waiting, unforgettable experiences are calling,
            and your next adventure is just one step away. Let Altitude
            Escapes turn your dream journey into reality.

          </p>

          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore Packages

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <CalendarDays className="h-5 w-5" />

              Plan Your Trip
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}