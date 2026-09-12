import TermsSection from "./TermsSection";
import {
  Camera,
  Code2,
  Copyright,
  Palette,
} from "lucide-react";

const ASSETS = [
  {
    icon: Palette,
    title: "Brand identity",
    text: "The Musafir Diaries name, logo, visual identity and related brand elements are protected assets of the business or their respective owners.",
  },
  {
    icon: Camera,
    title: "Photography & media",
    text: "Images, videos, illustrations and other visual material published on the website may be owned by The Musafir Diaries or licensed from their respective creators or providers.",
  },
  {
    icon: Code2,
    title: "Website content",
    text: "Website design, code, written content, graphics, layouts and other original material should not be copied, reproduced or commercially reused without appropriate permission.",
  },
];

export default function TermsIntellectualProperty() {
  return (
    <TermsSection
      id="intellectual-property"
      number="14"
      title="Intellectual Property"
      intro="The website and its content are part of The Musafir Diaries brand and should be used respectfully."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ASSETS.map((item) => {
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

      <div className="mt-9 flex gap-4 border-l-2 border-[#087E8B]/40 bg-[#FAF9F5] px-5 py-5 sm:px-6">
        <Copyright className="mt-1 h-5 w-5 shrink-0 text-[#087E8B]" />

        <p className="text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
          You may view and use the website for your personal,
          non-commercial travel planning purposes. Reproduction,
          redistribution or commercial use of protected material
          requires appropriate permission.
        </p>
      </div>
    </TermsSection>
  );
}