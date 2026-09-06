"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";

import type {
  DestinationCardProps,
} from "./types";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DestinationCard({
  destination,
  priority = false,
  large = false,
}: DestinationCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-slate-200/70
        bg-white
        shadow-[0_18px_55px_rgba(15,23,42,.08)]
      "
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="block"
      >
        <div
          className={`
            relative
            overflow-hidden

            ${
              large
                ? "h-[430px]"
                : "h-[430px]"
            }
          `}
        >
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.7,
            }}
            className="absolute inset-0"
          >
            <Image
              src={destination.heroImage}
              alt={destination.name}
              fill
              priority={priority}
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-xl">
              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-sm font-semibold text-white">
                {destination.rating.toFixed(1)}
              </span>

              <span className="text-xs text-white/80">
                ({destination.reviewCount})
              </span>
            </div>

            <div className="rounded-full bg-white px-4 py-2 shadow-lg">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Starting From
              </p>

              <h4 className="mt-1 text-lg font-bold text-[#0F4C81]">
                ₹{destination.startingPrice.toLocaleString("en-IN")}
              </h4>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.3,
              }}
              className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center gap-2 text-white/90">
                <MapPin size={16} />

                <span className="text-sm font-medium">
                  {destination.state}
                </span>
              </div>

              <h3 className="font-heading text-3xl font-bold tracking-tight text-white">
                {destination.name}
              </h3>

              <p className="mt-4 line-clamp-2 text-[15px] leading-7 text-white/80">
                {destination.shortDescription}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/90">
                  <Clock3 size={17} />

                  <span className="text-sm font-medium">
                    {destination.duration}
                  </span>
                </div>

                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  className="flex items-center gap-2 font-semibold text-white"
                >
                  <span>Explore</span>

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}