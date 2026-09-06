"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Calendar,
  MapPin,
  Mountain,
  Star,
} from "lucide-react";

export interface DestinationCardProps {
  destination: {
    _id: string;

    slug: string;

    name: string;

    heroImage: string;

    shortDescription: string;

    city: string;

    state: string;

    bestTime: string;

    altitude: string;

    duration: string;

    rating: number;

    reviewCount: number;

    featured: boolean;

    startingPrice: number;
  };
}

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <Image
          src={destination.heroImage}
          alt={destination.name}
          width={700}
          height={500}
          className="
            h-72
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Featured */}

        {destination.featured && (
          <div className="absolute left-5 top-5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">
            Featured
          </div>
        )}

        {/* Rating */}

        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur">

          <Star
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold text-slate-700">
            {destination.rating.toFixed(1)}
          </span>

        </div>

        {/* Bottom Title */}

        <div className="absolute bottom-6 left-6 right-6">

          <h3 className="text-3xl font-bold text-white">
            {destination.name}
          </h3>

          <p className="mt-2 flex items-center text-sm text-slate-200">

            <MapPin className="mr-2 h-4 w-4" />

            {destination.city}, {destination.state}

          </p>

        </div>

      </div>

      {/* Content */}

      <div className="p-7">

                {/* Description */}

        <p className="line-clamp-3 text-[15px] leading-7 text-slate-600">
          {destination.shortDescription}
        </p>

        {/* Information */}

        <div className="mt-7 grid grid-cols-2 gap-4">

          {/* Best Time */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">


            <div>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Best Time
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {destination.bestTime || "All Year"}
              </p>

            </div>

          </div>

          {/* Altitude */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

          

            <div>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Altitude
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {destination.altitude || "--"}
              </p>

            </div>

          </div>

          {/* Duration */}

          <div className="col-span-2 flex items-center justify-between rounded-2xl bg-gradient-to-r from-slate-50 to-white p-4">

            <div>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Recommended Stay
              </p>

              <h4 className="mt-1 text-lg font-semibold text-slate-900">
                {destination.duration || "Flexible"}
              </h4>

            </div>

            <div className="rounded-xl bg-emerald-50 px-4 py-2">

              <span className="text-sm font-semibold text-emerald-700">
                {destination.reviewCount}+ Reviews
              </span>

            </div>

          </div>

        </div>

        {/* Price */}

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

          <div>

            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <h3 className="mt-1 text-3xl font-bold text-emerald-700">
              ₹{destination.startingPrice.toLocaleString("en-IN")}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Per Person
            </p>

          </div>

          <div className="rounded-full bg-white px-4 py-2 shadow-sm">

            <span className="text-sm font-semibold text-slate-700">
              Premium Tours
            </span>

          </div>

        </div>
                {/* Bottom CTA */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Explore More
            </p>

            <h4 className="mt-1 font-semibold text-slate-900">
              Ready for Adventure?
            </h4>

          </div>

          <Link
            href={`/destinations/${destination.slug}`}
            className="
              group/button
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-600
              to-teal-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-emerald-300/40
            "
          >
            View Details

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover/button:translate-x-1
              "
            />
          </Link>

        </div>

      </div>

    </motion.article>
  );
}