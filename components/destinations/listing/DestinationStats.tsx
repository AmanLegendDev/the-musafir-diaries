"use client";

import { motion } from "framer-motion";
import {
  MapPinned,
  Users,
  Star,
  Compass,
} from "lucide-react";

const stats = [
  {
    icon: MapPinned,
    value: "15+",
    title: "Destinations",
    description: "Handpicked Himalayan Locations",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Users,
    value: "500+",
    title: "Happy Travelers",
    description: "Trusted by Adventure Lovers",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Star,
    value: "4.9",
    title: "Average Rating",
    description: "Exceptional Customer Reviews",
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    icon: Compass,
    value: "100%",
    title: "Customized Trips",
    description: "Designed Around Your Journey",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function DestinationStats() {
  return (
    <section className="py-14">

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-sm
                transition-all
                duration-300
                hover:border-emerald-200
                hover:shadow-xl
              "
            >

              <div
                className={`
                  inline-flex
                  rounded-2xl
                  p-4
                  ${stat.color}
                `}
              >
                <Icon className="h-7 w-7" />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <h3 className="mt-2 text-lg font-semibold text-slate-800">
                {stat.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {stat.description}
              </p>

              <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full" />

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}