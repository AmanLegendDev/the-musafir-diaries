import PrivacySection from "./PrivacySection";
import {
  Database,
  Lock,
  ShieldCheck,
} from "lucide-react";

const SECURITY_POINTS = [
  {
    icon: Lock,
    title: "Reasonable safeguards",
    text: "We take reasonable steps intended to protect personal information against unauthorised access, misuse, alteration or disclosure.",
  },
  {
    icon: Database,
    title: "Limited access",
    text: "Access to information should be limited to people or providers who reasonably need it for the relevant business, service or operational purpose.",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing improvement",
    text: "As our business and technology evolve, we may review and improve the measures we use to protect information.",
  },
];

export default function PrivacySecurity() {
  return (
    <PrivacySection
      id="security"
      number="06"
      title="Security"
      intro="We take the privacy and security of the information entrusted to us seriously. We use reasonable measures designed to protect personal information in the context of our business and website."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {SECURITY_POINTS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-[#071A33]/10 pt-7">
        <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33]">
          A realistic promise
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
          No method of transmitting or storing information over
          the internet can be guaranteed to be completely secure.
          While we work to protect information using reasonable
          safeguards, we cannot promise absolute security.
        </p>
      </div>
    </PrivacySection>
  );
}