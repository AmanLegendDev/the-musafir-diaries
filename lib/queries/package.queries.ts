import connectDB from "@/lib/db";

import Package from "@/models/package.model";

// Register models for populate()
import "@/models/destination.model";
import "@/models/category.model";

export async function getAllPackages() {
  await connectDB();

  const packages = await Package.find({
    status: "active",
  })
    .populate("destination", "name slug state")
    .populate("category", "name slug")
    .sort({
      featured: -1,
      createdAt: -1,
    })
    .lean();

    console.log(
  packages.map((p) => ({
    name: p.name,
    category: p.category,
    destination: p.destination,
  }))
);

  return JSON.parse(JSON.stringify(packages));
}

export async function getFeaturedPackages(limit = 6) {
  await connectDB();

  const packages = await Package.find({
    status: "active",
    featured: true,
  })
    .populate("destination", "name slug state")
    .populate("category", "name slug")
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(packages));
}

export async function getPackageBySlug(slug: string) {
  await connectDB();

  const packageData = await Package.findOne({
    slug,
    status: "active",
  })
    .populate("destination")
    .populate("category")
    .lean();

  if (!packageData) return null;

  return JSON.parse(JSON.stringify(packageData));
}

export async function getPackagesByCategory(
  categoryId: string,
  currentSlug: string,
  limit = 3
) {
  await connectDB();

  const packages = await Package.find({
    category: categoryId,
    slug: {
      $ne: currentSlug,
    },
    status: "active",
  })
    .populate("destination", "name slug state")
    .populate("category", "name slug")
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(packages));
}

export async function getRelatedPackages(
  destinationId: string,
  currentSlug: string,
  limit = 3
) {
  await connectDB();

  const packages = await Package.find({
    destination: destinationId,
    slug: {
      $ne: currentSlug,
    },
    status: "active",
  })
    .populate("destination", "name slug state")
    .populate("category", "name slug")
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(packages));
}