import {
  Compass,
  Sparkles,
} from "lucide-react";

export default function TravellerIntro() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[24px]
        border border-[#071A33]/10
        bg-[#FAF9F5]
        p-5 sm:p-6
      "
    >
      {/* Decorative element */}

      <div
        aria-hidden="true"
        className="
          absolute -right-12 -top-12
          h-32 w-32 rounded-full
          bg-[#087E8B]/8
          blur-2xl
        "
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}

        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-2xl
            bg-[#071A33]
            text-[#7FD8DE]
          "
        >
          <Compass
            size={20}
            strokeWidth={1.7}
          />
        </div>

        {/* Content */}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#071A33]">
              Let&apos;s begin your journey
            </h3>

            <Sparkles
              size={14}
              className="text-[#F59E0B]"
            />
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#071A33]/55">
            Start with a few details about the
            person we&apos;ll be coordinating with.
            It only takes a moment.
          </p>
        </div>
      </div>
    </div>
  );
}