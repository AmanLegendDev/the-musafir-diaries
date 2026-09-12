import TermsSection from "./TermsSection";
import {
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const LIMITATIONS = [
  {
    title: "Travel involves uncertainty",
    text: "Actual travel conditions can differ from plans because of weather, roads, traffic, supplier availability, local restrictions and other circumstances.",
  },
  {
    title: "Third-party services",
    text: "Where an independent provider delivers a service, that provider may be responsible for the direct operation of its own service, subject to applicable law and the relevant arrangements.",
  },
  {
    title: "Reasonable care",
    text: "We aim to coordinate and communicate travel arrangements responsibly, but circumstances outside our reasonable control may affect the delivery of a journey.",
  },
];

export default function TermsLiability() {
  return (
    <TermsSection
      id="liability"
      number="12"
      title="Liability"
      intro="We aim to arrange journeys carefully and communicate important changes, while recognising that travel—particularly in mountainous regions—can involve risks and circumstances that cannot always be controlled."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {LIMITATIONS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
          >
            <ShieldCheck className="h-5 w-5 text-[#087E8B]" />

            <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#071A33]/50 sm:leading-8">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex gap-4 rounded-2xl border border-[#F06A5B]/20 bg-white p-6 sm:p-8">
        <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#F06A5B]" />

        <div>
          <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
            Important
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
            Nothing in these Terms & Conditions is intended to
            exclude or limit any liability that cannot lawfully be
            excluded or limited under applicable law.
          </p>
        </div>
      </div>
    </TermsSection>
  );
}