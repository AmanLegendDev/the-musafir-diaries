import TermsSection from "./TermsSection";
import {
  CloudSnow,
  Mountain,
  RouteOff,
  ShieldAlert,
} from "lucide-react";

const CONDITIONS = [
  {
    icon: CloudSnow,
    title: "Weather",
    text: "Snowfall, rainfall, storms, extreme temperatures and other weather conditions can affect travel plans and activities.",
  },
  {
    icon: RouteOff,
    title: "Road conditions",
    text: "Road closures, landslides, traffic restrictions, construction, vehicle access and other local conditions may affect routes and travel times.",
  },
  {
    icon: ShieldAlert,
    title: "Local decisions",
    text: "Government authorities, local administrations, property operators or transport providers may impose restrictions or changes that affect a journey.",
  },
  {
    icon: Mountain,
    title: "Mountain environment",
    text: "Mountain travel can involve terrain, altitude, changing conditions and longer or less predictable travel times than ordinary road journeys.",
  },
];

export default function TermsWeather() {
  return (
    <TermsSection
      id="weather"
      number="10"
      title="Weather & Mountain Conditions"
      intro="Himachal and Himalayan travel comes with conditions that cannot always be predicted or controlled. We plan responsibly, but no itinerary can guarantee that every route, activity or timing will remain unchanged."
      tone="cream"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CONDITIONS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/25">
                  Mountain travel
                </span>
              </div>

              <h3 className="mt-6 font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-9 border-l-2 border-[#F06A5B]/60 bg-white px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
          Where conditions make a planned route or activity
          impractical or unsafe, reasonable changes may be made to
          protect travellers and keep the journey operational.
        </p>
      </div>
    </TermsSection>
  );
}