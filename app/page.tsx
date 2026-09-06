export const dynamic = "force-dynamic";
import Package from "@/models/package.model";
import Testimonial from "@/models/testimonial.model";
import Hero from "@/components/home/Hero/Hero";
import {
  FeaturedDestinations,
} from "@/components/home/featured-destinations";
import GalleryModel from "@/models/gallery.model";
import AIWidget from "@/components/ai/AIWidget";
import {
  Footer,
} from "@/components/footer";
import {
  CTA,
} from "@/components/home/luxury-cta";

import FAQ from "@/components/home/faq/FAQ";


import {
  Gallery,
} from "@/components/home/gallery";



import {
  Testimonials,
} from "@/components/home/testimonials";

import {
  WhyChooseUs,
} from "@/components/home/why-choose-us";


import {
  FeaturedPackages,
} from "@/components/home/featured-packages";

import {
  LatestBlogs,
} from "@/components/home/latest-blogs";

import Blog from "@/models/blog.model";

import "@/models/category.model";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

export default async function Home() {
  await connectDB();

  const featuredDestinations = await Destination.find({
    featured: true,
    status: "active",
  })
    .sort({
      featuredOrder: 1,
    })
    .limit(6)
    .lean();

    const featuredPackages = await Package.find({
  featured: true,
  status: "active",
})
  .populate("destination", "name")
  .sort({ createdAt: -1 })
  .limit(6)
  .lean();

  const featuredTestimonials =
  await Testimonial.find({
    featured: true,
    active: true,
  })
    .sort({
      order: 1,
    })
    .limit(6)
    .lean();

    const latestBlogs =
  await Blog.find({
    status: "published",
  })
    .populate(
      "category",
      "name slug"
    )
    .sort({
      publishedAt: -1,
    })
    .limit(3)
    .lean();




    const featuredGallery =
  await GalleryModel.find({
    featured: true,
    active: true,
  })
    .sort({
      order: 1,
    })
    .limit(6)
    .lean();

  

  return (
    <>
      <Hero />

      <FeaturedDestinations
        destinations={JSON.parse(
          JSON.stringify(featuredDestinations)
        )}
      />

      <FeaturedPackages
  packages={JSON.parse(JSON.stringify(featuredPackages))}
/>

<WhyChooseUs />

<Testimonials
  testimonials={JSON.parse(
    JSON.stringify(featuredTestimonials)
  )}
/>

<LatestBlogs
  blogs={JSON.parse(
    JSON.stringify(latestBlogs)
  )}
/>

<Gallery
  images={JSON.parse(
    JSON.stringify(featuredGallery)
  )}
/>

<FAQ />
<CTA />
<AIWidget />

<Footer />


    </>
  );
}