import { LockKeyhole } from "lucide-react";

export default function InquiryPrivacyNote() {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#071A33]/8 bg-[#F7F6F1] p-4">
      <div className="mt-0.5 shrink-0 text-[#087E8B]">
        <LockKeyhole size={17} strokeWidth={1.8} />
      </div>

      <p className="text-xs leading-5 text-[#071A33]/60">
        We use the details you provide to understand your
        travel request and respond to your inquiry. Your
        information may be shared with relevant travel or
        service partners when needed to plan your trip.
        Please avoid submitting passwords, payment details,
        or other sensitive information.
      </p>
    </div>
  );
}