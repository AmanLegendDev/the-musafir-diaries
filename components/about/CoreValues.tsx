"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Sparkles,
  Users,
  Compass,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We believe lasting relationships begin with honesty, clear communication, and transparent pricing.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every journey is designed around your comfort, preferences, and unforgettable travel experiences.",
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description:
      "We promote responsible travel that respects nature, local traditions, and Himalayan communities.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "From planning to your final destination, we strive to deliver exceptional quality at every step.",
  },
  {
    icon: Users,
    title: "Authentic Hospitality",
    description:
      "We work with trusted local partners to provide genuine experiences and warm hospitality.",
  },
  {
    icon: Compass,
    title: "Passion For Exploration",
    description:
      "Our love for the Himalayas inspires us to create journeys that go beyond ordinary tourism.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            Our Core Values
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            The Principles That
            <span className="text-emerald-600">
              {" "}Guide Every Journey
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            These values shape every itinerary, every partnership, and every
            experience we create, ensuring each traveler enjoys a journey built
            on trust, care, and excellence.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-[30px] border border-slate-200 bg-slate-50 p-8 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon className="h-8 w-8 text-emerald-600 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {value.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}