"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddCategoryPage() {


    const router = useRouter();


    const [name, setName] = useState("");
const [slug, setSlug] = useState("");
const [description, setDescription] = useState("");
const [displayOrder, setDisplayOrder] = useState(1);
const [status, setStatus] = useState("active");
const [seoTitle, setSeoTitle] = useState("");
const [seoDescription, setSeoDescription] = useState("");

const [errors, setErrors] = useState<{
  name?: string;
}>({});

const [loading, setLoading] = useState(false);

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

useEffect(() => {
  setSlug(generateSlug(name));
}, [name]);

function validate() {
  const newErrors: {
    name?: string;
  } = {};

  if (!name.trim()) {
    newErrors.name = "Category name is required.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}


async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const response = await fetch("/api/categories", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        slug,
        description,
        displayOrder,
        status,
        seoTitle,
        seoDescription,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Something went wrong.");
      return;
    }

    alert("Category Created Successfully!");

    router.push("/admin/categories");

    router.refresh();

  } catch (error) {

    console.error(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }
}


  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/admin/categories"
            className="text-sm font-medium text-sky-700 hover:underline"
          >
            ← Back to Categories
          </Link>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Add New Category
          </h1>

          <p className="mt-2 text-slate-500">
            Create a travel category that can be assigned to destinations and
            packages.
          </p>

        </div>

      </div>

      {/* Form Card */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Card Header */}

        <div className="border-b border-slate-200 px-8 py-6">

          <h2 className="text-xl font-semibold">
            Category Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Fill all required information carefully.
          </p>

        </div>

        {/* Form */}

       <form
  onSubmit={handleSubmit}
  className="space-y-8 p-8"
>

          {/* Basic Information */}

          <section>

            <h3 className="mb-5 text-lg font-semibold">
              Basic Details
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Category Name *
                </label>

               <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Adventure Tours"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
/>

{errors.name && (
  <p className="mt-2 text-sm text-red-600">
    {errors.name}
  </p>
)}

              </div>

              {/* Slug */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

               <input
  type="text"
  value={slug}
  readOnly
  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
/>

              </div>

            </div>

            {/* Description */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

           <textarea
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
/>

            </div>

          </section>

          {/* Extra Settings */}

          <section>

            <h3 className="mb-5 text-lg font-semibold">
              Additional Settings
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Display Order */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Display Order
                </label>

               <input
  type="number"
  value={displayOrder}
  onChange={(e) => setDisplayOrder(Number(e.target.value))}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
/>

              </div>

              {/* Status */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

               <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>

              </div>

            </div>

          </section>

          {/* SEO */}

          <section>

            <h3 className="mb-5 text-lg font-semibold">
              SEO Information
            </h3>

            <div className="space-y-6">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  SEO Title
                </label>

              <input
  type="text"
  value={seoTitle}
  onChange={(e) => setSeoTitle(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
/>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  SEO Description
                </label>

             <textarea
  rows={4}
  value={seoDescription}
  onChange={(e) => setSeoDescription(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
/>

              </div>

            </div>

          </section>

          {/* Buttons */}

          <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">

            <Link
              href="/admin/categories"
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </Link>
<button
  type="submit"
  disabled={loading}
  className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Creating Category..." : "Save Category"}
</button>

          </div>

        </form>

      </div>

    </div>
  );
}