import TermsSection from "./TermsSection";
import {
  FileCheck2,
  IdCard,
  Stamp,
} from "lucide-react";

const DOCUMENT_POINTS = [
  {
    icon: IdCard,
    title: "Valid identification",
    text: "Travellers should carry valid identification and any documents reasonably required for the services included in their journey.",
  },
  {
    icon: Stamp,
    title: "Permits where applicable",
    text: "Certain destinations or activities may require permits, permissions or other documentation. Where applicable, the relevant requirements should be confirmed before travel.",
  },
  {
    icon: FileCheck2,
    title: "Traveller responsibility",
    text: "Travellers are responsible for ensuring that their personal documents are valid, accurate and available when required.",
  },
];

export default function TermsDocuments() {
  return (
    <TermsSection
      id="documents"
      number="09"
      title="Documents & Permits"
      intro="Some journeys may require identification, permits or other documentation. Requirements can vary by destination, route and activity."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {DOCUMENT_POINTS.map((item) => {
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

      <div className="mt-9 rounded-2xl bg-[#071A33] p-6 text-white sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8ED9DF]">
          Before departure
        </p>

        <p className="mt-3 max-w-3xl font-serif text-xl leading-relaxed tracking-[-0.015em] text-white/90 sm:text-2xl">
          Check the documents required for your particular
          destination and journey before you travel.
        </p>
      </div>
    </TermsSection>
  );
}