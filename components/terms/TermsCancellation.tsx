import TermsSection from "./TermsSection";
import {
  CalendarX2,
  CircleAlert,
  RefreshCcw,
} from "lucide-react";

const CANCELLATION_POINTS = [
  {
    icon: CalendarX2,
    title: "Cancellation by the traveller",
    text: "If you need to cancel a confirmed journey, please contact us as soon as possible. Any refund or cancellation charge will depend on the booking terms and the services already arranged.",
  },
  {
    icon: RefreshCcw,
    title: "Refunds",
    text: "Refund eligibility may be affected by the cancellation policies of hotels, transport operators, activity providers or other suppliers involved in the journey.",
  },
  {
    icon: CircleAlert,
    title: "Non-refundable components",
    text: "Certain services or charges may be non-refundable once confirmed or used. The applicable conditions should be communicated as part of the relevant booking.",
  },
];

export default function TermsCancellation() {
  return (
    <TermsSection
      id="cancellation"
      number="04"
      title="Cancellation & Refunds"
      intro="Cancellation terms can vary significantly between journeys because different travel services may have different supplier policies."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {CANCELLATION_POINTS.map((item) => {
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

      <div className="mt-9 border-l-2 border-[#F06A5B]/60 bg-white px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
          <strong className="font-semibold text-[#071A33]">
            Client-specific policy required:
          </strong>{" "}
          The final version of this section should be updated with
          The Musafir Diaries&apos; actual cancellation slabs,
          rescheduling rules, refund process and applicable
          non-refundable charges before accepting paid bookings.
        </p>
      </div>
    </TermsSection>
  );
}