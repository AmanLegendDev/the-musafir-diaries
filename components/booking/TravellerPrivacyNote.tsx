import {
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export default function TravellerPrivacyNote() {
  return (
    <div
      className="
        border-t border-[#071A33]/10
        pt-7
      "
    >
      <div className="flex items-start gap-4">
        {/* Icon */}

        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[#087E8B]/10
            text-[#087E8B]
          "
        >
          <LockKeyhole
            size={18}
            strokeWidth={1.8}
          />
        </div>

        {/* Content */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-[#071A33]">
              Your details stay purposeful
            </h4>

            <ShieldCheck
              size={14}
              className="text-[#087E8B]"
            />
          </div>

          <p className="mt-1 max-w-2xl text-xs leading-6 text-[#071A33]/45">
            We use the information you provide
            to respond to your request, coordinate
            your journey and communicate important
            travel details. Information may be shared
            with relevant service providers when
            necessary to arrange your trip.
          </p>

          <p className="mt-2 text-xs font-medium text-[#087E8B]">
            We ask only for what helps us plan better.
          </p>
        </div>
      </div>
    </div>
  );
}