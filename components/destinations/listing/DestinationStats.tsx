"use client";

import { motion } from "framer-motion";
import { Mountain, MapPinned, Sparkles } from "lucide-react";

import type { Destination } from "@/lib/types/destination";

interface DestinationStatsProps {
  destinations: Destination[];
}

export default function DestinationStats({
  destinations,
}: DestinationStatsProps) {
  const activeDestinations = destinations.length;

  const states = new Set(
    destinations
      .map((destination) => destination.state?.trim())
      .filter(Boolean)
  ).size;

  const featured = destinations.filter(
    (destination) => destination.featured
  ).length;

  const stats = [
    {
      icon: Mountain,
      value: activeDestinations,
      label: "Destinations",
    },
    {
      icon: MapPinned,
      value: states,
      label: "Mountain Regions",
    },
    {
      icon: Sparkles,
      value: featured,
      label: "Featured Journeys",
    },
  ];

  return (
    <section className="border-b border-[#071A33]/10 bg-[#FAF9F5]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-[#071A33]/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10 lg:px-16 xl:px-20">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="flex items-center gap-4 px-0 py-7 sm:px-7 lg:px-10"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071A33]">
                <Icon className="h-4 w-4 text-[#F59E0B]" />
              </div>

              <div>
                <div className="text-2xl font-semibold tracking-tight text-[#071A33]">
                  {stat.value}
                </div>

                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}