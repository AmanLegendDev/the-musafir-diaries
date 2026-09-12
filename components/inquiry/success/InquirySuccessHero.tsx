import { Check } from "lucide-react";

interface InquirySuccessHeroProps {
  inquiryNumber?: string;
}

export default function InquirySuccessHero({
  inquiryNumber,
}: InquirySuccessHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#071A33] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/5" />
      <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full border border-white/5" />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/40 bg-[#087E8B]/15 text-[#5DC4CC]">
          <Check size={30} strokeWidth={1.8} />
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#5DC4CC]">
          Inquiry received
        </p>

        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Your journey has a beginning.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
          Thank you for sharing your travel plans with The
          Musafir Diaries. Your inquiry has been recorded and
          is ready for review.
        </p>

        {inquiryNumber && (
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
            <span className="text-xs text-white/45">
              Reference
            </span>

            <span className="font-mono text-sm font-semibold tracking-wide text-white">
              {inquiryNumber}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}