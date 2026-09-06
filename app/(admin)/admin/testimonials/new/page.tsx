"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";

export default function AddTestimonialPage() {

  const [form, setForm] = useState({
  name: "",
  designation: "",
  location: "",
  image: "",
  rating: 5,
  review: "",
  trip: "",
  featured: false,
  order: 0,
  active: true,
});

const updateField = (
  key: keyof typeof form,
  value: any
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const router = useRouter();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");


const handleSubmit = async () => {
  try {
    setError("");

    if (!form.name.trim()) {
      return setError("Customer name is required.");
    }

    if (!form.image) {
      return setError("Please upload a customer photo.");
    }

    if (!form.review.trim()) {
      return setError("Review is required.");
    }

    setLoading(true);

    const response = await fetch("/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to save testimonial.");
    }

    router.push("/admin/testimonials");
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
      href="/admin/testimonials"
      className="text-[#0F4C81]"
    >
      ← Back to Testimonials
    </Link>

    <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

      <h1 className="text-3xl font-bold">
        Create Testimonial
      </h1>

      <p className="mt-2 text-slate-500">
        Add customer reviews that will appear on the website.
      </p>

      <div className="mt-8 space-y-6">

        {/* Customer Name */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Customer Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            placeholder="Rahul Sharma"
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Designation */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Designation
          </label>

          <input
            value={form.designation}
            onChange={(e) =>
              updateField(
                "designation",
                e.target.value
              )
            }
            placeholder="Software Engineer"
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Location */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Location
          </label>

          <input
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            placeholder="Delhi"
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Customer Image */}

        <div>

          <label className="mb-3 block text-sm font-semibold">
            Customer Photo
          </label>

          <CloudinaryUploader
            multiple={false}
            value={form.image}
            onChange={(url) =>
              updateField("image", url)
            }
          />

        </div>

        {/* Rating */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Rating
          </label>

          <select
            value={form.rating}
            onChange={(e) =>
              updateField(
                "rating",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          >
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★☆ (4)</option>
            <option value={3}>★★★☆☆ (3)</option>
            <option value={2}>★★☆☆☆ (2)</option>
            <option value={1}>★☆☆☆☆ (1)</option>
          </select>

        </div>

        {/* Review */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Review
          </label>

          <textarea
            rows={6}
            value={form.review}
            onChange={(e) =>
              updateField(
                "review",
                e.target.value
              )
            }
            placeholder="Share the customer's experience..."
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Trip */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Trip / Package
          </label>

          <input
            value={form.trip}
            onChange={(e) =>
              updateField("trip", e.target.value)
            }
            placeholder="Shimla Family Tour"
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Display Order */}

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
  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
    {error}
  </div>
)}
        {/* Save */}

       <button
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  className="rounded-xl bg-[#0F4C81] px-6 py-3 text-white transition hover:bg-[#0d3d67] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Saving..." : "Save Testimonial"}
</button>

      </div>

    </div>

  </div>
);
}