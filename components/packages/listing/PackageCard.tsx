"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Clock3,
  MapPin,
  Star,
  Tag,
} from "lucide-react";

interface PackageCardProps {
  packageData: {
    _id: string;

    name: string;

    slug: string;

    shortDescription: string;

    heroImage: string;

    duration: string;

    difficulty: string;

    groupSize: string;

    originalPrice: number;

    discountedPrice: number;

    featured: boolean;

    destination: {
      name: string;
      state: string;
    };

    category: {
      name: string;
    };
  };
}

export default function PackageCard({
  packageData,
}: PackageCardProps) {
  const discount =
    packageData.originalPrice > 0
      ? Math.round(
          ((packageData.originalPrice -
            packageData.discountedPrice) /
            packageData.originalPrice) *
            100
        )
      : 0;

  const savings =
    packageData.originalPrice -
    packageData.discountedPrice;

  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl"
    >
      {/* Image */}

      <div className="relative h-72 overflow-hidden">

        <Image
          src={packageData.heroImage}
          alt={packageData.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Featured */}

        {packageData.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Featured
          </span>
        )}

        {/* Discount */}

        {discount > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {discount}% OFF
          </span>
        )}

        {/* Category */}

        <div className="absolute bottom-4 left-4">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-800 backdrop-blur">

            <Tag className="h-4 w-4 text-emerald-600" />

            {packageData.category.name}

          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Destination */}

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <MapPin className="h-4 w-4 text-emerald-600" />

          <span>

            {packageData.destination.name},{" "}
            {packageData.destination.state}

          </span>

        </div>

        {/* Title */}

        <Link
          href={`/packages/${packageData.slug}`}
          className="mt-3 block"
        >
          <h3 className="line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-emerald-600">

            {packageData.name}

          </h3>
        </Link>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">

          {packageData.shortDescription}

        </p>

        {/* Meta Info */}

        <div className="mt-6 flex flex-wrap items-center gap-3">

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">

            <Clock3 className="h-4 w-4 text-emerald-600" />

            {packageData.duration}

          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700">

            <Star className="h-4 w-4 fill-current" />

            {packageData.difficulty}

          </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5V4H2v16h5m10 0v-6a3 3 0 00-6 0v6m6 0H7"
              />
            </svg>

            {packageData.groupSize}

          </div>

        </div>

        {/* Pricing */}

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Starting From
              </p>

              <div className="mt-2 flex items-center gap-3">

                <span className="text-3xl font-extrabold text-emerald-700">

                  ₹
                  {packageData.discountedPrice.toLocaleString(
                    "en-IN"
                  )}

                </span>

                {discount > 0 && (
                  <span className="text-lg text-slate-400 line-through">

                    ₹
                    {packageData.originalPrice.toLocaleString(
                      "en-IN"
                    )}

                  </span>
                )}

              </div>

            </div>

            {discount > 0 && (
  <div
    className="
      mt-4
      w-full
      rounded-xl
      bg-white
      px-4
      py-2
      text-center
      shadow
      sm:mt-0
      sm:w-auto
      sm:text-right
    "
  >

                <p className="text-xs text-slate-500">
                  You Save
                </p>

                <p className="font-bold text-emerald-600">

                  ₹
                  {savings.toLocaleString("en-IN")}

                </p>

              </div>
            )}

          </div>

        </div>

        {/* CTA */}

        <div className="mt-8 flex gap-3">

          <Link
            href={`/packages/${packageData.slug}`}
            className="flex-1 rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
          >
            View Details
          </Link>

          <Link
            href={`/contact?package=${packageData.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Book Now

            <ArrowRight className="h-4 w-4" />

          </Link>

        </div>

      </div>

    </motion.article>
  );
}