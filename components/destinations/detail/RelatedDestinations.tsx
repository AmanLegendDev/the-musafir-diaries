import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";

import type { Destination } from "@/lib/types/destination";
interface RelatedDestinationsProps {
  destinations: Destination[];
}

export default function RelatedDestinations({
  destinations,
}: RelatedDestinationsProps) {
  if (!destinations.length) {
    return null;
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              Explore More
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Related Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Discover more amazing destinations you may
              also enjoy.
            </p>

          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {destinations.map((destination) => (
            <article
              key={destination._id}
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
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="relative aspect-[4/3] overflow-hidden">

                <Image
                  src={destination.heroImage}
                  alt={destination.name}
                  fill
                  loading="lazy"
                  sizes="(max-width:768px)100vw,33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-sm text-slate-500">

                    <MapPin className="h-4 w-4" />

                    <span>
                      {destination.city},{" "}
                      {destination.state}
                    </span>

                  </div>

                  <div className="flex items-center gap-1">

                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-semibold">
                      {destination.rating}
                    </span>

                  </div>

                </div>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {destination.name}
                </h3>

                <p className="mt-3 line-clamp-2 leading-7 text-slate-600">
                  {destination.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Starting From
                    </p>

                    <h4 className="text-2xl font-bold text-emerald-700">
                      ₹
                      {destination.startingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </h4>

                  </div>

                  <div className="flex items-center gap-2 text-slate-500">

                    <Clock3 className="h-4 w-4" />

                    <span className="text-sm">
                      {destination.duration}
                    </span>

                  </div>

                </div>

                <Link
                  href={`/destinations/${destination.slug}`}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-emerald-700
                    transition-colors
                    hover:text-emerald-800
                  "
                >
                  View Details

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}