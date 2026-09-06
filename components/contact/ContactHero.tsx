"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MapPin, Mail } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900" />

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Badge */}

          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300">

            Contact Altitude Escapes

          </span>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-bold leading-tight text-white md:text-7xl">

            Let's Plan Your

            <span className="block text-emerald-400">

              Perfect Journey

            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">

            Whether you're planning a luxury getaway, an adventurous
            Himalayan road trip, or a customized holiday, our travel
            experts are here to help you create unforgettable memories.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/packages"
              className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore Packages

              <ArrowRight className="h-5 w-5" />

            </Link>

            <a
              href="tel:+919999999999"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <PhoneCall className="h-5 w-5" />

              Call Us

            </a>

          </div>

          {/* Quick Contact */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

              <PhoneCall className="mx-auto h-8 w-8 text-emerald-400" />

              <h3 className="mt-4 text-lg font-semibold text-white">

                Call Anytime

              </h3>

              <p className="mt-2 text-slate-300">

                +91 98765 43210

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

              <Mail className="mx-auto h-8 w-8 text-emerald-400" />

              <h3 className="mt-4 text-lg font-semibold text-white">

                Email Us

              </h3>

              <p className="mt-2 text-slate-300 break-all">

                hello@altitudeescapes.com

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

              <MapPin className="mx-auto h-8 w-8 text-emerald-400" />

              <h3 className="mt-4 text-lg font-semibold text-white">

                Office

              </h3>

              <p className="mt-2 text-slate-300">

                Shimla, Himachal Pradesh

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}