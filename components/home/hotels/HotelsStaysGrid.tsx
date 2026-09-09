"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

export interface HomeHotel {
  _id: string;
  name: string;
  slug: string;

  destination?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;

  area?: string;
  city?: string;
  state?: string;

  starRating: number;
  hotelType:
    | "hotel"
    | "resort"
    | "boutique"
    | "homestay"
    | "villa"
    | "guesthouse"
    | "camp"
    | "other";

  shortDescription?: string;
  description?: string;

  heroImage: string;
  gallery?: string[];

  amenities?: string[];

  guestRating?: number | null;
  reviewCount: number;

  featured: boolean;
  displayOrder: number;
  status: "active" | "draft";
}

interface HotelsStaysGridProps {
  hotels: HomeHotel[];
}

const formatHotelType = (type: HomeHotel["hotelType"]) => {
  const labels: Record<HomeHotel["hotelType"], string> = {
    hotel: "Hotel",
    resort: "Resort",
    boutique: "Boutique",
    homestay: "Homestay",
    villa: "Villa",
    guesthouse: "Guesthouse",
    camp: "Camp",
    other: "Stay",
  };

  return labels[type];
};

function HotelMeta({ hotel }: { hotel: HomeHotel }) {
  const destinationName =
    hotel.destination?.name || hotel.city || hotel.state;

  const hasGuestRating =
    typeof hotel.guestRating === "number" &&
    hotel.guestRating > 0 &&
    hotel.reviewCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      {destinationName && (
        <span className="inline-flex items-center gap-1.5 text-white/75">
          <MapPin size={13} strokeWidth={1.8} />
          {destinationName}
        </span>
      )}

      <span className="text-white/40">•</span>

      <span className="text-white/75">
        {formatHotelType(hotel.hotelType)}
      </span>

      {hotel.starRating > 0 && (
        <>
          <span className="text-white/40">•</span>

          <span className="inline-flex items-center gap-1 text-white/80">
            <Star
              size={12}
              fill="currentColor"
              strokeWidth={1.5}
            />
            {hotel.starRating}
          </span>
        </>
      )}

      {hasGuestRating && (
        <>
          <span className="text-white/40">•</span>

          <span className="text-white/80">
            {hotel.guestRating?.toFixed(1)} · {hotel.reviewCount} reviews
          </span>
        </>
      )}
    </div>
  );
}

function FeaturedHotelCard({
  hotel,
}: {
  hotel: HomeHotel;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[520px] overflow-hidden bg-[#071A33] sm:min-h-[580px] lg:min-h-[650px]"
    >
      <Link
        href={`/hotels/${hotel.slug}`}
        className="absolute inset-0"
        aria-label={`View ${hotel.name}`}
      >
        {/* Image */}
        <Image
          src={hotel.heroImage}
          alt={`${hotel.name} - ${hotel.destination?.name || hotel.city || "Himachal Pradesh"}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/25 to-transparent" />

        <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15" />

        {/* Top label */}
        <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
          <span className="inline-flex items-center gap-2 border border-white/25 bg-[#071A33]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Featured Stay
          </span>
        </div>

        {/* Number */}
        <span className="absolute right-6 top-6 font-serif text-5xl font-light text-white/25 sm:right-8 sm:top-7">
          01
        </span>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <HotelMeta hotel={hotel} />

          <h3 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            {hotel.name}
          </h3>

          {hotel.shortDescription && (
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              {hotel.shortDescription}
            </p>
          )}

          <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              View stay
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#071A33]">
              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function SecondaryHotelCard({
  hotel,
  number,
}: {
  hotel: HomeHotel;
  number: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden bg-[#071A33]"
    >
      <Link
        href={`/hotels/${hotel.slug}`}
        className="block"
        aria-label={`View ${hotel.name}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1]">
          <Image
            src={hotel.heroImage}
            alt={`${hotel.name} - ${hotel.destination?.name || hotel.city || "Himachal Pradesh"}`}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />

          <span className="absolute right-5 top-5 font-serif text-3xl font-light text-white/35">
            {number}
          </span>

          <div className="absolute bottom-4 left-5">
            <span className="border border-white/25 bg-[#071A33]/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {formatHotelType(hotel.hotelType)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="border border-t-0 border-[#071A33]/10 bg-white px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              {hotel.destination?.name || hotel.city ? (
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087E8B]">
                  <MapPin size={11} />
                  {hotel.destination?.name || hotel.city}
                </p>
              ) : null}

              <h3 className="font-serif text-2xl font-medium tracking-[-0.02em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-3xl">
                {hotel.name}
              </h3>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#071A33]/15 text-[#071A33] transition-all duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B] group-hover:text-white">
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>

          {hotel.shortDescription && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#071A33]/60">
              {hotel.shortDescription}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#071A33]/10 pt-4 text-xs text-[#071A33]/55">
            {hotel.starRating > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star
                  size={12}
                  fill="currentColor"
                  className="text-[#F59E0B]"
                />
                {hotel.starRating}
              </span>
            )}

            {typeof hotel.guestRating === "number" &&
              hotel.guestRating > 0 &&
              hotel.reviewCount > 0 && (
                <>
                  <span>•</span>
                  <span>
                    {hotel.guestRating.toFixed(1)} ({hotel.reviewCount})
                  </span>
                </>
              )}

            {hotel.area && (
              <>
                <span>•</span>
                <span>{hotel.area}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function HotelsStaysGrid({
  hotels,
}: HotelsStaysGridProps) {
  const visibleHotels = hotels
    .filter(
      (hotel) => hotel.status === "active" && hotel.featured
    )
    .sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, 3);

  if (visibleHotels.length === 0) return null;

  const featuredHotel = visibleHotels[0];
  const secondaryHotels = visibleHotels.slice(1);

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Featured hotel */}
      <div className="lg:col-span-7">
        <FeaturedHotelCard hotel={featuredHotel} />
      </div>

      {/* Secondary hotels */}
      {secondaryHotels.length > 0 && (
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
          {secondaryHotels.map((hotel, index) => (
            <SecondaryHotelCard
              key={hotel._id}
              hotel={hotel}
              number={`0${index + 2}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}