import NavBaar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero/Hero";
import Story from "@/components/home/story/StorySection";

import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FeaturedPackagesSection from "@/components/home/packages/FeaturedPackagesSection";
import TravelExperiencesSection from "@/components/home/experiences/TravelExperiencesSection";

import HotelsStaysSection from "@/components/home/hotels/HotelsStaysSection";
import WhyMusafirSection from "@/components/home/why-musafir/WhyMusafirSection";

import TestimonialsSection from "@/components/home/testimonials/TestimonialsSection";

import connectDB from "@/lib/db";

import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";
import Testimonial from "@/models/testimonial.model";

import type { HomeDestination } from "@/components/home/destinations/DestinationsSection";
import type { HomePackage } from "@/components/home/packages/FeaturedPackagesGrid";
import type { HomeHotel } from "@/components/home/hotels/HotelsStaysGrid";
import type { HomeTestimonial } from "@/components/home/testimonials/TestimonialsSection";

import Blog from "@/models/blog.model";

import type { HomeJournal } from "@/components/home/journal/JournalGrid";
import JournalSection from "@/components/home/journal/JournalSection";


import FAQSection from "@/components/home/faq/FAQSection";
import type { HomeFAQ } from "@/components/home/faq/FAQGrid";

import FAQ from "@/models/faq.model";


import FinalCTASection from "@/components/home/final-cta/FinalCTASection";

import Footer from "@/components/layout/footer/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Musafir Diaries | Coming Soon",

  description:
    "The Musafir Diaries is crafting a beautiful new travel experience from Shimla, Himachal Pradesh.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "The Musafir Diaries | Coming Soon",

    description:
      "A new travel experience is being crafted. The Musafir Diaries — Explore • Experience • Memories.",

    url: SITE_URL,

    siteName: "The Musafir Diaries",

    type: "website",
  },
};

export default async function Home() {
  await connectDB();

  // ─────────────────────────────────────
  // DESTINATIONS
  // ─────────────────────────────────────

  const destinationsFromDB = await Destination.find({
    status: "active",
  })
    .sort({
      featured: -1,
      featuredOrder: 1,
      createdAt: -1,
    })
    .lean();

  // ─────────────────────────────────────
  // FEATURED PACKAGES
  // ─────────────────────────────────────

  const packagesFromDB = await Package.find({
    status: "active",
    featured: true,
  })
    .populate("destination", "_id name slug")
    .sort({
      createdAt: -1,
    })
    .limit(3)
    .lean();

  // ─────────────────────────────────────
  // FEATURED HOTELS
  // ─────────────────────────────────────

  const hotelsFromDB = await Hotel.find({
    status: "active",
    featured: true,
  })
    .populate("destination", "_id name slug")
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .lean();

  // ─────────────────────────────────────
  // FEATURED TESTIMONIALS
  // ─────────────────────────────────────

  const testimonialsFromDB = await Testimonial.find({
    active: true,
    featured: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .limit(3)
    .lean();

  // ─────────────────────────────────────
  // SERIALIZE MONGODB DATA
  // ─────────────────────────────────────

  const destinations = JSON.parse(
    JSON.stringify(destinationsFromDB)
  ) as HomeDestination[];

  const packages = JSON.parse(
    JSON.stringify(packagesFromDB)
  ) as HomePackage[];

  const hotels = JSON.parse(
    JSON.stringify(hotelsFromDB)
  ) as HomeHotel[];

  const testimonials = JSON.parse(
    JSON.stringify(testimonialsFromDB)
  ) as HomeTestimonial[];


  // ─────────────────────────────────────
// FEATURED JOURNAL POSTS
// ─────────────────────────────────────

const postsFromDB = await Blog.find({
  status: "published",
  featured: true,
})
  .populate("category", "_id name slug")
  .sort({
    publishedAt: -1,
    createdAt: -1,
  })
  .limit(3)
  .lean();

const posts = JSON.parse(
  JSON.stringify(postsFromDB)
) as HomeJournal[];



// ─────────────────────────────────────
// FEATURED FAQS
// ─────────────────────────────────────

const faqsFromDB = await FAQ.find({
  status: "active",
  featured: true,
})
  .sort({
    displayOrder: 1,
    createdAt: -1,
  })
  .limit(6)
  .lean();

const faqs = JSON.parse(
  JSON.stringify(faqsFromDB)
) as HomeFAQ[];

  // ─────────────────────────────────────
  // HOMEPAGE
  // ─────────────────────────────────────




  return (
    <>
      <NavBaar />

      <Hero />

      <Story />

      <DestinationsSection
        destinations={destinations}
      />

      <FeaturedPackagesSection
        packages={packages}
      />

      <TravelExperiencesSection />

      <HotelsStaysSection
        hotels={hotels}
      />

      <WhyMusafirSection />

      <TestimonialsSection
        testimonials={testimonials}
      />
<JournalSection posts={posts} />

<FAQSection faqs={faqs} />

<FinalCTASection />

<Footer />
      {/* Journal will be added after Blog model is finalized */}
    </>
  );
}