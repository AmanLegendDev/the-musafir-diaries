"use client";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Mountain,
  MapPinned,
  Star,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
export default function DestinationHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">

      {/* Background Blur */}

      <div className="absolute inset-0 -z-20">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-100 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-100 blur-[120px]" />
      </div>

      {/* Grid */}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb20_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb20_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="container mx-auto px-6 py-24 lg:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            {/* Badge */}

            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2 shadow-sm"
            >
              <Compass className="h-4 w-4 text-emerald-600" />

              <span className="text-sm font-medium text-slate-700">
                Premium Himalayan Destinations
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xl text-5xl font-bold leading-tight text-slate-900 lg:text-6xl"
            >
              Discover the
              <span className="block text-emerald-600">
                Himalayas
              </span>
              Like Never Before
            </motion.h1>

            {/* Description */}

            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-600"
            >
              Explore breathtaking mountain towns, hidden valleys,
              snow-capped peaks, and unforgettable adventures across
              Himachal Pradesh with carefully crafted premium travel
              experiences.
            </motion.p>

            {/* CTA */}

            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="#destinations"
                className="group inline-flex items-center rounded-xl bg-emerald-600 px-7 py-4 text-white transition-all duration-300 hover:bg-emerald-700"
              >
                Explore Destinations

                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-slate-700 transition-all duration-300 hover:border-emerald-600 hover:text-emerald-600"
              >
                Plan My Trip
              </Link>
            </motion.div>

            {/* Quick Stats */}

            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  15+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Destinations
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  500+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Happy Travelers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  4.9
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Average Rating
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT IMAGE STARTS HERE */}
                    {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            {/* Hero Image */}

            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">

              <Image
                src="/images/hero-main.webp"
                alt="Luxury Himalayan Destination"
                width={900}
                height={1000}
                priority
                className="h-[650px] w-full object-cover"
              />

              {/* Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* Bottom Text */}

              <div className="absolute bottom-8 left-8 text-white">

                <p className="text-sm uppercase tracking-[4px] text-emerald-200">
                  Altitude Escapes
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Explore Beyond Limits
                </h2>

              </div>

            </div>

            {/* Floating Rating Card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -left-8 top-12 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-xl backdrop-blur-xl"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-yellow-100 p-3">

                  <Star
                    className="h-6 w-6 text-yellow-500"
                    fill="currentColor"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900">
                    4.9
                  </h3>

                  <p className="text-sm text-slate-500">
                    Trusted Rating
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Best Time */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute -right-8 top-52 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-xl backdrop-blur-xl"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-emerald-100 p-3">

                  <Mountain className="h-6 w-6 text-emerald-600" />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    Best Season
                  </h3>

                  <p className="text-sm text-slate-500">
                    Mar – Jun
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Destinations */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
              }}
              className="absolute bottom-10 -left-10 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-xl backdrop-blur-xl"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-sky-100 p-3">

                  <MapPinned className="h-6 w-6 text-sky-600" />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    15+
                  </h3>

                  <p className="text-sm text-slate-500">
                    Destinations
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Decorative Circle */}

            <div className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="absolute -bottom-20 -left-16 -z-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />

          </motion.div>

        </div>

      </div>
            {/* Bottom Decorative Shape */}

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white via-white/70 to-transparent" />

      {/* Floating Dots */}

      <div className="absolute left-12 top-24 hidden lg:block">
        <div className="grid grid-cols-4 gap-2 opacity-30">
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-emerald-400"
            />
          ))}
        </div>
      </div>

      {/* Right Decorative Ring */}

      <div className="absolute right-10 top-32 hidden lg:block">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex h-28 w-28 items-center justify-center rounded-full border border-emerald-200"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

            <Mountain className="h-8 w-8 text-emerald-600" />

          </div>
        </motion.div>

      </div>

    </section>
  );
}