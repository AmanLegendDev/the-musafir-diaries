import connectDB from "@/lib/db";
import Category from "@/models/category.model";

/* ---------------------------------------- */
/* Get All Categories */
/* ---------------------------------------- */

export async function getAllCategories() {
  await connectDB();

  const categories = await Category.find({
    status: "active",
  })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(categories));
}

/* ---------------------------------------- */
/* Get Category By Slug */
/* ---------------------------------------- */

export async function getCategoryBySlug(
  slug: string
) {
  await connectDB();

  const category = await Category.findOne({
    slug,
    status: "active",
  }).lean();

  if (!category) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(category)
  );
}

/* ---------------------------------------- */
/* Get Category By Id */
/* ---------------------------------------- */

export async function getCategoryById(
  id: string
) {
  await connectDB();

  const category =
    await Category.findById(id).lean();

  if (!category) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(category)
  );
}