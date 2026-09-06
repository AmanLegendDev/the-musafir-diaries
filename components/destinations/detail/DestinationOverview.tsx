import {
  CalendarDays,
  Clock3,
  Globe,
  MapPin,
  Mountain,
} from "lucide-react";

interface DestinationOverviewProps {
  description: string;
  country: string;
  state: string;
  city: string;
  altitude: string;
  bestTime: string;
  duration: string;
  startingPrice: number;
rating: number;
reviewCount: number;
}

import DestinationSidebar from "./DestinationSidebar";

export default function DestinationOverview({
  description,
  country,
  state,
  city,
  altitude,
  bestTime,
  duration,
  startingPrice,
  rating,
  reviewCount,
}: DestinationOverviewProps) {
  const info = [
    {
      icon: MapPin,
      label: "Location",
      value: [city, state, country]
        .filter(Boolean)
        .join(", "),
    },
    {
      icon: Mountain,
      label: "Altitude",
      value: altitude || "Not Available",
    },
    {
      icon: CalendarDays,
      label: "Best Time",
      value: bestTime || "Year Round",
    },
    {
      icon: Clock3,
      label: "Duration",
      value: duration || "Flexible",
    },
  ];

  return (
    <section className="py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Left */}

          <div>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                <Globe className="h-4 w-4" />
                Destination Overview
              </span>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Discover Your Next Adventure
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {description ||
                  "Experience breathtaking landscapes, unforgettable adventures, and memorable journeys carefully crafted for every traveler."}
              </p>
            </div>

            {/* Information Grid */}

            <div className="grid gap-5 sm:grid-cols-2">
              {info.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      transition-all
                      duration-300
                      hover:border-emerald-300
                      hover:shadow-lg
                    "
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <p className="text-sm text-slate-500">
                      {item.label}
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                      {item.value}
                    </h3>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right */}

  {/* Right */}

<div>
  <DestinationSidebar
    startingPrice={startingPrice}
    rating={rating}
    reviewCount={reviewCount}
    city={city}
    state={state}
    country={country}
    altitude={altitude}
    bestTime={bestTime}
  />
</div>
        

        </div>

      </div>
    </section>
  );
}