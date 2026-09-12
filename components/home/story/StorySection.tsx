import Link from "next/link";
import { ArrowRight } from "lucide-react";

import StoryContent from "./StoryContent";
import StoryImage from "./StoryImage";
import { STORY } from "./storyData";

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] py-24 lg:py-32">
      {/* Editorial lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 h-px w-40 bg-[#087E8B]/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 right-0 h-px w-52 bg-[#F59E0B]/20"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Story */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <StoryContent />
          <StoryImage />
        </div>

        {/* Bottom Stats */}
        <div className="mt-24 grid grid-cols-3 gap-6 border-t border-[#071A33]/10 pt-10">
          {STORY.stats.map((item) => (
            <div key={item.label} className="text-center">
              <h3 className="font-serif text-3xl text-[#071A33] md:text-4xl">
                {item.value}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#0D2747]/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story CTA */}
       
      </div>
    </section>
  );
}