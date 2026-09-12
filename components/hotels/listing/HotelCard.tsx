"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import type { HotelListItem } from "./HotelGrid";

type Props = {
  hotel: HotelListItem;
  index: number;
  view?: "grid" | "list";
};

const HOTEL_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  resort: "Resort",
  boutique: "Boutique",
  homestay: "Homestay",
  villa: "Villa",
  guesthouse: "Guesthouse",
  camp: "Camp",
  other: "Stay",
};

function Stars({
  rating,
  small = false,
}: {
  rating: number;
  small?: boolean;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${small ? "h-3 w-3" : "h-3.5 w-3.5"} ${
            index < rating
              ? "fill-[#F59E0B] text-[#F59E0B]"
              : "text-[#071A33]/15"
          }`}
        />
      ))}
    </div>
  );
}

function Location({
  hotel,
}: {
  hotel: HotelListItem;
}) {
  const location = [hotel.area, hotel.city]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex items-center gap-1.5 text-xs text-[#071A33]/50">
      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#087E8B]" />
      <span className="truncate">
        {location || "Himachal Pradesh"}
      </span>
    </div>
  );
}

export default function HotelCard({
  hotel,
  index,
  view = "grid",
}: Props) {
  const typeLabel =
    HOTEL_TYPE_LABELS[hotel.hotelType] || "Stay";

  const hasGuestRating =
    hotel.guestRating !== null &&
    hotel.guestRating > 0 &&
    hotel.reviewCount > 0;

  const amenities = hotel.amenities?.slice(0, 3) || [];

  if (view === "list") {
    return (
      <article className="group overflow-hidden rounded-3xl border border-[#071A33]/8 bg-white transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(7,26,51,0.10)]">
        <div className="grid md:grid-cols-[280px_1fr]">
          {/* Image */}
          <Link
            href={`/hotels/${hotel.slug}`}
            className="relative block min-h-[250px] overflow-hidden"
          >
            <img
              src={hotel.heroImage}
              alt={hotel.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading={index < 2 ? "eager" : "lazy"}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/55 via-transparent to-transparent" />

            {hotel.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-[#F59E0B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]">
                Featured
              </span>
            )}
          </Link>

          {/* Content */}
          <div className="flex flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#087E8B]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087E8B]">
                  {typeLabel}
                </span>

                <Stars rating={hotel.starRating} />

                {hasGuestRating && (
                  <span className="text-xs font-semibold text-[#071A33]">
                    {hotel.guestRating?.toFixed(1)}
                    <span className="ml-1 font-normal text-[#071A33]/40">
                      ({hotel.reviewCount})
                    </span>
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[#071A33]">
                {hotel.name}
              </h3>

              <div className="mt-2">
                <Location hotel={hotel} />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#071A33]/60">
                {hotel.shortDescription}
              </p>

              {amenities.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#071A33]/8 px-3 py-1.5 text-[11px] font-medium text-[#071A33]/60"
                    >
                      <Check className="h-3 w-3 text-[#087E8B]" />
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[#071A33]/8 pt-5">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#071A33]/35">
                Discover this stay
              </span>

              <Link
                href={`/hotels/${hotel.slug}`}
                className="group/link flex items-center gap-2 text-sm font-semibold text-[#071A33]"
              >
                View stay
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071A33] text-white transition group-hover/link:bg-[#087E8B]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link
        href={`/hotels/${hotel.slug}`}
        className="block overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(7,26,51,0.12)]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.heroImage}
            alt={hotel.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading={index < 3 ? "eager" : "lazy"}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/65 via-transparent to-transparent opacity-90" />

          {/* Top badges */}
          <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#071A33] backdrop-blur-sm">
              {typeLabel}
            </span>

            {hotel.featured && (
              <span className="rounded-full bg-[#F59E0B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#071A33]">
                Featured
              </span>
            )}
          </div>

          {/* Bottom image info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <Location hotel={hotel} />

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#071A33] shadow-lg transition duration-300 group-hover:bg-[#087E8B] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <Stars rating={hotel.starRating} />

            {hasGuestRating ? (
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />

                <span className="text-xs font-bold text-[#071A33]">
                  {hotel.guestRating?.toFixed(1)}
                </span>

                <span className="text-[10px] text-[#071A33]/35">
                  {hotel.reviewCount} reviews
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#071A33]/30">
                {hotel.starRating}-star stay
              </span>
            )}
          </div>

          <h3 className="mt-4 line-clamp-1 text-xl font-semibold tracking-[-0.02em] text-[#071A33]">
            {hotel.name}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-5 text-[#071A33]/55">
            {hotel.shortDescription}
          </p>

          {amenities.length > 0 && (
            <div className="mt-5 flex items-center gap-2 border-t border-[#071A33]/8 pt-4">
              <BedDouble className="h-4 w-4 shrink-0 text-[#087E8B]" />

              <span className="truncate text-xs text-[#071A33]/45">
                {amenities.join(" · ")}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}