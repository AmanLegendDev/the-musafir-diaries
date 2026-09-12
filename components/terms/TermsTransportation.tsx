import TermsSection from "./TermsSection";
import {
  CarFront,
  Clock3,
  MapPinned,
} from "lucide-react";

const TRANSPORT_POINTS = [
  {
    icon: CarFront,
    title: "Vehicle arrangements",
    text: "Transportation may be provided or arranged through independent drivers, operators or other transport providers depending on the journey.",
  },
  {
    icon: MapPinned,
    title: "Routes and access",
    text: "Routes may change because of road conditions, traffic restrictions, weather, local authority decisions, maintenance or other circumstances.",
  },
  {
    icon: Clock3,
    title: "Delays",
    text: "Travel times are estimates and may be affected by traffic, weather, road conditions, checkpoints, local events or other factors.",
  },
];

export default function TermsTransportation() {
  return (
    <TermsSection
      id="transportation"
      number="07"
      title="Transportation"
      intro="Road travel through the mountains can be affected by conditions that are outside anyone's control. We plan transportation carefully while recognising that actual travel conditions may vary."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {TRANSPORT_POINTS.map((item) => {
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
    </TermsSection>
  );
}