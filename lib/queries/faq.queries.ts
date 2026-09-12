import connectDB from "@/lib/db";

import FAQ from "@/models/faq.model";

import "@/models/destination.model";
import "@/models/package.model";
import "@/models/hotel.model";

export async function getActiveFAQs() {
  await connectDB();

  const faqs = await FAQ.find({
    status: "active",
  })
    .populate({
      path: "destination",
      select: "name slug",
      match: { status: "active" },
    })
    .populate({
      path: "package",
      select: "name slug",
      match: { status: "active" },
    })
    .populate({
      path: "hotel",
      select: "name slug",
      match: { status: "active" },
    })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(faqs));
}

export async function getFeaturedFAQs(limit = 5) {
  await connectDB();

  const faqs = await FAQ.find({
    status: "active",
    featured: true,
  })
    .populate({
      path: "destination",
      select: "name slug",
      match: { status: "active" },
    })
    .populate({
      path: "package",
      select: "name slug",
      match: { status: "active" },
    })
    .populate({
      path: "hotel",
      select: "name slug",
      match: { status: "active" },
    })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(faqs));
}

export async function getFAQCategories() {
  await connectDB();

  const faqs = await FAQ.find({
    status: "active",
    category: {
      $exists: true,
      $nin: ["", null],
    },
  })
    .select("category")
    .lean();

  const categories = new Set<string>();

  for (const faq of faqs) {
    if (typeof faq.category !== "string") {
      continue;
    }

    const category = faq.category.trim();

    if (category) {
      categories.add(category);
    }
  }

  return Array.from(categories).sort((a, b) =>
    a.localeCompare(b)
  );
}