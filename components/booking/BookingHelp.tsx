"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

export default function BookingHelp() {
  return (
    <section className="bg-[#F8FAFC] py-24">

      <div className="mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0F4C81] to-[#3BAEA0] p-10 text-white shadow-2xl md:p-14"
        >

          <p className="text-sm uppercase tracking-[0.25em] text-white/70">
            Need Assistance?
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Talk To A Travel Expert
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-white/85">
            Not sure which package is right for you? Our travel specialists
            are here to help you plan the perfect Himalayan journey.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="tel:+919999999999"
              className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-[#0F4C81] transition hover:scale-105"
            >
              <Phone size={18} />
              Call Us
            </Link>

            <Link
              href="https://wa.me/919999999999"
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold backdrop-blur-lg transition hover:bg-white/20"
            >
              <MessageCircle size={18} />
              WhatsApp
            </Link>

            <Link
              href="mailto:info@altitudeescapes.com"
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold backdrop-blur-lg transition hover:bg-white/20"
            >
              <Mail size={18} />
              Email
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}