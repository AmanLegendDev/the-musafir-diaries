import TermsSection from "./TermsSection";
import {
  HeartHandshake,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const RESPONSIBILITIES = [
  {
    icon: UserRoundCheck,
    title: "Provide accurate information",
    text: "Travellers should provide accurate and complete information needed to arrange and operate their journey.",
  },
  {
    icon: ShieldCheck,
    title: "Follow safety guidance",
    text: "Travellers are expected to follow reasonable instructions from travel coordinators, drivers, guides, accommodation providers and local authorities.",
  },
  {
    icon: HeartHandshake,
    title: "Respect people and places",
    text: "Travellers should behave responsibly, respect local communities and follow applicable laws, property rules and environmental guidelines.",
  },
];

export default function TermsTravellerResponsibilities() {
  return (
    <TermsSection
      id="traveller-responsibilities"
      number="08"
      title="Traveller Responsibilities"
      intro="A good journey is a shared responsibility. Travellers are expected to act reasonably and provide the information needed to plan and operate their trip safely."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {RESPONSIBILITIES.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 text-[#087E8B]">
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

      <div className="mt-9 border-t border-[#071A33]/10 pt-7">
        <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
          Personal belongings
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
          Travellers should take reasonable care of their personal
          belongings and important documents during the journey.
          Unless otherwise required by applicable law or a specific
          supplier arrangement, personal belongings remain the
          traveller&apos;s responsibility.
        </p>
      </div>
    </TermsSection>
  );
}