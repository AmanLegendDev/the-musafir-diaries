"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
    <Navbar/>
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-26 text-white">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-[120px]" />

        <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

        {/* Compass */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: -20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl"
        >
          <Compass
            className="text-emerald-400"
            size={38}
          />
        </motion.div>

        {/* 404 */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
            Lost in the Himalayas?
          </p>

          <h1
            className="
              mt-5
              text-[clamp(7rem,20vw,13rem)]
              font-black
              leading-none
              tracking-[-0.08em]
              text-white
            "
          >
            404
          </h1>
        </motion.div>

        {/* Message */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            This trail doesn&apos;t exist.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 md:text-lg md:leading-8">
            Looks like you&apos;ve wandered off the map.
            Don&apos;t worry — your next Himalayan adventure
            is still waiting for you.
          </p>
        </motion.div>

        {/* Actions */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-500
              px-7
              py-3.5
              font-semibold
              text-white
              shadow-xl
              shadow-emerald-500/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-emerald-400
            "
          >
            <Home size={18} />

            Back to Home

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/destinations"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/5
              px-7
              py-3.5
              font-semibold
              text-white
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white/10
            "
          >
            <MapPin size={18} />

            Explore Destinations
          </Link>
        </motion.div>

        {/* Back */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.7,
          }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={16} />

            Go back to the previous page
          </button>
        </motion.div>

        {/* Brand */}

        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-sm font-medium text-slate-500">
            Altitude Escapes
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Every journey begins with trust.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}