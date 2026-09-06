"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock3,
  MapPinned,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-black" />

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

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
            duration: .6,
          }}
          className="overflow-hidden rounded-[40px] border border-white/10 bg-white/10 p-10 backdrop-blur-2xl lg:p-16"
        >

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300">

              Start Your Adventure

            </span>

            <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">

              Your Dream Himalayan Journey
              <span className="text-emerald-400">

                {" "}Starts Here

              </span>

            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-300">

              Whether you're planning a peaceful mountain escape,
              an adventurous road trip, a romantic honeymoon,
              or a luxury family vacation, our travel experts are
              ready to create a personalized experience crafted
              exclusively for you.

            </p>

            {/* Feature Highlights */}

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <ShieldCheck className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  Trusted Travel

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Verified stays, safe journeys, and transparent pricing.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <Clock3 className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  24/7 Support

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Dedicated assistance before, during, and after your trip.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <MapPinned className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  Tailor-Made Trips

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Every itinerary is personalized to match your travel style.

                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-14 flex flex-wrap justify-center gap-5">

              <Link
                href="/packages"
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >

                Explore Packages

                <ArrowRight className="h-5 w-5" />

              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >

                <Phone className="h-5 w-5" />

                Contact Our Experts

              </Link>

            </div>

            <p className="mt-10 text-sm text-slate-400">

              Trusted by thousands of travelers • Luxury Experiences • Personalized Service

            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}