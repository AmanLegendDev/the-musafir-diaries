import {
  CalendarCheck2,
  ClipboardCheck,
  FileCheck2,
  MessageSquareText,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Request reviewed",
    description:
      "Our team will review the journey, travel date and traveller details you submitted.",
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Availability checked",
    description:
      "Package and travel arrangements will be checked against your requested dates.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "We get in touch",
    description:
      "We will contact you using the details provided in your booking request.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Final confirmation",
    description:
      "Once the details are reviewed, the final quotation and confirmation can be shared.",
  },
];

export default function BookingNextSteps() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#071A33]/10 bg-white p-5 shadow-[0_20px_60px_rgba(7,26,51,0.055)] sm:p-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
            What happens next
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#071A33] sm:text-2xl">
            From request to confirmed journey
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#071A33]/55">
            Your request starts a review process. Here is what you can expect
            next.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-[#071A33]/10 bg-[#FAF9F5] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#071A33]/25">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-semibold text-[#071A33]">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#071A33]/55">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}