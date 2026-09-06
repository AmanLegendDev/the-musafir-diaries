"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Clock3,
  MessageCircle,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-black" />

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[40px] border border-white/10 bg-white/10 p-10 backdrop-blur-2xl lg:p-16"
        >

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300">

              <Sparkles className="h-4 w-4" />

              Start Your Journey Today

            </span>

            <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">

              Ready To Explore The

              <span className="block text-emerald-400">

                Himalayas With Us?

              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300">

              Your next unforgettable adventure begins with a simple
              conversation. Let our travel experts craft a personalized
              itinerary designed around your dreams, budget, and travel
              style.

            </p>

            {/* Trust */}

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <ShieldCheck className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  Trusted Service

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Thousands of happy travelers trust Altitude Escapes.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <Clock3 className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  Fast Response

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Most travel inquiries are answered within 30–60 minutes.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <MessageCircle className="mx-auto h-10 w-10 text-emerald-400" />

                <h3 className="mt-4 font-semibold text-white">

                  Personalized Planning

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Every itinerary is tailored specifically for your trip.

                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-14 flex flex-wrap justify-center gap-5">

              <Link
                href="/booking"
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Book Your Trip

                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <PhoneCall className="h-5 w-5" />

                Call Now
              </a>

            </div>

            {/* Bottom */}

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400">

              <span>✓ 5000+ Happy Travelers</span>

              <span>✓ 4.9★ Guest Rating</span>

              <span>✓ Personalized Experiences</span>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}