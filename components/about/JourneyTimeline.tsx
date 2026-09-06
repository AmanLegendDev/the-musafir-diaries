"use client";

import { motion } from "framer-motion";
import {
  Flag,
  Users,
  Mountain,
  Award,
  Globe,
} from "lucide-react";

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    icon: Flag,
    description:
      "Altitude Escapes started with a simple dream — helping travelers experience the Himalayas beyond ordinary sightseeing.",
  },
  {
    year: "2020",
    title: "Growing Community",
    icon: Users,
    description:
      "Hundreds of happy travelers trusted us, allowing us to expand our destinations and personalized travel services.",
  },
  {
    year: "2022",
    title: "Luxury Experiences",
    icon: Mountain,
    description:
      "We introduced curated premium stays, customized itineraries, and exclusive Himalayan experiences.",
  },
  {
    year: "2024",
    title: "Trusted Travel Brand",
    icon: Award,
    description:
      "Altitude Escapes became known for quality service, transparent pricing, and unforgettable mountain adventures.",
  },
  {
    year: "Future",
    title: "Our Journey Continues",
    icon: Globe,
    description:
      "Our vision is to inspire more travelers while promoting sustainable tourism and supporting local Himalayan communities.",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="bg-slate-50 py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            Our Journey
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Milestones That
            <span className="text-emerald-600">
              {" "}Shaped Our Story
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Every step reflects our commitment to creating memorable
            Himalayan travel experiences with trust, comfort, and excellence.

          </p>

        </div>

        <div className="relative mt-24">

          {/* Center Line */}

          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 rounded-full bg-emerald-200 lg:block" />

          <div className="space-y-16">

            {timeline.map((item, index) => {
              const Icon = item.icon;
              const left = index % 2 === 0;

              return (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex ${
                    left ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >

                  <div className="w-full lg:w-[45%]">

                    <div className="rounded-[30px] bg-white p-8 shadow-lg border border-slate-200">

                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                          <Icon className="h-7 w-7 text-emerald-600" />

                        </div>

                        <div>

                          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">

                            {item.year}

                          </span>

                          <h3 className="text-2xl font-bold text-slate-900">

                            {item.title}

                          </h3>

                        </div>

                      </div>

                      <p className="mt-6 leading-8 text-slate-600">

                        {item.description}

                      </p>

                    </div>

                  </div>

                  <div className="absolute left-1/2 top-10 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-emerald-500 lg:block" />

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}