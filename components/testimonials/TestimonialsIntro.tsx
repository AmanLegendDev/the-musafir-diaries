import { Heart, Mountain } from "lucide-react";

export default function TestimonialsIntro() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          {/* Eyebrow */}
          <div>
            <div className="flex items-center gap-3 text-[#087E8B]">
              <span className="h-px w-10 bg-[#087E8B]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                The people behind the memories
              </span>
            </div>

            <div className="mt-8 flex gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#087E8B]/8 text-[#087E8B]">
                <Mountain className="h-5 w-5" />
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Editorial copy */}
          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#071A33] sm:text-4xl lg:text-5xl">
              Every journey is different.
              <span className="block text-[#071A33]/45">
                The memories stay.
              </span>
            </h2>

            <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8">
              <p>
                The best way to understand a journey is often through the
                people who have lived it.
              </p>

              <p>
                These are the stories, impressions, and moments our guests have
                chosen to share from their travels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}