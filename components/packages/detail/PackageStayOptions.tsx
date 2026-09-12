import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  MapPin,
  Star,
} from "lucide-react";

import type { IHotel } from "@/models/hotel.model";

interface PackageStayOptionsProps {
  hotels: unknown[];
  destinationName: string;
}

function getHotel(hotel: unknown): IHotel {
  return hotel as IHotel;
}

export default function PackageStayOptions({
  hotels,
  destinationName,
}: PackageStayOptionsProps) {
  if (!hotels?.length) {
    return null;
  }

  return (
    <section
      id="stay"
      className="scroll-mt-24 bg-[#FAF9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#1597C7]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                Stay beautifully
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-6xl">
              Places to come home to.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              Stay options available around{" "}
              {destinationName || "your destination"}.
              Your final accommodation can be confirmed
              according to availability and your preferences.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/30">
            <BedDouble
              className="h-4 w-4 text-[#087E8B]"
              strokeWidth={1.6}
            />
            Curated stays
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((rawHotel, index) => {
            const hotel = getHotel(rawHotel);

            const hotelId = hotel._id?.toString();

            const image =
              hotel.heroImage ||
              hotel.gallery?.[0] ||
              "";

            const rating =
              typeof hotel.guestRating === "number" &&
              hotel.guestRating > 0
                ? hotel.guestRating
                : null;

            const reviewCount =
              typeof hotel.reviewCount === "number"
                ? hotel.reviewCount
                : 0;

            return (
              <article
                key={hotelId || `${hotel.name}-${index}`}
                className="group overflow-hidden rounded-[28px] border border-[#071A33]/8 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0D2747]">
                  {image ? (
                    <Image
                      src={image}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0D2747]" />
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33]/70 via-transparent to-transparent"
                  />

                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-[#071A33]/35 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/75 backdrop-blur-md">
                      {hotel.hotelType || "Stay"}
                    </span>

                    {hotel.featured && (
                      <span className="rounded-full bg-[#F59E0B] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#071A33]">
                        Featured
                      </span>
                    )}
                  </div>

                  {rating !== null && (
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-[#071A33]/40 px-3 py-2 backdrop-blur-md">
                      <Star
                        className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
                        strokeWidth={1.5}
                      />

                      <span className="text-[10px] font-semibold text-white">
                        {rating.toFixed(1)}
                      </span>

                      {reviewCount > 0 && (
                        <span className="text-[9px] text-white/45">
                          ({reviewCount})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-medium leading-tight text-[#071A33]">
                        {hotel.name}
                      </h3>

                      {hotel.area && (
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#071A33]/40">
                          <MapPin
                            className="h-3 w-3 text-[#087E8B]"
                            strokeWidth={1.6}
                          />
                          {hotel.area}
                        </div>
                      )}
                    </div>

                    {hotel.starRating > 0 && (
                      <span className="shrink-0 text-[10px] font-semibold text-[#071A33]/40">
                        {hotel.starRating}★
                      </span>
                    )}
                  </div>

                  {hotel.shortDescription && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#071A33]/50">
                      {hotel.shortDescription}
                    </p>
                  )}

                  {hotelId && (
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="group/link mt-6 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]"
                    >
                      View stay

                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        strokeWidth={1.7}
                      />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}