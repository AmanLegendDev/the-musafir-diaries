"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Users,
  Mountain,
} from "lucide-react";

import type {
  PackageCardProps,
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

export default function PackageCard({
  packageData,
  priority = false,
}: PackageCardProps) {
  const discount =
    packageData.originalPrice > packageData.discountedPrice
      ? Math.round(
          ((packageData.originalPrice -
            packageData.discountedPrice) /
            packageData.originalPrice) *
            100
        )
      : 0;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200
        bg-white
        shadow-lg
        transition-all
        duration-300
        hover:shadow-2xl
      "
    >
      <Link
        href={`/packages/${packageData.slug}`}
        className="block"
      >
        <div className="relative h-64 overflow-hidden">
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
              src={packageData.heroImage}
              alt={packageData.name}
              fill
              priority={priority}
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Luxury Badge */}

          <div className="absolute left-5 top-5">
            <span
              className="
                rounded-full
                bg-white/90
                px-4
                py-2
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#0F4C81]
                backdrop-blur
              "
            >
              Luxury Package
            </span>
          </div>

          {/* Discount Badge */}

          {discount > 0 && (
            <div className="absolute right-5 top-5">
              <span
                className="
                  rounded-full
                  bg-emerald-500
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-white
                "
              >
                {discount}% OFF
              </span>
            </div>
          )}

          {/* Destination */}

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur-xl">
            <MapPin size={16} />

            <span className="text-sm font-medium">
              {packageData.destination.name}
            </span>
          </div>
        </div>
                <div className="space-y-6 p-6">
          {/* Package Name */}

          <div>
            <h3 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              {packageData.name}
            </h3>

            <p className="mt-3 line-clamp-2 text-[15px] leading-7 text-slate-600">
              {packageData.shortDescription}
            </p>
          </div>

          {/* Package Details */}

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Clock3 size={16} />

              <span>{packageData.duration}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Mountain size={16} />

              <span>{packageData.difficulty}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Users size={16} />

              <span>{packageData.groupSize}</span>
            </div>
          </div>

          {/* Pricing */}

          <div className="flex items-end justify-between">
            <div>
              {packageData.originalPrice >
                packageData.discountedPrice && (
                <p className="text-sm text-slate-400 line-through">
                  ₹
                  {packageData.originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </p>
              )}

              <h4 className="mt-1 text-3xl font-bold text-[#0F4C81]">
                ₹
                {packageData.discountedPrice.toLocaleString(
                  "en-IN"
                )}
              </h4>

              {packageData.originalPrice >
                packageData.discountedPrice && (
                <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Save ₹
                  {(
                    packageData.originalPrice -
                    packageData.discountedPrice
                  ).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <motion.div
              whileHover={{
                x: 4,
              }}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-[#0F4C81]
                px-5
                py-3
                font-semibold
                text-white
                transition-colors
                duration-300
                group-hover:bg-[#0B3B63]
              "
            >
              <span>View Package</span>

           
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}