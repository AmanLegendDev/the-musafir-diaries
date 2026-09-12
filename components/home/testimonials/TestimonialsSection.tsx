import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export interface HomeTestimonial {
  _id: string;
  name: string;
  designation?: string;
  location?: string;
  image: string;
  rating: number;
  review: string;
  trip?: string;
  featured: boolean;
  order: number;
  active: boolean;
}

interface TestimonialsSectionProps {
  testimonials: HomeTestimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#FAF9F5] py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <TestimonialsHeader />

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <TestimonialsGrid testimonials={testimonials} />
        </div>
        <div className="mt-14 flex justify-center sm:mt-16 lg:mt-20">
  <Link
    href="/testimonials"
    className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.02em] text-[#071A33] transition-colors duration-200 hover:text-[#087E8B] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/10"
  >
    <span className="relative pb-1">
      View all testimonials

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#071A33]/30 transition-transform duration-300 group-hover:scale-x-0"
      />
    </span>

    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071A33]/15 bg-white transition-all duration-200 group-hover:border-[#087E8B]/40 group-hover:bg-[#087E8B] group-hover:text-white">
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={1.7}
      />
    </span>
  </Link>
</div>
      </div>
    </section>
  );
}