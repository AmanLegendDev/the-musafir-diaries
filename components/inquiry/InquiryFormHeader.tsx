import { Compass, MapPinned } from "lucide-react";

export default function InquiryFormHeader() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F4F5] text-[#087E8B]">
          <Compass size={18} strokeWidth={1.8} />
        </span>

        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
          Your Journey
        </span>
      </div>

      <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-[#071A33] sm:text-4xl">
        Tell us how you want to travel.
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#071A33]/65 sm:text-base">
        Share a few details about your trip and we&apos;ll use them
        to understand what kind of Himalayan journey you&apos;re
        looking for.
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs text-[#071A33]/55">
        <MapPinned size={15} className="text-[#087E8B]" />
        <span>Trip details are reviewed before any final quotation.</span>
      </div>
    </div>
  );
}