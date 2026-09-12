import TermsSection from "./TermsSection";
import {
  CloudLightning,
  MountainSnow,
  RouteOff,
  Siren,
} from "lucide-react";

const EVENTS = [
  {
    icon: MountainSnow,
    title: "Severe weather",
    text: "Heavy snowfall, extreme rainfall, storms, extreme temperatures or other severe weather conditions.",
  },
  {
    icon: RouteOff,
    title: "Road & route disruption",
    text: "Landslides, road closures, traffic restrictions, blocked routes, infrastructure issues or unexpected access restrictions.",
  },
  {
    icon: Siren,
    title: "Government or local restrictions",
    text: "Orders, restrictions, closures or decisions made by government authorities, local administrations or other competent bodies.",
  },
  {
    icon: CloudLightning,
    title: "Other exceptional events",
    text: "Natural disasters, major disruptions, strikes, civil disturbance, emergencies or other circumstances beyond reasonable control.",
  },
];

export default function TermsForceMajeure() {
  return (
    <TermsSection
      id="force-majeure"
      number="13"
      title="Force Majeure"
      intro="Some events are outside the reasonable control of a travel business and may make a planned journey impossible, unsafe or materially different from the original plan."
      tone="cream"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {EVENTS.map((event) => {
          const Icon = event.icon;

          return (
            <div
              key={event.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                {event.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                {event.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-9 rounded-2xl bg-[#071A33] p-6 text-white sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8ED9DF]">
          When circumstances change
        </p>

        <p className="mt-3 max-w-3xl font-serif text-xl leading-relaxed tracking-[-0.015em] text-white/90 sm:text-2xl">
          We may need to modify, delay, reroute or otherwise
          adjust a journey when circumstances make the original
          arrangement impractical or unsafe.
        </p>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
          Where reasonably possible, we will communicate material
          changes and work towards a practical alternative.
        </p>
      </div>
    </TermsSection>
  );
}