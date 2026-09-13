import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Testimonial from "@/models/testimonial.model";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;

  await connectDB();

  const testimonial = await Testimonial.findById(id).lean();

  if (!testimonial) {
    notFound();
  }

  const serialized = JSON.parse(JSON.stringify(testimonial));

  return (
    <TestimonialForm
      mode="edit"
      initialData={serialized}
    />
  );
}