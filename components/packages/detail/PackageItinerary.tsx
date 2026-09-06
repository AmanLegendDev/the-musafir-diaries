"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPinned,
} from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageItineraryProps {
  itinerary: ItineraryDay[];
}

export default function PackageItinerary({
  itinerary,
}: PackageItineraryProps) {
  if (!itinerary?.length) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <CalendarDays className="h-4 w-4" />

            Day Wise Journey

          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Travel Itinerary
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Every day is carefully planned to give you the perfect
            balance of sightseeing, adventure and relaxation.
          </p>

        </div>

        {/* Timeline */}

        <div className="relative mx-auto max-w-5xl">

          {/* Vertical Line */}

          <div className="absolute left-7 top-0 hidden h-full w-1 rounded-full bg-emerald-100 md:block" />

          <div className="space-y-10">

            {itinerary.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative flex flex-col gap-6 md:flex-row"
              >
                {/* Day Badge */}

                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-center text-white shadow-xl">

                  <div>

                    <p className="text-xs uppercase tracking-wide">
                      Day
                    </p>

                    <p className="text-xl font-bold">
                      {item.day}
                    </p>

                  </div>

                </div>

                {/* Card */}

                <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl">

                  <div className="flex items-center gap-3">

                    <MapPinned className="h-6 w-6 text-emerald-600" />

                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                  </div>

                  <p className="mt-5 leading-8 text-slate-600 whitespace-pre-line">
                    {item.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}