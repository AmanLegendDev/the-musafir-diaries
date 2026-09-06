"use client";

import { motion } from "framer-motion";
import {
  Camera,
  ImageIcon,
  MapPinned,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: ImageIcon,
    value: "500+",
    label: "Travel Photos",
  },
  {
    icon: MapPinned,
    value: "25+",
    label: "Destinations",
  },
  {
    icon: Users,
    value: "1,000+",
    label: "Happy Travelers",
  },
  {
    icon: Camera,
    value: "8+",
    label: "Years Experience",
  },
];

export default function GalleryStats() {
  return (
    <section className="-mt-20 relative z-20 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
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
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-[30px] border border-white/30 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all"
              >

                <div className="inline-flex rounded-2xl bg-emerald-100 p-4 transition group-hover:bg-emerald-600">

                  <Icon className="h-7 w-7 text-emerald-600 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 text-5xl font-bold text-slate-900">

                  {stat.value}

                </h3>

                <p className="mt-3 text-lg text-slate-600">

                  {stat.label}

                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}