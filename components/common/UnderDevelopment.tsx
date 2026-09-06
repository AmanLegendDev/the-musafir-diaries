"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Compass,
  Home,
  Sparkles,
} from "lucide-react";

interface UnderDevelopmentProps {
  title: string;
  description: string;
}

export default function UnderDevelopment({
  title,
  description,
}: UnderDevelopmentProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-6 py-24">

      {/* Background Blur */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="container relative mx-auto max-w-4xl">

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
            duration: 0.6,
          }}
          className="rounded-[32px] border border-white/60 bg-white/70 p-10 text-center shadow-2xl backdrop-blur-xl md:p-16"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

            <Compass className="h-12 w-12 text-emerald-600" />

          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <Clock3 className="h-4 w-4" />

            Launching Soon

          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

            <div className="flex items-center justify-center gap-2 text-emerald-700">

              <Sparkles className="h-5 w-5" />

              <span className="font-semibold">
                We're crafting an exceptional experience for you.
              </span>

            </div>

          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Home className="h-5 w-5" />

              Back to Home
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
            >
              Explore Destinations

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
            >
              Explore Packages

              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}