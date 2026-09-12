import TermsSection from "./TermsSection";
import {
  BedDouble,
  Building2,
  ClipboardCheck,
} from "lucide-react";

const ACCOMMODATION_POINTS = [
  {
    icon: Building2,
    title: "Property selection",
    text: "Accommodation may be arranged through hotels, resorts, homestays, camps or other properties depending on the journey and availability.",
  },
  {
    icon: BedDouble,
    title: "Room allocation",
    text: "Room types, occupancy, bedding and other accommodation details are subject to the property and the arrangements confirmed for the booking.",
  },
  {
    icon: ClipboardCheck,
    title: "Property policies",
    text: "Individual accommodation providers may have their own check-in, check-out, cancellation, child, identification and other policies.",
  },
];

export default function TermsAccommodation() {
  return (
    <TermsSection
      id="accommodation"
      number="06"
      title="Accommodation"
      intro="Accommodation is an important part of a journey, but individual properties may operate under their own policies and availability."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ACCOMMODATION_POINTS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                <Icon className="h-5 w-5" />
              </div>

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

      <p className="mt-8 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        Where a particular property has additional conditions,
        those conditions may also apply to your stay and should be
        reviewed before travel.
      </p>
    </TermsSection>
  );
}