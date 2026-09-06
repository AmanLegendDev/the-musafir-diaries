"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24">

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, scale: .96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0F4C81] via-[#17669B] to-[#3BAEA0] px-10 py-16 text-center text-white shadow-[0_30px_80px_rgba(15,76,129,.25)]"
        >

          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Luxury Himalayan Travel
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
            Your Next Adventure Begins Here
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Reserve your journey today and experience breathtaking landscapes,
            luxury stays and unforgettable memories with Altitude Escapes.
          </p>

          <Link
            href="/packages"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-[#0F4C81] transition hover:scale-105"
          >
            Explore Packages

            <ArrowRight size={18} />

          </Link>

        </motion.div>

      </div>

    </section>
  );
}