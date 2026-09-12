import TermsSection from "./TermsSection";
import {
  Building2,
  CarFront,
  Compass,
  CreditCard,
  ExternalLink,
} from "lucide-react";

const PROVIDERS = [
  {
    icon: Building2,
    title: "Accommodation providers",
    text: "Hotels, resorts, homestays, camps and other accommodation businesses may provide services included in your journey.",
  },
  {
    icon: CarFront,
    title: "Transport providers",
    text: "Drivers, vehicle operators and other transportation providers may be involved in delivering the transportation arrangements.",
  },
  {
    icon: Compass,
    title: "Activity providers",
    text: "Guides, activity operators and local experience providers may independently deliver specific activities or experiences.",
  },
  {
    icon: CreditCard,
    title: "Payment providers",
    text: "Where applicable, payments may be processed through third-party payment services subject to their own terms and policies.",
  },
];

export default function TermsThirdParty() {
  return (
    <TermsSection
      id="third-party"
      number="11"
      title="Third-Party Providers"
      intro="Some parts of a journey may be delivered by independent businesses or service providers. Their own terms, policies and operating conditions may apply to the services they provide."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROVIDERS.map((provider) => {
          const Icon = provider.icon;

          return (
            <div
              key={provider.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                  <Icon className="h-5 w-5" />
                </div>

                <ExternalLink className="h-4 w-4 text-[#071A33]/20" />
              </div>

              <h3 className="mt-6 font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                {provider.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
                {provider.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-9 border-l-2 border-[#087E8B]/40 bg-[#FAF9F5] px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
          Where a third-party provider has its own cancellation,
          check-in, identification, safety or other conditions,
          those conditions may also apply to the relevant service.
        </p>
      </div>
    </TermsSection>
  );
}