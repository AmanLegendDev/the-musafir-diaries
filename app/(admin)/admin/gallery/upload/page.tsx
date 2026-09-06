"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";

export default function UploadGalleryPage() {

  const [form, setForm] = useState({
  title: "",
  description: "",
  image: "",
  category: "general",
  alt: "",
  featured: false,
  order: 0,
  active: true,
});
const router = useRouter();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const updateField = (
  key: keyof typeof form,
  value: any
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const handleSubmit = async () => {
  try {
    setError("");

    if (!form.title.trim()) {
      return setError("Title is required.");
    }

    if (!form.image) {
      return setError("Please upload an image.");
    }

    setLoading(true);

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong.");
    }

    router.push("/admin/gallery");
    router.refresh();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="mx-auto max-w-5xl">

    <Link
      href="/admin/gallery"
      className="text-[#0F4C81]"
    >
      ← Back to Gallery
    </Link>

    <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

      <h1 className="text-3xl font-bold">
        Upload Gallery Image
      </h1>

      <p className="mt-2 text-slate-500">
        Upload and organize media for your website.
      </p>

      <div className="mt-8 space-y-6">

        {/* Title */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Title
          </label>

          <input
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            className="w-full rounded-xl border p-3"
            placeholder="Office Team"
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Description
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Image */}

        <div>

          <label className="mb-3 block text-sm font-semibold">
            Gallery Image
          </label>

          <CloudinaryUploader
            multiple={false}
            value={form.image}
            onChange={(url) =>
              updateField("image", url)
            }
          />

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Category
          </label>

          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          >
            <option value="general">
              General
            </option>

            <option value="hero">
              Hero
            </option>

            <option value="destination">
              Destination
            </option>

            <option value="package">
              Package
            </option>

            <option value="blog">
              Blog
            </option>

            <option value="team">
              Team
            </option>

            <option value="office">
              Office
            </option>

            <option value="customer">
              Customer
            </option>

            <option value="testimonial">
              Testimonial
            </option>

          </select>

        </div>

        {/* Alt */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Alt Text
          </label>

          <input
            value={form.alt}
            onChange={(e) =>
              updateField("alt", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Order */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Display Order
          </label>

          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              updateField(
                "order",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Checkboxes */}

        <div className="flex gap-8">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                updateField(
                  "featured",
                  e.target.checked
                )
              }
            />

            Featured

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                updateField(
                  "active",
                  e.target.checked
                )
              }
            />

            Active

          </label>

        </div>

{error && (
  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
    {error}
  </div>
)}
       <button
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  className="rounded-xl bg-[#0F4C81] px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Saving..." : "Save Gallery Image"}
</button>

      </div>

    </div>

  </div>
);
}