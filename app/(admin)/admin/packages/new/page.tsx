"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ImagePlus,
  Loader2,
  MapPin,
  Plus,
  Save,
  Star,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface Destination {
  _id: string;
  name: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageFormData {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  destination: string;
  heroImage: string;
  gallery: string[];
  duration: string;
  difficulty: "easy" | "moderate" | "difficult";
  groupSize: string;
  originalPrice: number;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: "active" | "inactive";
}

const initialForm: PackageFormData = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "",
  destination: "",
  heroImage: "",
  gallery: [],
  duration: "",
  difficulty: "easy",
  groupSize: "",
  originalPrice: 0,
  discountedPrice: 0,
  childPolicy: {
    complimentaryBelow: 5,
    halfPriceBelow: 10,
    halfPricePercentage: 50,
  },
  highlights: [""],
  included: [""],
  excluded: [""],
  itinerary: [{ day: 1, title: "", description: "" }],
  seoTitle: "",
  seoDescription: "",
  featured: false,
  status: "active",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10";

const labelClass =
  "mb-2 block text-[13px] font-semibold text-slate-700";

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-100 px-4 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#071A33] text-[11px] font-bold text-white">
            {number}
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#071A33] sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint ? <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p> : null}
    </div>
  );
}

function EmptyImageState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center">
      <ImagePlus className="h-8 w-8 text-slate-300" />
      <p className="mt-3 text-sm font-semibold text-slate-600">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function NewPackagePage() {
  const router = useRouter();

  const [form, setForm] = useState<PackageFormData>(initialForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState("");

  const slug = useMemo(
    () =>
      form.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-"),
    [form.name],
  );

  useEffect(() => {
    setForm((previous) => ({ ...previous, slug }));
  }, [slug]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [categoryRes, destinationRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/destinations"),
        ]);

        if (!categoryRes.ok || !destinationRes.ok) {
          throw new Error("Unable to load package options.");
        }

        const categoryData = await categoryRes.json();
        const destinationData = await destinationRes.json();

        setCategories(categoryData.categories ?? categoryData.data ?? []);
        setDestinations(
          destinationData.destinations ?? destinationData.data ?? [],
        );
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load categories and destinations.");
      } finally {
        setLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  function updateField<K extends keyof PackageFormData>(
    key: K,
    value: PackageFormData[K],
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function updateArrayField(
    key: "highlights" | "included" | "excluded",
    index: number,
    value: string,
  ) {
    setForm((previous) => {
      const next = [...previous[key]];
      next[index] = value;
      return { ...previous, [key]: next };
    });
  }

  function addArrayField(key: "highlights" | "included" | "excluded") {
    setForm((previous) => ({
      ...previous,
      [key]: [...previous[key], ""],
    }));
  }

  function removeArrayField(
    key: "highlights" | "included" | "excluded",
    index: number,
  ) {
    setForm((previous) => {
      const next = previous[key].filter((_, itemIndex) => itemIndex !== index);
      return { ...previous, [key]: next.length ? next : [""] };
    });
  }

  function updateItinerary(
    index: number,
    field: "title" | "description",
    value: string,
  ) {
    setForm((previous) => {
      const itinerary = [...previous.itinerary];
      itinerary[index] = { ...itinerary[index], [field]: value };
      return { ...previous, itinerary };
    });
  }

  function addItineraryDay() {
    setForm((previous) => ({
      ...previous,
      itinerary: [
        ...previous.itinerary,
        {
          day: previous.itinerary.length + 1,
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeItineraryDay(index: number) {
    setForm((previous) => ({
      ...previous,
      itinerary: previous.itinerary
        .filter((_, itemIndex) => itemIndex !== index)
        .map((item, itemIndex) => ({ ...item, day: itemIndex + 1 })),
    }));
  }

  async function uploadToCloudinary(file: File) {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "",
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data },
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed.");
    }

    const result: { secure_url?: string } = await response.json();

    if (!result.secure_url) {
      throw new Error("Cloudinary did not return an image URL.");
    }

    return result.secure_url;
  }

  async function handleHeroUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      setError("");
      setUploadingHero(true);
      const image = await uploadToCloudinary(file);
      updateField("heroImage", image);
    } catch (uploadError) {
      console.error(uploadError);
      setError("Hero image upload failed. Please try again.");
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleGalleryUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    try {
      setError("");
      setUploadingGallery(true);
      const uploadedImages = await Promise.all(
        files.map((file) => uploadToCloudinary(file)),
      );

      setForm((previous) => ({
        ...previous,
        gallery: [...previous.gallery, ...uploadedImages],
      }));
    } catch (uploadError) {
      console.error(uploadError);
      setError("One or more gallery images failed to upload.");
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryImage(index: number) {
    setForm((previous) => ({
      ...previous,
      gallery: previous.gallery.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Package name is required.");
      return;
    }

    if (!form.category || !form.destination) {
      setError("Please select a category and destination.");
      return;
    }

    if (!form.heroImage) {
      setError("Please upload a hero image.");
      return;
    }

    if (form.discountedPrice > form.originalPrice && form.originalPrice > 0) {
      setError("Discounted price cannot be higher than original price.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        highlights: form.highlights.map((item) => item.trim()).filter(Boolean),
        included: form.included.map((item) => item.trim()).filter(Boolean),
        excluded: form.excluded.map((item) => item.trim()).filter(Boolean),
        itinerary: form.itinerary
          .filter(
            (item) => item.title.trim() && item.description.trim(),
          )
          .map((item, index) => ({
            day: index + 1,
            title: item.title.trim(),
            description: item.description.trim(),
          })),
      };

      const response = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to create package.");
      }

      router.push("/admin/packages");
      router.refresh();
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while creating the package.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#087E8B]" />
          <p className="text-sm text-slate-500">Loading package form…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => router.push("/admin/packages")}
                className="mb-4 inline-flex min-h-9 items-center gap-2 rounded-lg text-xs font-semibold text-slate-500 transition hover:text-[#087E8B]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Packages
              </button>

              <div className="flex items-start gap-3">
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071A33] text-white sm:flex">
                  <Tag className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087E8B]">
                    Package CMS
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#071A33] sm:text-3xl">
                    Create Package
                  </h1>
                  <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                    Build a complete travel package with pricing, media,
                    itinerary and SEO information.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:w-auto sm:px-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Status
                </p>
                <p className="text-xs font-bold text-emerald-700">
                  New Package · Active
                </p>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <X className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}
        </div>

        {/* BASIC INFORMATION */}
        <Section
          number="01"
          title="Basic Information"
          description="Give the package a clear name and compelling customer-facing description."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Package Name">
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClass}
                placeholder="Manali Adventure Escape"
              />
            </Field>

            <Field label="URL Slug" hint="Generated automatically from the package name.">
              <input
                readOnly
                value={form.slug}
                className={`${inputClass} bg-slate-50 text-slate-500`}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Short Description">
                <textarea
                  rows={3}
                  value={form.shortDescription}
                  onChange={(event) =>
                    updateField("shortDescription", event.target.value)
                  }
                  className={`${inputClass} resize-y`}
                  placeholder="A concise description that can appear on package cards and listings."
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Full Description">
                <textarea
                  rows={7}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className={`${inputClass} resize-y`}
                  placeholder="Tell guests what makes this journey special..."
                />
              </Field>
            </div>
          </div>
        </Section>

        {/* PACKAGE DETAILS */}
        <Section
          number="02"
          title="Package Details"
          description="Connect the package to your CMS taxonomy and define the trip basics."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Category">
              <select
                required
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                className={inputClass}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Destination">
              <select
                required
                value={form.destination}
                onChange={(event) =>
                  updateField("destination", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Select destination</option>
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>
                    {destination.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Duration">
              <input
                value={form.duration}
                onChange={(event) => updateField("duration", event.target.value)}
                className={inputClass}
                placeholder="5 Days / 4 Nights"
              />
            </Field>

            <Field label="Group Size">
              <input
                value={form.groupSize}
                onChange={(event) => updateField("groupSize", event.target.value)}
                className={inputClass}
                placeholder="2 - 15 People"
              />
            </Field>

            <Field label="Difficulty">
              <select
                value={form.difficulty}
                onChange={(event) =>
                  updateField(
                    "difficulty",
                    event.target.value as PackageFormData["difficulty"],
                  )
                }
                className={inputClass}
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* PRICING */}
        <Section
          number="03"
          title="Pricing & Child Policy"
          description="Set the customer-facing package price and child pricing rules."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <Field label="Original Price">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={form.originalPrice}
                  onChange={(event) =>
                    updateField("originalPrice", Number(event.target.value))
                  }
                  className={`${inputClass} pl-9`}
                  placeholder="25000"
                />
              </div>
            </Field>

            <Field label="Discounted Price">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={form.discountedPrice}
                  onChange={(event) =>
                    updateField("discountedPrice", Number(event.target.value))
                  }
                  className={`${inputClass} pl-9`}
                  placeholder="19999"
                />
              </div>
            </Field>

            <Field label="Complimentary Below Age">
              <input
                type="number"
                min={0}
                value={form.childPolicy.complimentaryBelow}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    childPolicy: {
                      ...previous.childPolicy,
                      complimentaryBelow: Number(event.target.value),
                    },
                  }))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Half Price Below Age">
              <input
                type="number"
                min={0}
                value={form.childPolicy.halfPriceBelow}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    childPolicy: {
                      ...previous.childPolicy,
                      halfPriceBelow: Number(event.target.value),
                    },
                  }))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Half Price %">
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.childPolicy.halfPricePercentage}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      childPolicy: {
                        ...previous.childPolicy,
                        halfPricePercentage: Number(event.target.value),
                      },
                    }))
                  }
                  className={`${inputClass} pr-10`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  %
                </span>
              </div>
            </Field>
          </div>
        </Section>

        {/* HERO IMAGE */}
        <Section
          number="04"
          title="Hero Image"
          description="Use a strong cinematic image as the main visual for the package."
        >
          <div className="space-y-4">
            {form.heroImage ? (
              <div className="group relative overflow-hidden rounded-2xl bg-[#071A33]">
                <div className="relative aspect-[16/8] min-h-52">
                  <Image
                    src={form.heroImage}
                    alt="Package hero"
                    fill
                    sizes="(max-width: 768px) 100vw, 1000px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/45 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                    Hero Image
                  </div>
                </div>
              </div>
            ) : (
              <EmptyImageState
                title="No hero image selected"
                description="Upload a landscape image. A cinematic 16:8-style image works best."
              />
            )}

            <label className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#087E8B]/20 bg-[#087E8B]/5 px-4 text-sm font-semibold text-[#087E8B] transition hover:bg-[#087E8B]/10 sm:w-auto sm:inline-flex">
              {uploadingHero ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploadingHero ? "Uploading…" : "Upload Hero Image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleHeroUpload}
                disabled={uploadingHero}
              />
            </label>
          </div>
        </Section>

        {/* GALLERY */}
        <Section
          number="05"
          title="Gallery"
          description="Add supporting images that showcase the experience and destination."
        >
          <div className="space-y-5">
            {form.gallery.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {form.gallery.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      aria-label={`Remove gallery image ${index + 1}`}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg transition hover:bg-red-700 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyImageState
                title="Gallery is empty"
                description="Add multiple images to create a richer package presentation."
              />
            )}

            <label className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#087E8B]/30 hover:bg-slate-50 sm:w-auto sm:inline-flex">
              {uploadingGallery ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#087E8B]" />
              ) : (
                <ImagePlus className="h-4 w-4 text-[#087E8B]" />
              )}
              {uploadingGallery ? "Uploading gallery…" : "Add Gallery Images"}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleGalleryUpload}
                disabled={uploadingGallery}
              />
            </label>
          </div>
        </Section>

        {/* HIGHLIGHTS */}
        <Section
          number="06"
          title="Highlights"
          description="List the strongest reasons a guest should choose this package."
        >
          <div className="space-y-3">
            {form.highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Star className="h-4 w-4" />
                </div>
                <input
                  value={item}
                  onChange={(event) =>
                    updateArrayField("highlights", index, event.target.value)
                  }
                  placeholder="Private local sightseeing experience"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("highlights", index)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
                  aria-label="Remove highlight"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("highlights")}
              className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#087E8B]/20 bg-[#087E8B]/5 px-4 text-xs font-bold text-[#087E8B] transition hover:bg-[#087E8B]/10"
            >
              <Plus className="h-4 w-4" />
              Add Highlight
            </button>
          </div>
        </Section>

        {/* INCLUDED / EXCLUDED */}
        <Section
          number="07"
          title="What's Included & Excluded"
          description="Make the package scope clear before a customer books."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-emerald-700">Included</h3>
                  <p className="mt-1 text-xs text-slate-400">What the guest receives.</p>
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField("included")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-bold text-emerald-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {form.included.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <input
                      value={item}
                      onChange={(event) =>
                        updateArrayField("included", index, event.target.value)
                      }
                      placeholder="Hotel accommodation"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("included", index)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 hover:bg-red-50"
                      aria-label="Remove included item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-red-700">Excluded</h3>
                  <p className="mt-1 text-xs text-slate-400">What is not covered.</p>
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField("excluded")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-bold text-red-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {form.excluded.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </div>
                    <input
                      value={item}
                      onChange={(event) =>
                        updateArrayField("excluded", index, event.target.value)
                      }
                      placeholder="Personal expenses"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("excluded", index)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 hover:bg-red-50"
                      aria-label="Remove excluded item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ITINERARY */}
        <Section
          number="08"
          title="Day-by-Day Itinerary"
          description="Create the journey in a clear sequence for customers."
        >
          <div className="space-y-4">
            {form.itinerary.map((day, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60"
              >
                <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071A33] text-xs font-bold text-white">
                      {day.day}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#087E8B]">
                        Itinerary
                      </p>
                      <h3 className="text-sm font-bold text-slate-800">
                        Day {day.day}
                      </h3>
                    </div>
                  </div>

                  {form.itinerary.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 self-start rounded-lg px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:self-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove day
                    </button>
                  ) : null}
                </div>

                <div className="grid gap-5 p-4 sm:p-5">
                  <Field label="Day Title">
                    <input
                      value={day.title}
                      onChange={(event) =>
                        updateItinerary(index, "title", event.target.value)
                      }
                      placeholder="Arrival in Manali & local exploration"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Day Description">
                    <textarea
                      rows={5}
                      value={day.description}
                      onChange={(event) =>
                        updateItinerary(
                          index,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Describe the activities, sightseeing and experiences planned for this day..."
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItineraryDay}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#087E8B]/30 bg-[#087E8B]/5 text-sm font-bold text-[#087E8B] transition hover:bg-[#087E8B]/10"
            >
              <Plus className="h-4 w-4" />
              Add Another Day
            </button>
          </div>
        </Section>

        {/* SEO */}
        <Section
          number="09"
          title="SEO"
          description="Control how this package can appear in search engines."
        >
          <div className="space-y-5">
            <Field label="SEO Title">
              <input
                value={form.seoTitle}
                onChange={(event) => updateField("seoTitle", event.target.value)}
                className={inputClass}
                placeholder="Best Manali Tour Package | The Musafir Diaries"
              />
            </Field>

            <Field label="SEO Description">
              <textarea
                rows={4}
                value={form.seoDescription}
                onChange={(event) =>
                  updateField("seoDescription", event.target.value)
                }
                className={`${inputClass} resize-y`}
                placeholder="Write a concise, search-friendly description for this package..."
              />
            </Field>
          </div>
        </Section>

        {/* SETTINGS */}
        <Section
          number="10"
          title="Package Settings"
          description="Choose the visibility and homepage placement of this package."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#087E8B]/20">
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800">Featured Package</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Show this package in featured sections.
                </p>
              </div>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => updateField("featured", event.target.checked)}
                className="h-5 w-5 shrink-0 accent-[#087E8B]"
              />
            </label>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as PackageFormData["status"],
                  )
                }
                className={inputClass}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* SUMMARY */}
        <section className="rounded-2xl border border-[#087E8B]/15 bg-[#071A33] p-5 text-white shadow-[0_15px_50px_rgba(7,26,51,0.14)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5CC8CF]">
                Final Review
              </p>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                {form.name || "New travel package"}
              </h2>
              <p className="mt-1 text-xs leading-5 text-white/55">
                {form.duration || "Duration not set"} ·{" "}
                {form.destination
                  ? destinations.find((item) => item._id === form.destination)?.name ??
                    "Destination selected"
                  : "Destination not selected"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["Gallery", form.gallery.length],
                ["Highlights", form.highlights.filter(Boolean).length],
                ["Days", form.itinerary.length],
                ["Included", form.included.filter(Boolean).length],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="min-w-20 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center"
                >
                  <p className="text-lg font-bold">{value}</p>
                  <p className="text-[9px] uppercase tracking-wider text-white/45">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTION BAR */}
        <div className="sticky bottom-3 z-30">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_45px_rgba(15,23,42,0.12)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
            <button
              type="button"
              onClick={() => router.push("/admin/packages")}
              className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploadingHero || uploadingGallery}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-6 text-sm font-bold text-white shadow-lg shadow-[#071A33]/15 transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Package
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
