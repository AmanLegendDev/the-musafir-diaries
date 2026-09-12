import PrivacySection from "./PrivacySection";
import { CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

const PAYMENT_POINTS = [
  {
    icon: CreditCard,
    title: "Payment processing",
    text: "Where online or other electronic payments are offered, payment transactions may be processed through third-party payment providers.",
  },
  {
    icon: ShieldCheck,
    title: "Payment information",
    text: "Depending on the payment method used, payment details may be handled directly by the relevant payment provider rather than being stored by The Musafir Diaries.",
  },
  {
    icon: ExternalLink,
    title: "Provider terms",
    text: "Payment providers may have their own privacy policies, security practices and terms that apply to transactions processed through their services.",
  },
];

export default function PrivacyPayments() {
  return (
    <PrivacySection
      id="payments"
      number="05"
      title="Payments & Transactions"
      intro="If your journey involves a payment, the way payment information is handled may depend on the payment method and service provider used for that transaction."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {PAYMENT_POINTS.map((item) => {
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

      <div className="mt-8 border-l-2 border-[#F59E0B]/60 bg-[#FAF9F5] px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#071A33]/60">
          We will not describe a specific payment gateway, processor
          or payment-storage practice here until the actual services
          used by the business are confirmed. This policy should be
          updated if those arrangements change.
        </p>
      </div>
    </PrivacySection>
  );
}