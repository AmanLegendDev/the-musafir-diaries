import TermsSection from "./TermsSection";
import {
  Route,
  Shuffle,
  ShieldCheck,
} from "lucide-react";

const ITINERARY_POINTS = [
  {
    icon: Route,
    title: "Planned itinerary",
    text: "The itinerary provided for a journey represents the planned travel experience and may include destinations, activities, accommodation and transportation arrangements.",
  },
  {
    icon: Shuffle,
    title: "Necessary changes",
    text: "Routes, timings, activities, accommodation or other itinerary elements may need to change because of availability, weather, road conditions, operational requirements or circumstances outside reasonable control.",
  },
  {
    icon: ShieldCheck,
    title: "Safety comes first",
    text: "Where a change is reasonably necessary for traveller safety or practical operation of the journey, the itinerary may be adjusted accordingly.",
  },
];

export default function TermsItinerary() {
  return (
    <TermsSection
      id="itinerary"
      number="05"
      title="Itinerary Changes"
      intro="Himalayan travel does not always follow a perfectly predictable schedule. We aim to deliver the agreed travel experience while recognising that conditions can require practical changes."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ITINERARY_POINTS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
            >
              <Icon className="h-5 w-5 text-[#087E8B]" />

              <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#071A33]/50 sm:leading-8">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-9 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        If an itinerary element cannot reasonably be provided, we
        will aim to communicate the change and, where appropriate,
        work towards a practical alternative.
      </p>
    </TermsSection>
  );
}