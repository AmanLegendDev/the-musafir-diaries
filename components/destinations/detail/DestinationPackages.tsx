import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Users,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface DestinationPackagesProps {
  packages: IPackage[];
  destinationName: string;
}

function formatPrice(price: number) {
  return price > 0
    ? `₹${price.toLocaleString("en-IN")}`
    : null;
}

export default function DestinationPackages({
  packages,
  destinationName,
}: DestinationPackagesProps) {
  return (
    <section
      id="packages"
      className="scroll-mt-24 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
                Journeys for {destinationName}
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
              Find a journey
              <span className="block text-[#087E8B]">
                that feels like yours.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              Thoughtfully planned journeys designed to help you
              experience {destinationName} without rushing through
              it.
            </p>
          </div>

          {packages.length > 0 && (
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link
                href="/packages"
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/50 transition-colors hover:text-[#087E8B]"
              >
                View all journeys

                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          )}
        </div>

        {/* Package collection */}
        {packages.length > 0 ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {packages.map((pkg, index) => {
              const isPrimary = index === 0;

              const price = formatPrice(
                pkg.discountedPrice > 0
                  ? pkg.discountedPrice
                  : pkg.originalPrice
              );

              return (
               <article
  key={pkg._id.toString()}
                  className={[
                    "group relative overflow-hidden rounded-[28px] bg-[#071A33]",
                    isPrimary
                      ? "min-h-[540px] lg:col-span-7 lg:min-h-[620px]"
                      : "min-h-[420px] lg:col-span-5 lg:min-h-[298px]",
                  ].join(" ")}
                >
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={`Explore ${pkg.name}`}
                  />

                  {pkg.heroImage ? (
                    <Image
                      src={pkg.heroImage}
                      alt={pkg.name}
                      fill
                      sizes={
                        isPrimary
                          ? "(max-width: 1024px) 100vw, 58vw"
                          : "(max-width: 1024px) 100vw, 42vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0D2747]" />
                  )}

                  {/* Overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/45 to-transparent"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#071A33]/10 transition-opacity duration-500 group-hover:opacity-0"
                  />

                  {/* Top */}
                  <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
                    <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/30 px-2 text-[10px] font-semibold tracking-[0.12em] text-white/75 backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {pkg.difficulty && (
                      <span className="rounded-full border border-white/15 bg-[#071A33]/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65 backdrop-blur-md">
                        {pkg.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-7">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#1597C7]">
                      {destinationName}
                    </p>

                    <h3
                      className={[
                        "mt-3 max-w-2xl font-serif font-medium leading-[0.98] tracking-[-0.035em] text-white",
                        isPrimary
                          ? "text-4xl sm:text-5xl"
                          : "text-3xl sm:text-4xl",
                      ].join(" ")}
                    >
                      {pkg.name}
                    </h3>

                    {pkg.shortDescription && (
                      <p className="mt-4 max-w-xl line-clamp-2 text-sm leading-6 text-white/55">
                        {pkg.shortDescription}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-4">
                      {pkg.duration && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <Clock3
                            className="h-3.5 w-3.5 text-[#1597C7]"
                            strokeWidth={1.7}
                          />
                          {pkg.duration}
                        </div>
                      )}

                      {pkg.groupSize && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <Users
                            className="h-3.5 w-3.5 text-[#1597C7]"
                            strokeWidth={1.7}
                          />
                          {pkg.groupSize}
                        </div>
                      )}

                      {price && (
                        <span className="text-xs text-white/65">
                          From{" "}
                          <strong className="text-white">
                            {price}
                          </strong>
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
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
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-[28px] border border-[#071A33]/10 bg-[#FAF9F5] px-6 py-14 text-center sm:px-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
              Journeys coming together
            </p>

            <h3 className="mt-4 font-serif text-3xl font-medium tracking-[-0.03em] text-[#071A33] sm:text-4xl">
              We&apos;re shaping journeys for this place.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#071A33]/50">
              Tell us when you&apos;d like to travel and what you
              would love to experience. We can help shape a
              journey around your plans.
            </p>

            <Link
              href={`/inquiry?destination=${encodeURIComponent(
                destinationName
              )}`}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#087E8B]"
            >
              Plan a custom journey

              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}