import PackageBookingCard from "./PackageBookingCard";

import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PackageOverviewProps {
  packageName: string;
  shortDescription: string;
  description: string;

  duration: string;
  groupSize: string;

  originalPrice: number;
  discountedPrice: number;
}

export default function PackageOverview({
  packageName,
  shortDescription,
  description,
  duration,
  groupSize,
  originalPrice,
  discountedPrice,
}: PackageOverviewProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Left */}

          <div className="space-y-12 lg:col-span-2">

            {/* About */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                <Sparkles className="h-4 w-4" />

                Overview

              </div>

              <h2 className="mt-5 text-4xl font-bold text-slate-900">
                About This Package
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {shortDescription}
              </p>

            </div>

            {/* Description */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-slate-900">
                Experience
              </h3>

              <div className="prose mt-6 max-w-none text-slate-600">

                <p className="leading-8 whitespace-pre-line">
                  {description}
                </p>

              </div>

            </div>

            {/* Perfect For */}

            <div className="rounded-3xl bg-slate-50 p-8">

              <h3 className="text-2xl font-bold text-slate-900">
                Perfect For
              </h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                {[
                  "Families",
                  "Couples",
                  "Solo Travelers",
                  "Adventure Lovers",
                  "Nature Enthusiasts",
                  "Photography Trips",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <PackageBookingCard
              packageName={packageName}
              duration={duration}
              groupSize={groupSize}
              originalPrice={originalPrice}
              discountedPrice={discountedPrice}
            />

          </div>

        </div>

      </div>
    </section>
  );
}