"use client";

import { MapPin } from "lucide-react";

export type HotelDestinationOption = {
  _id: string;
  name: string;
  slug: string;
  state?: string;
  featured?: boolean;
  featuredOrder?: number;
};

type Props = {
  destinations: HotelDestinationOption[];
  selectedDestination: string;
  onDestinationChange: (slug: string) => void;
};

export default function HotelDestinationSelector({
  destinations,
  selectedDestination,
  onDestinationChange,
}: Props) {
  return (
    <div className="w-full">
      {/* ------------------------------------------------------------------ */}
      {/* Heading                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087E8B]">
            Explore by destination
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#071A33] sm:text-2xl">
            Find your stay
          </h2>
        </div>

        {selectedDestination !== "all" && (
          <button
            type="button"
            onClick={() =>
              onDestinationChange("all")
            }
            className="
              shrink-0
              text-xs
              font-semibold
              text-[#087E8B]
              transition-colors
              hover:text-[#071A33]
            "
          >
            View all
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Destination Rail                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          -mx-6
          overflow-x-auto
          px-6
          pb-3
          sm:-mx-8
          sm:px-8
          lg:-mx-12
          lg:px-12
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="flex min-w-max gap-3">
          {/* -------------------------------------------------------------- */}
          {/* All Destinations                                               */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            onClick={() =>
              onDestinationChange("all")
            }
            aria-pressed={
              selectedDestination === "all"
            }
            className={`
              group
              flex
              min-h-[56px]
              items-center
              gap-3
              rounded-2xl
              border
              px-4
              sm:px-5
              transition-all
              duration-300
              ${
                selectedDestination === "all"
                  ? "border-[#071A33] bg-[#071A33] text-white shadow-[0_12px_30px_rgba(7,26,51,0.14)]"
                  : "border-[#071A33]/10 bg-white text-[#071A33] hover:-translate-y-0.5 hover:border-[#087E8B]/30 hover:shadow-[0_10px_25px_rgba(7,26,51,0.07)]"
              }
            `}
          >
            <span
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                transition-colors
                ${
                  selectedDestination === "all"
                    ? "bg-white/10"
                    : "bg-[#087E8B]/10"
                }
              `}
            >
              <MapPin
                className={`
                  h-4
                  w-4
                  transition-colors
                  ${
                    selectedDestination === "all"
                      ? "text-[#F59E0B]"
                      : "text-[#087E8B]"
                  }
                `}
              />
            </span>

            <span className="whitespace-nowrap text-sm font-semibold">
              All Destinations
            </span>
          </button>

          {/* -------------------------------------------------------------- */}
          {/* Dynamic Destinations                                            */}
          {/* -------------------------------------------------------------- */}

          {destinations.map((destination) => {
            const isActive =
              selectedDestination ===
              destination.slug;

            return (
              <button
                key={destination._id}
                type="button"
                onClick={() =>
                  onDestinationChange(
                    destination.slug
                  )
                }
                aria-pressed={isActive}
                className={`
                  group
                  flex
                  min-h-[56px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  px-4
                  sm:px-5
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "border-[#087E8B] bg-[#087E8B] text-white shadow-[0_12px_30px_rgba(8,126,139,0.18)]"
                      : "border-[#071A33]/10 bg-white text-[#071A33] hover:-translate-y-0.5 hover:border-[#087E8B]/30 hover:shadow-[0_10px_25px_rgba(7,26,51,0.07)]"
                  }
                `}
              >
                <span
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-colors
                    ${
                      isActive
                        ? "bg-white/10"
                        : "bg-[#087E8B]/10"
                    }
                  `}
                >
                  <MapPin
                    className={`
                      h-4
                      w-4
                      transition-colors
                      ${
                        isActive
                          ? "text-[#F59E0B]"
                          : "text-[#087E8B]"
                      }
                    `}
                  />
                </span>

                <span className="whitespace-nowrap text-sm font-semibold">
                  {destination.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}