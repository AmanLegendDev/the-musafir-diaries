import PrivacySection from "./PrivacySection";
import { Check, Mail } from "lucide-react";

const RIGHTS = [
  "Ask what personal information we may hold about you.",
  "Request correction of information that is inaccurate or incomplete.",
  "Ask questions about how your information is being used.",
  "Request that we stop or limit certain communications where applicable.",
  "Raise a concern about the way your personal information has been handled.",
];

export default function PrivacyRights() {
  return (
    <PrivacySection
      id="your-privacy-rights"
      number="07"
      title="Your Privacy Rights"
      intro="Depending on applicable law and the circumstances in which we process your information, you may have rights relating to your personal information."
      tone="cream"
    >
      <div className="space-y-3">
        {RIGHTS.map((right) => (
          <div
            key={right}
            className="flex gap-4 rounded-xl border border-[#071A33]/8 bg-white px-5 py-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#087E8B]/10 text-[#087E8B]">
              <Check className="h-3.5 w-3.5" />
            </span>

            <p className="text-sm leading-6 text-[#071A33]/55 sm:text-base sm:leading-7">
              {right}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 rounded-2xl bg-[#071A33] p-6 text-white sm:p-8">
        <Mail className="h-5 w-5 text-[#8ED9DF]" />

        <h3 className="mt-5 font-serif text-2xl tracking-[-0.02em]">
          Want to ask about your information?
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          Contact us using the details provided at the end of this
          policy. We may need to verify your identity before
          responding to certain requests.
        </p>
      </div>
    </PrivacySection>
  );
}