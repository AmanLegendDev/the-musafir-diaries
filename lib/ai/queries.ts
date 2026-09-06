import Package from "@/models/package.model";
import Blog from "@/models/blog.model";
import Gallery from "@/models/gallery.model";
import Testimonial from "@/models/testimonial.model";

import connectDB from "@/lib/db";

import type { AIIntent } from "./intent";
import {
  buildLimit,
  buildPackageFilters,
  buildSort,
} from "./filters";

export async function getRelevantPackages(
  intent: AIIntent
) {
  await connectDB();

  const filters =
    buildPackageFilters(intent);

  const sort =
    buildSort(intent);

  const limit =
    buildLimit(intent);

  return await Package.find(filters)
    .populate("destination", "name slug")
    .populate("category", "name slug")
    .sort(sort)
    .limit(limit)
    .lean();
}

export async function getFeaturedPackages() {
  await connectDB();

  return await Package.find({
    status: "active",
    featured: true,
  })
    .populate("destination", "name slug")
    .populate("category", "name slug")
    .sort({
      discountedPrice: 1,
    })
    .limit(6)
    .lean();
}

export async function getBlogs() {
  await connectDB();

  return await Blog.find({
    status: "published",
  })
    .sort({
      publishedAt: -1,
    })
    .limit(5)
    .lean();
}

export async function getGalleryImages() {
  await connectDB();

  return await Gallery.find({
    active: true,
  })
    .sort({
      featured: -1,
      order: 1,
    })
    .limit(12)
    .lean();
}

export async function getTestimonials() {
  await connectDB();

  return await Testimonial.find({
    active: true,
  })
    .sort({
      featured: -1,
      order: 1,
    })
    .limit(5)
    .lean();
}