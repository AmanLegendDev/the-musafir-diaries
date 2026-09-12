import {
  Baby,
  CalendarX2,
  Clock3,
  FileText,
} from "lucide-react";

type Policies = {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  childPolicy: string;
  other: string;
};

type Props = {
  policies: Policies;
};

type PolicyItem = {
  label: string;
  value: string;
  icon: typeof Clock3;
};

export default function HotelPolicies({
  policies,
}: Props) {
  const items: PolicyItem[] = [
    {
      label: "Check-in",
      value: policies.checkIn,
      icon: Clock3,
    },
    {
      label: "Check-out",
      value: policies.checkOut,
      icon: Clock3,
    },
    {
      label: "Cancellation",
      value: policies.cancellation,
      icon: CalendarX2,
    },
    {
      label: "Child policy",
      value: policies.childPolicy,
      icon: Baby,
    },
    {
      label: "Other information",
      value: policies.other,
      icon: FileText,
    },
  ].filter((item) => item.value?.trim());

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="policies"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Intro */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#087E8B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
                Before You Stay
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#071A33] sm:text-4xl">
              Good to know
              <span className="block text-[#087E8B]">
                before you arrive.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#071A33]/50">
              A few useful details to help you plan your
              stay with confidence.
            </p>
          </div>

          {/* Policies */}
          <div className="overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-[#FAF9F5]">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`flex gap-4 px-6 py-6 sm:px-7 ${
                    index !== items.length - 1
                      ? "border-b border-[#071A33]/8"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#087E8B] shadow-sm">
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#071A33]/35">
                      {item.label}
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#071A33]/65">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}