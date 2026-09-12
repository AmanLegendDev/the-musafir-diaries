"use client";

import { CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    text: "Your details stay private",
  },
  {
    icon: CheckCircle2,
    text: "Availability reviewed before confirmation",
  },
  {
    icon: MessageCircle,
    text: "Travel assistance when you need it",
  },
];

export default function BookingTrustBar() {
  return (
    <section className="border-y border-[#071A33]/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <div className="flex flex-col justify-center gap-4 md:flex-row md:items-center md:gap-8 lg:gap-12">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.text}
                className="flex items-center justify-center gap-2.5 text-center"
              >
                <Icon
                  size={16}
                  className="shrink-0 text-[#087E8B]"
                />

                <span className="text-xs font-medium tracking-wide text-[#071A33]/60 sm:text-sm">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}