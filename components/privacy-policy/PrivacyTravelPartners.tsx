import PrivacySection from "./PrivacySection";
import {
  Building2,
  CarFront,
  Compass,
  Hotel,
  Users,
} from "lucide-react";

const PARTNERS = [
  {
    icon: Hotel,
    title: "Accommodation",
    text: "Hotels, homestays, resorts, camps or other accommodation providers involved in a journey you request.",
  },
  {
    icon: CarFront,
    title: "Transportation",
    text: "Transport operators or drivers where their involvement is required to arrange the travel services you request.",
  },
  {
    icon: Compass,
    title: "Activities & experiences",
    text: "Local activity, experience or destination service providers where relevant to your itinerary.",
  },
  {
    icon: Building2,
    title: "Technology & operations",
    text: "Technology, communication, hosting, payment or other operational providers that help us run the website and business.",
  },
  {
    icon: Users,
    title: "Other necessary providers",
    text: "Other third parties may receive relevant information where reasonably necessary to deliver a requested service or fulfil a legitimate business or legal purpose.",
  },
];

export default function PrivacyTravelPartners() {
  return (
    <PrivacySection
      id="travel-partners"
      number="04"
      title="Travel Partners & Service Providers"
      intro="Travel is a connected experience. Depending on what you ask us to arrange, parts of your journey may involve independent hotels, transport providers, activity operators or other service partners."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((partner, index) => {
          const Icon = partner.icon;

          return (
            <div
              key={partner.title}
              className={`rounded-2xl border border-[#071A33]/10 bg-white p-6 ${
                index === PARTNERS.length - 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 text-[#087E8B]">
                <Icon className="h-4 w-4" />
              </div>

              <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                {partner.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
                {partner.text}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        These providers may have their own privacy policies and
        terms. Their handling of information may therefore be
        governed by their own practices in addition to the
        arrangements we make with them.
      </p>
    </PrivacySection>
  );
}