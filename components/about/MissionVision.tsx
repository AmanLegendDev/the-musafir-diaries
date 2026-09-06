"use client";

import { motion } from "framer-motion";
import { Compass, Eye } from "lucide-react";

const cards = [
  {
    icon: Compass,
    title: "Our Mission",
    color: "from-emerald-500 to-teal-500",
    content:
      "Our mission is to redefine Himalayan travel by creating journeys that combine authentic local experiences, exceptional hospitality, luxury accommodations, and carefully crafted itineraries. We believe every traveler deserves more than a holiday—they deserve unforgettable moments that inspire, connect, and leave lasting memories.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    color: "from-cyan-500 to-sky-500",
    content:
      "We aspire to become one of India's most trusted luxury travel brands, recognized for delivering meaningful adventures, sustainable tourism, and world-class service. Our vision is to inspire people to discover the Himalayas responsibly while supporting local communities and preserving the natural beauty that makes every destination extraordinary.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Mission & Vision

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Guided By Purpose,
            <span className="text-emerald-600">

              {" "}Driven By Excellence

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Every decision we make is inspired by our commitment to creating
            extraordinary travel experiences while building lasting trust with
            every traveler who chooses Altitude Escapes.

          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-10 shadow-lg transition-all hover:shadow-2xl"
              >

                <div
                  className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${card.color}`}
                />

                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color}`}
                >

                  <Icon className="h-8 w-8 text-white" />

                </div>

                <h3 className="mt-8 text-3xl font-bold text-slate-900">

                  {card.title}

                </h3>

                <p className="mt-6 text-lg leading-9 text-slate-600">

                  {card.content}

                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}