"use client";

import { motion } from "framer-motion";
import {
  Users,
  Mountain,
  MapPinned,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "5,000+",
    title: "Happy Travelers",
    description:
      "Travelers who trusted us for unforgettable Himalayan experiences.",
  },
  {
    icon: Mountain,
    number: "120+",
    title: "Curated Tours",
    description:
      "Luxury itineraries designed for every kind of explorer.",
  },
  {
    icon: MapPinned,
    number: "25+",
    title: "Destinations",
    description:
      "Beautiful Himalayan destinations waiting to be explored.",
  },
  {
    icon: Star,
    number: "4.9★",
    title: "Guest Rating",
    description:
      "Consistently rated for exceptional service and memorable journeys.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-black py-28">

      {/* Background Glow */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">

            Our Impact

          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

            Numbers That Reflect
            <span className="text-emerald-400">
              {" "}Our Journey
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">

            Behind every number is a traveler, a story, and an unforgettable
            Himalayan adventure. These milestones inspire us to keep delivering
            exceptional experiences.

          </p>

        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">

                  <Icon className="h-8 w-8 text-emerald-400" />

                </div>

                <h3 className="mt-8 text-5xl font-bold text-white">

                  {item.number}

                </h3>

                <h4 className="mt-3 text-xl font-semibold text-white">

                  {item.title}

                </h4>

                <p className="mt-4 leading-7 text-slate-300">

                  {item.description}

                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}