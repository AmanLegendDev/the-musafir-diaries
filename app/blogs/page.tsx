import BlogHero from "@/components/blog/BlogHero";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import Newsletter from "@/components/blog/Newsletter";

import Blog from "@/models/blog.model";
import Category from "@/models/category.model";

import connectDB from "@/lib/db";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Journal | Altitude Escapes",
  description:
    "Discover destination guides, travel tips, luxury escapes and unforgettable Himalayan adventures.",
};

export default async function BlogPage() {
  await connectDB();

  const [featuredArticle, blogs, categories] = await Promise.all([
    Blog.findOne({
      featured: true,
      status: "published",
    })
      .populate("category", "name slug")
      .sort({ publishedAt: -1 })
      .lean(),

    Blog.find({
      status: "published",
    })
      .populate("category", "name slug")
      .sort({ publishedAt: -1 })
      .lean(),

    Category.find({
      isActive: true,
    })
      .select("name slug")
      .sort({ name: 1 })
      .lean(),
  ]);

  return (
    <main className="bg-white">

      <BlogHero />

      {featuredArticle && (
        <FeaturedArticle
          article={JSON.parse(JSON.stringify(featuredArticle))}
        />
      )}

      <BlogCategories
        categories={JSON.parse(JSON.stringify(categories))}
      />

      <BlogGrid
        blogs={JSON.parse(JSON.stringify(blogs))}
      />

      <Newsletter />

    </main>
  );
}