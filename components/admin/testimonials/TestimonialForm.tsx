"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Loader2,
  MessageSquareQuote,
  Save,
  Star,
  User,
} from "lucide-react";

import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";

type TestimonialFormData = {
  name: string;
  designation: string;
  location: string;
  image: string;
  rating: number;
  review: string;
  trip: string;
  featured: boolean;
  order: number;
  active: boolean;
};

export interface TestimonialFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<TestimonialFormData> & {
    _id?: string;
  };
}

const DEFAULT_FORM: TestimonialFormData = {
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
};

export default function TestimonialForm({
  mode = "create",
  initialData,
}: TestimonialFormProps) {
  const router = useRouter();

  const isEdit = mode === "edit" && Boolean(initialData?._id);

  const [form, setForm] = useState<TestimonialFormData>(() => ({
    ...DEFAULT_FORM,
    ...initialData,
    name: initialData?.name ?? "",
    designation: initialData?.designation ?? "",
    location: initialData?.location ?? "",
    image: initialData?.image ?? "",
    rating: initialData?.rating ?? 5,
    review: initialData?.review ?? "",
    trip: initialData?.trip ?? "",
    featured: initialData?.featured ?? false,
    order: initialData?.order ?? 0,
    active: initialData?.active ?? true,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialData) return;

    setForm({
      ...DEFAULT_FORM,
      ...initialData,
      name: initialData.name ?? "",
      designation: initialData.designation ?? "",
      location: initialData.location ?? "",
      image: initialData.image ?? "",
      rating: initialData.rating ?? 5,
      review: initialData.review ?? "",
      trip: initialData.trip ?? "",
      featured: initialData.featured ?? false,
      order: initialData.order ?? 0,
      active: initialData.active ?? true,
    });
  }, [initialData]);

  const updateField = <K extends keyof TestimonialFormData>(
    key: K,
    value: TestimonialFormData[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      return "Customer name is required.";
    }

    if (!form.image.trim()) {
      return "Please upload a customer photo.";
    }

    if (!form.review.trim()) {
      return "Customer review is required.";
    }

    if (form.review.trim().length < 10) {
      return "Review should contain at least 10 characters.";
    }

    if (form.rating < 1 || form.rating > 5) {
      return "Rating must be between 1 and 5.";
    }

    if (form.order < 0) {
      return "Display order cannot be negative.";
    }

    return "";
  };

  const handleSubmit = async () => {
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const url = isEdit
        ? `/api/testimonials/${initialData?._id}`
        : "/api/testimonials";

      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          designation: form.designation.trim(),
          location: form.location.trim(),
          image: form.image,
          rating: Number(form.rating),
          review: form.review.trim(),
          trip: form.trip.trim(),
          featured: Boolean(form.featured),
          order: Number(form.order),
          active: Boolean(form.active),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Failed to ${isEdit ? "update" : "create"} testimonial.`
        );
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Back */}
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#0D2747]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Testimonials
      </Link>

      {/* Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
          <MessageSquareQuote className="h-3.5 w-3.5" />
          Customer Experience
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {isEdit ? "Edit Testimonial" : "Create Testimonial"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {isEdit
            ? "Update this guest review and control how it appears across The Musafir Diaries."
            : "Add a genuine customer experience that can be showcased across The Musafir Diaries."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
            !
          </div>
          <div>
            <p className="font-semibold">Unable to save testimonial</p>
            <p className="mt-1 text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        {/* Main */}
        <div className="space-y-6">
          {/* Customer Information */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D2747]/5 text-[#0D2747]">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Customer Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Basic information about the guest.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Customer Name <span className="text-red-500">*</span>
                </label>

                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Rahul Sharma"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Designation
                </label>

                <input
                  value={form.designation}
                  onChange={(e) =>
                    updateField("designation", e.target.value)
                  }
                  placeholder="Software Engineer"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Location
                </label>

                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Delhi, India"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>
            </div>
          </section>

          {/* Photo */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087E8B]/5 text-[#087E8B]">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Customer Photo
                  </h2>
                  <p className="text-sm text-slate-500">
                    Upload a clear guest photo for the testimonial.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <CloudinaryUploader
                multiple={false}
                value={form.image}
                onChange={(url) => updateField("image", url)}
              />

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Use a photo you have permission to publish. A clear portrait
                works best for the testimonial cards.
              </p>
            </div>
          </section>

          {/* Review */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F59E0B]/10 text-[#F59E0B]">
                  <MessageSquareQuote className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Travel Experience
                  </h2>
                  <p className="text-sm text-slate-500">
                    Capture what the customer loved about the journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Rating <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => updateField("rating", rating)}
                      className={`flex h-12 items-center justify-center gap-1 rounded-xl border text-sm font-bold transition ${
                        form.rating === rating
                          ? "border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          form.rating === rating ? "fill-current" : ""
                        }`}
                      />
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Customer Review <span className="text-red-500">*</span>
                </label>

                <textarea
                  rows={7}
                  value={form.review}
                  onChange={(e) => updateField("review", e.target.value)}
                  placeholder="Tell us about your experience with The Musafir Diaries..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>Write the review in the customer's authentic voice.</span>
                  <span>{form.review.length} characters</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Trip / Package
                </label>

                <input
                  value={form.trip}
                  onChange={(e) => updateField("trip", e.target.value)}
                  placeholder="Shimla Heritage Escape"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Publishing */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-bold text-slate-900">Publishing</h2>
              <p className="mt-1 text-xs text-slate-500">
                Control visibility and homepage priority.
              </p>
            </div>

            <div className="space-y-5 p-5">
              {/* Active */}
              <button
                type="button"
                onClick={() => updateField("active", !form.active)}
                className="flex w-full items-start gap-3 text-left"
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    form.active
                      ? "border-[#087E8B] bg-[#087E8B] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {form.active && <Check className="h-3.5 w-3.5" />}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Active
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Show this testimonial on the public website.
                  </p>
                </div>
              </button>

              {/* Featured */}
              <button
                type="button"
                onClick={() => updateField("featured", !form.featured)}
                className="flex w-full items-start gap-3 text-left"
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    form.featured
                      ? "border-[#F59E0B] bg-[#F59E0B] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {form.featured && <Check className="h-3.5 w-3.5" />}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Featured
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Give this testimonial priority in featured sections.
                  </p>
                </div>
              </button>

              {/* Order */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Display Order
                </label>

                <input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) =>
                    updateField("order", Math.max(0, Number(e.target.value)))
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Lower numbers appear first.
                </p>
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-[#071A33] shadow-sm">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                Live Preview
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                {form.image ? (
                  <img
                    src={form.image}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/40">
                    <User className="h-5 w-5" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {form.name || "Customer Name"}
                  </p>

                  <p className="truncate text-xs text-white/50">
                    {form.location || "Location"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-0.5 text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= form.rating ? "fill-current" : "opacity-20"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-4 line-clamp-5 text-sm leading-6 text-white/70">
                {form.review ||
                  "Your customer review will appear here as a preview."}
              </p>

              {form.trip && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                    Trip
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/70">
                    {form.trip}
                  </p>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>

      {/* Actions */}
      <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:justify-end">
        <Link
          href="/admin/testimonials"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D2747] px-6 text-sm font-bold text-white transition hover:bg-[#071A33] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEdit ? "Saving Changes..." : "Creating Testimonial..."}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEdit ? "Save Changes" : "Create Testimonial"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}