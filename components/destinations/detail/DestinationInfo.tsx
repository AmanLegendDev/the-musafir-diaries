import {
  CalendarDays,
  Clock3,
  Globe2,
  MapPin,
  Mountain,
  Navigation,
} from "lucide-react";

interface DestinationInfoProps {
  country: string;
  state: string;
  city: string;
  altitude: string;
  bestTime: string;
  duration: string;
}

export default function DestinationInfo({
  country,
  state,
  city,
  altitude,
  bestTime,
  duration,
}: DestinationInfoProps) {
  const cards = [
    {
      icon: Globe2,
      title: "Country",
      value: country || "Not Available",
    },
    {
      icon: MapPin,
      title: "State",
      value: state || "Not Available",
    },
    {
      icon: Navigation,
      title: "City",
      value: city || "Not Available",
    },
    {
      icon: Mountain,
      title: "Altitude",
      value: altitude || "Not Available",
    },
    {
      icon: CalendarDays,
      title: "Best Time To Visit",
      value: bestTime || "Year Round",
    },
    {
      icon: Clock3,
      title: "Recommended Duration",
      value: duration || "Flexible",
    },
  ];

  return (
    <section className="py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-10 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Travel Guide
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Travel Information
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Useful information to help you plan a smooth,
            comfortable and memorable journey.
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`
                  flex
                  flex-col
                  gap-4
                  p-6
                  transition-colors
                  hover:bg-slate-50

                  md:flex-row
                  md:items-center
                  md:justify-between

                  ${
                    index !== cards.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }
                `}
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {item.value}
                    </h3>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}