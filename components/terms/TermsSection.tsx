import type { ReactNode } from "react";

type TermsSectionProps = {
  id?: string;
  number: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "white" | "cream";
};

export default function TermsSection({
  id,
  number,
  title,
  intro,
  children,
  tone = "white",
}: TermsSectionProps) {
  return (
    <section
      id={id}
      className={
        tone === "cream"
          ? "bg-[#FAF9F5]"
          : "bg-white"
      }
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:gap-16">
          {/* Section marker */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
                Terms
              </span>
            </div>

            <p className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#087E8B] sm:text-5xl">
              {number}
            </p>
          </div>

          {/* Content */}
          <div className="min-w-0 max-w-4xl">
            <h2 className="font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl">
              {title}
            </h2>

            {intro ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#071A33]/55">
                {intro}
              </p>
            ) : null}

            <div className="mt-8 text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}