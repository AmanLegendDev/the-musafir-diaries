import {
  FileText,
  MapPinned,
  MessageCircle,
  Route,
} from "lucide-react";

import InquiryBenefitCard from "./InquiryBenefitCard";

const BENEFITS = [
  {
    icon: MapPinned,
    eyebrow: "01 · Destination",
    title: "Start with where you want to go",
    description:
      "Choose the Himalayan destination that interests you and give us the dates you're considering.",
  },
  {
    icon: Route,
    eyebrow: "02 · Preferences",
    title: "Tell us what matters",
    description:
      "Share your group size, budget range, pickup preference and the kind of experience you're looking for.",
  },
  {
    icon: MessageCircle,
    eyebrow: "03 · Conversation",
    title: "Plan around your needs",
    description:
      "Your inquiry gives us the context to discuss the journey with you rather than starting from a generic template.",
  },
  {
    icon: FileText,
    eyebrow: "04 · Next step",
    title: "Review the possibilities",
    description:
      "Once your requirements are understood, itinerary details, availability and pricing can be discussed with you.",
  },
];

export default function InquiryBenefits() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087E8B]">
            How it works
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#071A33] sm:text-4xl lg:text-5xl">
            A simple beginning to a more thoughtful journey.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#071A33]/60 sm:text-base">
            You don't need to have every detail figured out.
            Give us the essentials and we can take the
            conversation from there.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <InquiryBenefitCard
              key={benefit.eyebrow}
              {...benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}