import {
  FileSearch,
  MessageCircle,
  Route,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: FileSearch,
    title: "We review your request",
    description:
      "The details you submitted give us the starting point for understanding your trip.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "We discuss the details",
    description:
      "The next conversation can clarify preferences, practical requirements and any questions you have.",
  },
  {
    number: "03",
    icon: Route,
    title: "Your travel plan takes shape",
    description:
      "Itinerary possibilities, availability and pricing can then be discussed before you decide on the next step.",
  },
];

export default function InquiryNextSteps() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-[2rem] border border-[#071A33]/8 bg-[#071A33] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5DC4CC]">
              What happens next
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
              From inquiry to itinerary.
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/60">
              An inquiry is the start of the planning
              conversation — it is not a final booking
              confirmation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#5DC4CC]">
                      {step.number}
                    </span>

                    <Icon
                      size={19}
                      strokeWidth={1.6}
                      className="text-[#5DC4CC]"
                    />
                  </div>

                  <h3 className="mt-7 text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-white/50">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}