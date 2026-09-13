import Link from "next/link";
import { ArrowLeft, FolderTree } from "lucide-react";
import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Category from "@/models/category.model";

import CategoryForm from "@/components/admin/categories/CategoryForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const category =
    await Category.findById(id).lean();

  if (!category) {
    notFound();
  }

  const data = JSON.parse(
    JSON.stringify(category)
  );

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#1597C7]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Categories
      </Link>

      <div className="mt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1597C7]/10 text-[#1597C7]">
          <FolderTree className="h-5 w-5" />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1597C7]">
          Category Management
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071A33] sm:text-4xl">
          Edit Category
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Update category information, ordering,
          publishing settings and SEO.
        </p>
      </div>

      <div className="mt-8">
        <CategoryForm
          mode="edit"
          categoryId={id}
          defaultValues={data}
        />
      </div>
    </div>
  );
}