"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function DestinationCTA() {
  return (
    <section className="relative mt-24 overflow-hidden rounded-[40px]">

      {/* Background Image */}

      <Image
        src="/images/hero-main.webp"
        alt="Himalayan Adventure"
        fill
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-emerald-900/60" />

      {/* Decorative Blur */}

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-sky-500/20 blur-[120px]" />

      <div className="relative z-10 px-8 py-20 lg:px-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-3xl"
        >

          {/* Badge */}

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-emerald-300 backdrop-blur-xl">
            Luxury Himalayan Experiences
          </span>

          {/* Heading */}

          <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">
            Ready For Your Next
            <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Himalayan Adventure?
            </span>
          </h2>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Let our travel experts craft a personalized itinerary
            filled with breathtaking landscapes, unforgettable stays,
            and experiences you'll remember forever.
          </p>
                    {/* CTA Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/packages"
              className="
                group
                inline-flex
                items-center
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                to-teal-600
                px-8
                py-4
                font-semibold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Explore Packages

              <ArrowRight
                className="
                  ml-2
                  h-5
                  w-5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white/20
              "
            >
              <Phone className="mr-2 h-5 w-5" />

              Talk To Expert
            </Link>

          </div>

          {/* Trust Cards */}

          <div className="mt-14 grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <h3 className="text-3xl font-bold text-white">
                500+
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Happy Travelers
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <h3 className="text-3xl font-bold text-white">
                4.9★
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Average Rating
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <h3 className="text-3xl font-bold text-white">
                100%
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Customized Trips
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}