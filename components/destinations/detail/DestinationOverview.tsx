import {
  CalendarDays,
  Clock3,
  Mountain,
  Star,
} from "lucide-react";

import type { Destination } from "@/lib/types/destination";

interface DestinationOverviewProps {
  destination: Destination;
}

export default function DestinationOverview({
  destination,
}: DestinationOverviewProps) {
  const hasRating =
    destination.rating > 0 && destination.reviewCount > 0;

  const hasStartingPrice =
    destination.startingPrice > 0;

  return (
    <section
      id="overview"
      className="scroll-mt-24 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Editorial heading */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
                About {destination.name}
              </span>
            </div>

            <h2 className="mt-6 max-w-xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
              A place to
              <span className="block text-[#087E8B]">
                experience, not rush.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              Discover what makes {destination.name} worth the
              journey — from its landscapes and atmosphere to
              the moments that stay with you long after you leave.
            </p>
          </div>

          {/* Destination story */}
          <div className="lg:col-span-7">
            <div className="max-w-3xl">
              {destination.description ? (
                <div className="whitespace-pre-line text-base leading-8 text-[#071A33]/65 sm:text-lg sm:leading-9">
                  {destination.description}
                </div>
              ) : (
                <p className="text-base leading-8 text-[#071A33]/55 sm:text-lg sm:leading-9">
                  Explore {destination.name} at your own pace with
                  thoughtfully chosen journeys, stays and experiences
                  from The Musafir Diaries.
                </p>
              )}

              {/* Quick facts */}
              <div className="mt-10 grid border-y border-[#071A33]/10 sm:grid-cols-2">
                {destination.bestTime && (
                  <div className="flex gap-4 border-b border-[#071A33]/10 py-5 sm:border-r sm:pr-7">
                    <CalendarDays
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#087E8B]"
                      strokeWidth={1.6}
                    />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#071A33]/35">
                        Best time
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#071A33]">
                        {destination.bestTime}
                      </p>
                    </div>
                  </div>
                )}

                {destination.altitude && (
                  <div className="flex gap-4 border-b border-[#071A33]/10 py-5 sm:pl-7">
                    <Mountain
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#087E8B]"
                      strokeWidth={1.6}
                    />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#071A33]/35">
                        Altitude
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#071A33]">
                        {destination.altitude}
                      </p>
                    </div>
                  </div>
                )}

                {destination.duration && (
                  <div className="flex gap-4 py-5 sm:border-r sm:pr-7">
                    <Clock3
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#087E8B]"
                      strokeWidth={1.6}
                    />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#071A33]/35">
                        Typical duration
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#071A33]">
                        {destination.duration}
                      </p>
                    </div>
                  </div>
                )}

                {hasRating && (
                  <div className="flex gap-4 border-t border-[#071A33]/10 py-5 sm:border-t-0 sm:pl-7">
                    <Star
                      className="mt-0.5 h-5 w-5 shrink-0 fill-[#F59E0B] text-[#F59E0B]"
                      strokeWidth={1.5}
                    />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#071A33]/35">
                        Guest rating
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#071A33]">
                        {destination.rating.toFixed(1)}{" "}
                        <span className="font-normal text-[#071A33]/40">
                          · {destination.reviewCount} reviews
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Starting price — only when actual data exists */}
              {hasStartingPrice && (
                <div className="mt-7 flex flex-col gap-2 rounded-2xl border border-[#071A33]/8 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/35">
                      Journeys from
                    </p>

                    <p className="mt-1 text-lg font-semibold text-[#071A33]">
                      ₹
                      {destination.startingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <span className="text-xs text-[#071A33]/35">
                    Subject to itinerary & availability
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}