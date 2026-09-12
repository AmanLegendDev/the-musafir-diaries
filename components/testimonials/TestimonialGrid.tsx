import TestimonialCard, {
  type TestimonialData,
} from "./TestimonialCard";

type Props = {
  testimonials: TestimonialData[];
};

export default function TestimonialGrid({
  testimonials,
}: Props) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <div
      id="guest-stories"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial._id}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}