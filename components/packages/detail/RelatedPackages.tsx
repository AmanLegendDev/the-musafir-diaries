import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface RelatedPackagesProps {
  packages: IPackage[];
  destinationName: string;
}

function formatPrice(price: number) {
  if (!price || price <= 0) return null;

  return `₹${price.toLocaleString("en-IN")}`;
}

export default function RelatedPackages({
  packages,
  destinationName,
}: RelatedPackagesProps) {
  if (!packages?.length) {
    return null;
  }

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                You may also like
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-6xl">
              More ways to experience{" "}
              {destinationName || "the Himalayas"}.
            </h2>
          </div>

          <Link
            href="/packages"
            className="group inline-flex shrink-0 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]"
          >
            View all journeys

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.7}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, index) => {
            const image = pkg.heroImage || "";
            const price = formatPrice(pkg.discountedPrice);

            return (
              <article
                key={pkg._id.toString()}
                className="group relative overflow-hidden rounded-[28px] bg-[#071A33]"
              >
                <Link
                  href={`/packages/${pkg.slug}`}
                  aria-label={`Explore ${pkg.name}`}
                  className="absolute inset-0 z-20"
                />

                <div className="relative min-h-[470px]">
                  {image ? (
                    <Image
                      src={image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0D2747]" />
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/45 to-transparent"
                  />

                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/30 text-[10px] font-semibold text-white/65 backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {pkg.difficulty && (
                      <span className="rounded-full border border-white/15 bg-[#071A33]/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/65 backdrop-blur-md">
                        {pkg.difficulty}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#1597C7]">
                      Another journey
                    </p>

                    <h3 className="mt-3 font-serif text-3xl font-medium leading-[1] tracking-[-0.03em] text-white">
                      {pkg.name}
                    </h3>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-4">
                      {pkg.duration && (
                        <span className="flex items-center gap-2 text-xs text-white/55">
                          <Clock3
                            className="h-3.5 w-3.5 text-[#1597C7]"
                            strokeWidth={1.6}
                          />
                          {pkg.duration}
                        </span>
                      )}

                      {destinationName && (
                        <span className="flex items-center gap-2 text-xs text-white/55">
                          <MapPin
                            className="h-3.5 w-3.5 text-[#1597C7]"
                            strokeWidth={1.6}
                          />
                          {destinationName}
                        </span>
                      )}

                      {price && (
                        <span className="text-xs text-white/55">
                          From{" "}
                          <strong className="text-white">
                            {price}
                          </strong>
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors group-hover:text-white/70">
                        Explore journey
                      </span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:border-[#1597C7]/60 group-hover:bg-[#1597C7]">
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}