import connectDB from "@/lib/db";
import Testimonial from "@/models/testimonial.model";

export async function getActiveTestimonials() {
  await connectDB();

  const testimonials = await Testimonial.find({
    active: true,
  })
    .sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(testimonials));
}

export async function getFeaturedTestimonials(limit = 4) {
  await connectDB();

  const testimonials = await Testimonial.find({
    active: true,
    featured: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(testimonials));
}