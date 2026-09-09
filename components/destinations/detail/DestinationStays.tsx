import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

import type { IHotel } from "@/models/hotel.model";

interface DestinationStaysProps {
  hotels: IHotel[];
  destinationName: string;
}

export default function DestinationStays({
  hotels,
  destinationName,
}: DestinationStaysProps) {
  return (
    <section
      id="stays"
      className="scroll-mt-24 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
                Where you stay
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
              Beautiful stays,
              <span className="block text-[#087E8B]">
                chosen for the journey.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              Places to slow down, wake up to the mountains and
              feel more connected to where you are.
            </p>
          </div>

          {hotels.length > 0 && (
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link
                href="/hotels"
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/50 transition-colors hover:text-[#087E8B]"
              >
                Explore all stays

                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          )}
        </div>

        {hotels.length > 0 ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {hotels.map((hotel) => {
              const hasRating =
                typeof hotel.guestRating === "number" &&
                hotel.guestRating > 0 &&
                hotel.reviewCount > 0;

              return (
                <article
                  key={hotel._id.toString()}
                  className="group relative overflow-hidden rounded-[26px] bg-white"
                >
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={`Explore ${hotel.name}`}
                  />

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0D2747]">
                    {hotel.heroImage ? (
                      <Image
                        src={hotel.heroImage}
                        alt={hotel.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#0D2747]" />
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#071A33]/65 via-transparent to-transparent"
                    />

                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                      {hotel.hotelType && (
                        <span className="rounded-full border border-white/20 bg-[#071A33]/35 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white/80 backdrop-blur-md">
                          {hotel.hotelType}
                        </span>
                      )}

                      {hasRating && (
                        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#071A33]/35 px-3 py-2 text-xs text-white backdrop-blur-md">
                          <Star
                            className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
                            strokeWidth={1.5}
                          />

                          {hotel.guestRating?.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
                      <MapPin
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                      />

                      {hotel.area || hotel.city || destinationName}
                    </div>

                    <h3 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-[-0.025em] text-[#071A33]">
                      {hotel.name}
                    </h3>

                    {hotel.shortDescription && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#071A33]/50">
                        {hotel.shortDescription}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-[#071A33]/8 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/40">
                        Discover stay
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#071A33]/10 bg-[#FAF9F5] text-[#071A33] transition-all duration-300 group-hover:border-[#087E8B]/30 group-hover:bg-[#087E8B] group-hover:text-white">
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-[28px] border border-[#071A33]/10 bg-white px-6 py-14 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
              Stay options
            </p>

            <h3 className="mt-4 font-serif text-3xl font-medium tracking-[-0.03em] text-[#071A33] sm:text-4xl">
              Stays for this journey are coming together.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#071A33]/50">
              We are continuing to curate places that make the
              journey feel as considered as the destination.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}