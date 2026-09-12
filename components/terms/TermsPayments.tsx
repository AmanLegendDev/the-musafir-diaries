import TermsSection from "./TermsSection";
import {
  CreditCard,
  Clock3,
  ReceiptText,
} from "lucide-react";

const PAYMENT_POINTS = [
  {
    icon: CreditCard,
    title: "Payment requirements",
    text: "A booking may require an advance payment, partial payment or full payment depending on the journey and the arrangements agreed with the traveller.",
  },
  {
    icon: Clock3,
    title: "Payment timelines",
    text: "Where a specific payment deadline applies, it will be communicated as part of the relevant booking or quotation.",
  },
  {
    icon: ReceiptText,
    title: "Payment records",
    text: "Travellers should retain relevant payment confirmations, receipts or transaction records for their own reference.",
  },
];

export default function TermsPayments() {
  return (
    <TermsSection
      id="payments"
      number="03"
      title="Payments"
      intro="Payment requirements can vary depending on the journey, suppliers involved and booking arrangements."
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

      <div className="mt-9 rounded-2xl border border-[#F59E0B]/20 bg-[#FAF9F5] p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#F59E0B]">
          Important
        </p>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
          Exact advance-payment amounts, balance-payment deadlines
          and payment methods should be confirmed in the booking
          information provided for the specific journey. These
          details may vary and should not be assumed from a general
          website description.
        </p>
      </div>
    </TermsSection>
  );
}