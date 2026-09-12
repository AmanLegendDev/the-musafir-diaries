import PrivacySection from "./PrivacySection";
import { ArrowUpRight, Globe2, ShieldAlert } from "lucide-react";

export default function PrivacyThirdParty() {
  return (
    <PrivacySection
      id="third-party-links"
      number="09"
      title="Third-Party Websites & Services"
      intro="Our website may contain links or integrations that take you to services operated by other organisations."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8">
          <Globe2 className="h-5 w-5 text-[#087E8B]" />

          <h3 className="mt-5 font-serif text-2xl tracking-[-0.02em] text-[#071A33]">
            External websites
          </h3>

          <p className="mt-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
            Links to websites such as social platforms, maps,
            payment services, booking systems or other external
            resources may take you outside our website.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#087E8B]">
            <span>Different policies may apply</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#071A33]/10 bg-[#FAF9F5] p-6 sm:p-8">
          <ShieldAlert className="h-5 w-5 text-[#F06A5B]" />

          <h3 className="mt-5 font-serif text-2xl tracking-[-0.02em] text-[#071A33]">
            Third-party responsibility
          </h3>

          <p className="mt-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
            We are not responsible for the privacy practices,
            security, content or policies of third-party websites
            and services that operate independently from us.
          </p>
        </div>
      </div>
    </PrivacySection>
  );
}