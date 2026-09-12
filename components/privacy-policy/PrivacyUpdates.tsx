import PrivacySection from "./PrivacySection";
import { RefreshCcw } from "lucide-react";
import { PRIVACY_CONFIG } from "@/lib/config/privacy";

export default function PrivacyUpdates() {
  return (
    <PrivacySection
      id="policy-updates"
      number="10"
      title="Changes to This Privacy Policy"
      intro="As The Musafir Diaries grows, our website, services and technology may change. This policy may therefore need to change too."
      tone="cream"
    >
      <div className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
          <RefreshCcw className="h-5 w-5" />
        </div>

        <h3 className="mt-6 font-serif text-2xl tracking-[-0.02em] text-[#071A33]">
          Keeping the policy current
        </h3>

        <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
          <p>
            We may update this Privacy Policy when our practices,
            services, technology or legal obligations change.
          </p>

          <p>
            When we make changes, the updated version will be
            published on this page with a revised update date.
          </p>
        </div>

        <div className="mt-7 border-t border-[#071A33]/10 pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/35">
            Current version
          </p>

          <p className="mt-2 text-sm font-medium text-[#071A33]/65">
            Last updated: {PRIVACY_CONFIG.lastUpdated}
          </p>
        </div>
      </div>
    </PrivacySection>
  );
}