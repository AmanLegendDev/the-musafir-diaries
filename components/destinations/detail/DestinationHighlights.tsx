import {
  CalendarDays,
  Clock3,
  MapPin,
  Mountain,
  ShieldCheck,
  Star,
} from "lucide-react";

interface DestinationHighlightsProps {
  city: string;
  state: string;
  country: string;
  altitude: string;
  bestTime: string;
  duration: string;
  rating: number;
}

export default function DestinationHighlights({
  city,
  state,
  country,
  altitude,
  bestTime,
  duration,
  rating,
}: DestinationHighlightsProps) {
  const highlights = [
    {
      icon: MapPin,
      title: "Prime Location",
      description: [city, state, country]
        .filter(Boolean)
        .join(", "),
    },
    {
      icon: Mountain,
      title: "Altitude",
      description: altitude || "Not Available",
    },
    {
      icon: CalendarDays,
      title: "Best Season",
      description: bestTime || "Year Round",
    },
    {
      icon: Clock3,
      title: "Trip Duration",
      description: duration || "Flexible",
    },
    {
      icon: Star,
      title: "Traveler Rating",
      description: `${rating.toFixed(1)} / 5`,
    },
    {
      icon: ShieldCheck,
      title: "Travel Experience",
      description:
        "Safe, reliable & professionally managed.",
    },
  ];

  return (
    <section className="py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-10 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Why Choose This Destination
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Destination Highlights
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Everything you need to know before planning
            your journey.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-emerald-300
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-100
                    text-emerald-700
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}