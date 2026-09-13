import connectDB from "@/lib/db";
import Category from "@/models/category.model";

import CategoryListing from "@/components/admin/categories/CategoryListing";

export const dynamic = "force-dynamic";

async function getCategories() {
  await connectDB();

  const categories = await Category.find({})
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(categories));
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <CategoryListing initialCategories={categories} />
  );
}