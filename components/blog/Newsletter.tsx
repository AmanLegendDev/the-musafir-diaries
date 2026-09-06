"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-10 md:p-16"
        >
          {/* Background Blur */}

          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Join Our Travel Community
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                Get Luxury Travel Tips,
                <br />
                Hidden Gems & Exclusive Offers
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50">
                Receive destination guides, travel inspiration, seasonal deals,
                and insider recommendations directly in your inbox.
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-emerald-100">
                <span>✓ Weekly Travel Guides</span>
                <span>✓ Exclusive Offers</span>
                <span>✓ No Spam</span>
              </div>
            </div>

            {/* Right */}

            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Subscribe Now
                  </h3>

                  <p className="text-sm text-emerald-100">
                    Stay inspired wherever you travel.
                  </p>
                </div>
              </div>

              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-white placeholder:text-emerald-100 outline-none transition focus:border-white"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Subscribe

                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-emerald-100">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}