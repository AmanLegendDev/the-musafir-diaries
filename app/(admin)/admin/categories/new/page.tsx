import Link from "next/link";
import { ArrowLeft, FolderTree } from "lucide-react";

import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function AddCategoryPage() {
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
          Add New Category
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Create a category to organize your travel
          packages and experiences.
        </p>
      </div>

      <div className="mt-8">
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}