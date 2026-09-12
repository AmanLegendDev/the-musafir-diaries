import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Users,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface PackagePricingProps {
  packageData: IPackage;
}

function formatPrice(price: number) {
  if (!price || price <= 0) return null;

  return `₹${price.toLocaleString("en-IN")}`;
}

export default function PackagePricing({
  packageData,
}: PackagePricingProps) {
  const discounted = formatPrice(
    packageData.discountedPrice
  );

  const original = formatPrice(
    packageData.originalPrice
  );

  const hasDiscount =
    packageData.originalPrice > 0 &&
    packageData.discountedPrice > 0 &&
    packageData.discountedPrice <
      packageData.originalPrice;

  const savings =
    hasDiscount
      ? packageData.originalPrice -
        packageData.discountedPrice
      : 0;

  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-[#071A33] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                Your journey, your way
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Let’s make the mountains yours.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              Start with this journey and customise it around
              your dates, preferences, stay choices and group.
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-xs text-white/55">
                <Users
                  className="h-4 w-4 text-[#1597C7]"
                  strokeWidth={1.6}
                />
                {packageData.groupSize || "Flexible group size"}
              </div>

              {packageData.duration && (
                <div className="text-xs text-white/40">
                  {packageData.duration}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 lg:flex lg:justify-end">
            <div className="w-full max-w-[520px] rounded-[32px] border border-white/10 bg-[#0D2747] p-6 sm:p-8 lg:p-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                Package pricing
              </p>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                {discounted ? (
                  <span className="font-serif text-5xl tracking-[-0.04em] text-white sm:text-6xl">
                    {discounted}
                  </span>
                ) : (
                  <span className="font-serif text-4xl text-white">
                    Price on enquiry
                  </span>
                )}

                {hasDiscount && original && (
                  <span className="pb-2 text-sm text-white/30 line-through">
                    {original}
                  </span>
                )}
              </div>

              {hasDiscount && savings > 0 && (
                <p className="mt-3 text-xs text-[#F59E0B]">
                  Save ₹{savings.toLocaleString("en-IN")} on
                  the listed package price.
                </p>
              )}

              <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-sm text-white/55">
                  <Check
                    className="h-4 w-4 text-[#1597C7]"
                    strokeWidth={1.8}
                  />
                  Thoughtfully planned itinerary
                </div>

                <div className="flex items-center gap-3 text-sm text-white/55">
                  <Check
                    className="h-4 w-4 text-[#1597C7]"
                    strokeWidth={1.8}
                  />
                  Flexible trip customisation
                </div>

                <div className="flex items-center gap-3 text-sm text-white/55">
                  <Check
                    className="h-4 w-4 text-[#1597C7]"
                    strokeWidth={1.8}
                  />
                  Stay options based on availability
                </div>
              </div>

              <Link
                href={`/inquiry?package=${encodeURIComponent(
                  packageData.slug
                )}`}
                className="group mt-8 flex w-full items-center justify-between rounded-full bg-[#F59E0B] px-5 py-3.5 text-sm font-semibold text-[#071A33] transition-colors hover:bg-[#FAF9F5]"
              >
                Enquire about this journey

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>

              <p className="mt-4 text-center text-[9px] leading-5 text-white/25">
                Final pricing is confirmed according to dates,
                availability and selected options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}