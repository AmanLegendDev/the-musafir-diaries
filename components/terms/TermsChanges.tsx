import TermsSection from "./TermsSection";
import {
  RefreshCcw,
  CalendarDays,
} from "lucide-react";

import { TERMS_CONFIG } from "@/lib/config/terms";

export default function TermsChanges() {
  return (
    <TermsSection
      id="terms-updates"
      number="15"
      title="Changes to These Terms"
      intro="As the business, website and travel services evolve, these Terms & Conditions may need to evolve with them."
      tone="cream"
    >
      <div className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
          <RefreshCcw className="h-5 w-5" />
        </div>

        <h3 className="mt-6 font-serif text-2xl tracking-[-0.02em] text-[#071A33]">
          Keeping the terms current
        </h3>

        <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
          <p>
            We may update these Terms & Conditions when our
            services, business practices, technology or applicable
            requirements change.
          </p>

          <p>
            The updated version will be published on this page with
            a revised update date. Travellers should review the
            applicable terms before making a booking.
          </p>
        </div>

        <div className="mt-7 flex items-center gap-3 border-t border-[#071A33]/10 pt-5">
          <CalendarDays className="h-4 w-4 text-[#087E8B]" />

          <p className="text-sm font-medium text-[#071A33]/60">
            Last updated: {TERMS_CONFIG.lastUpdated}
          </p>
        </div>
      </div>
    </TermsSection>
  );
}