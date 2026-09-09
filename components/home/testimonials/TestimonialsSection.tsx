import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";

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
      </div>
    </section>
  );
}