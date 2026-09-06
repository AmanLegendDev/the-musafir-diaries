"use client";

import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Mountain,
  Users,
  Star,
  Tag,
  ArrowRight,
  Share2,
} from "lucide-react";

interface PackageHeaderProps {
  name: string;
  destination: string;
  category: string;
  duration: string;
  difficulty: string;
  groupSize: string;
  rating?: number;
  reviewCount?: number;
  originalPrice: number;
  discountedPrice: number;
}

export default function PackageHeader({
  name,
  destination,
  category,
  duration,
  difficulty,
  groupSize,
  rating = 4.9,
  reviewCount = 124,
  originalPrice,
  discountedPrice,
}: PackageHeaderProps) {
  const discount =
    originalPrice > 0
      ? Math.round(
          ((originalPrice - discountedPrice) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container mx-auto px-6 py-10">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}

          <div className="max-w-3xl">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                {category}
              </span>

              {discount > 0 && (
                <span className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
                  {discount}% OFF
                </span>
              )}

            </div>

            <h1 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
              {name}
            </h1>

            {/* Rating */}

            <div className="mt-5 flex flex-wrap items-center gap-6">

              <div className="flex items-center gap-2">

                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span className="font-semibold">
                  {rating}
                </span>

                <span className="text-slate-500">
                  ({reviewCount} Reviews)
                </span>

              </div>

              <div className="flex items-center gap-2 text-slate-600">

                <MapPin className="h-5 w-5 text-emerald-600" />

                {destination}

              </div>

            </div>

            {/* Package Info */}

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

                <CalendarDays className="h-5 w-5 text-emerald-600" />

                <span>{duration}</span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

                <Mountain className="h-5 w-5 text-emerald-600" />

                <span>{difficulty}</span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

                <Users className="h-5 w-5 text-emerald-600" />

                <span>{groupSize}</span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-8 lg:max-w-sm">

            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <div className="mt-3 flex items-end gap-3">

              <span className="text-4xl font-bold text-emerald-700">
                ₹{discountedPrice.toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <span className="pb-1 text-lg text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}

            </div>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

              <Tag className="h-4 w-4" />

              Save ₹
              {(originalPrice - discountedPrice).toLocaleString(
                "en-IN"
              )}

            </div>

            <div className="mt-8 space-y-3">

              <Link
                href="/booking"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Book This Package

                <ArrowRight className="h-5 w-5" />
              </Link>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600"
              >
                <Share2 className="h-5 w-5" />

                Share Package
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}