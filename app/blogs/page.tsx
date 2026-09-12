import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import BlogHero from "@/components/blog/listing/BlogHero";
import BlogListing from "@/components/blog/listing/BlogListing";
import BlogCTA from "@/components/blog/listing/BlogCTA";
import { Suspense } from "react";

import {
  getBlogCategories,
  getFeaturedBlog,
  getPublishedBlogs,
} from "@/lib/queries/blog.queries";

export const metadata: Metadata = {
  title: "Travel Stories & Himalayan Guides | The Musafir Diaries",
  description:
    "Explore travel stories, Himalayan guides, destination inspiration and thoughtful journeys from The Musafir Diaries.",
  keywords: [
    "Himachal Pradesh travel blog",
    "Himalayan travel stories",
    "Himachal travel guides",
    "Shimla travel guide",
    "Manali travel guide",
    "Spiti travel guide",
    "The Musafir Diaries",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Travel Stories & Himalayan Guides | The Musafir Diaries",
    description:
      "Stories, guides and inspiration for your next Himalayan journey.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Stories & Himalayan Guides | The Musafir Diaries",
    description:
      "Stories, guides and inspiration for your next Himalayan journey.",
  },
};

export default async function BlogPage() {
  const [blogs, featuredBlog, categories] = await Promise.all([
    getPublishedBlogs(),
    getFeaturedBlog(),
    getBlogCategories(),
  ]);

  const featuredId = featuredBlog?._id
    ? String(featuredBlog._id)
    : null;

  const listingBlogs = featuredId
    ? blogs.filter((blog: { _id: string }) => String(blog._id) !== featuredId)
    : blogs;

  return (
    <>
     

      <main>
        <BlogHero />
        <Suspense fallback={null}>
          <BlogListing
            blogs={listingBlogs}
            featuredBlog={featuredBlog}
            categories={categories}
          />
        </Suspense>

        <BlogCTA />
      </main>

     
    </>
  );
}