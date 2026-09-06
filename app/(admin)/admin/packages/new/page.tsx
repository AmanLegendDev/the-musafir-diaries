"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  Loader2,
  Plus,
  Trash2,
  Upload,
  ImagePlus,
  ArrowLeft,
  Save,
  Star,
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

  difficulty:
    | "easy"
    | "moderate"
    | "difficult";

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

  status:
    | "active"
    | "inactive";
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

  itinerary: [
    {
      day: 1,
      title: "",
      description: "",
    },
  ],

  seoTitle: "",

  seoDescription: "",

  featured: false,

  status: "active",
};

export default function NewPackagePage() {
  const router = useRouter();

  const [form, setForm] =
    useState<PackageFormData>(
      initialForm
    );

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [destinations, setDestinations] =
    useState<Destination[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingHero, setUploadingHero] =
    useState(false);

  const [
    uploadingGallery,
    setUploadingGallery,
  ] = useState(false);

  const slug = useMemo(() => {
    return form.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }, [form.name]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug,
    }));
  }, [slug]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
        try {
      const [
        categoryRes,
        destinationRes,
      ] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/destinations"),
      ]);

      if (!categoryRes.ok) {
        throw new Error(
          "Failed to fetch categories."
        );
      }

      if (!destinationRes.ok) {
        throw new Error(
          "Failed to fetch destinations."
        );
      }

      const categoryData =
        await categoryRes.json();

      const destinationData =
        await destinationRes.json();

      setCategories(
        categoryData.categories || []
      );

      setDestinations(
        destinationData.destinations ||
          []
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load categories and destinations."
      );
    } finally {
      setLoading(false);
    }
  }

  async function uploadToCloudinary(
    file: File
  ) {
    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(
        "Cloudinary upload failed."
      );
    }

    const result =
      await response.json();

    return result.secure_url as string;
  }

  async function handleHeroUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingHero(true);

      const image =
        await uploadToCloudinary(
          file
        );

      setForm((prev) => ({
        ...prev,
        heroImage: image,
      }));
    } catch (error) {
      console.error(error);

      alert(
        "Hero image upload failed."
      );
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleGalleryUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files =
      e.target.files;

    if (!files?.length) return;

    try {
      setUploadingGallery(true);

      const uploadedImages =
        await Promise.all(
          Array.from(files).map((file) =>
            uploadToCloudinary(file)
          )
        );

      setForm((prev) => ({
        ...prev,
        gallery: [
          ...prev.gallery,
          ...uploadedImages,
        ],
      }));
    } catch (error) {
      console.error(error);

      alert(
        "Gallery upload failed."
      );
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryImage(
    index: number
  ) {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter(
        (_, i) => i !== index
      ),
    }));
  }

  function updateField<
    K extends keyof PackageFormData
  >(
    key: K,
    value: PackageFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateArrayField(
    key:
      | "highlights"
      | "included"
      | "excluded",
    index: number,
    value: string
  ) {
    setForm((prev) => {
      const updated = [
        ...prev[key],
      ];

      updated[index] = value;

      return {
        ...prev,
        [key]: updated,
      };
    });
  }

  function addArrayField(
    key:
      | "highlights"
      | "included"
      | "excluded"
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: [
        ...prev[key],
        "",
      ],
    }));
  }

  function removeArrayField(
    key:
      | "highlights"
      | "included"
      | "excluded",
    index: number
  ) 
      {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter(
        (_, i) => i !== index
      ),
    }));
  }

  function updateItinerary(
    index: number,
    field: keyof ItineraryDay,
    value: string | number
  ) {
    setForm((prev) => {
      const itinerary = [
        ...prev.itinerary,
      ];

      itinerary[index] = {
        ...itinerary[index],
        [field]: value,
      };

      return {
        ...prev,
        itinerary,
      };
    });
  }

  function addItineraryDay() {
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day:
            prev.itinerary.length + 1,
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeItineraryDay(
    index: number
  ) {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter(
          (_, i) => i !== index
        )
        .map((item, i) => ({
          ...item,
          day: i + 1,
        })),
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        highlights:
          form.highlights.filter(
            (item) => item.trim()
          ),

        included:
          form.included.filter(
            (item) => item.trim()
          ),

        excluded:
          form.excluded.filter(
            (item) => item.trim()
          ),

        itinerary:
          form.itinerary.filter(
            (item) =>
              item.title.trim() &&
              item.description.trim()
          ),
      };

      const response = await fetch(
        "/api/packages",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to create package."
        );
      }

      alert(
        "Package created successfully."
      );

      router.push(
        "/admin/packages"
      );
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl space-y-8 px-6 py-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/packages"
                )
              }
              className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <h1 className="text-4xl font-bold text-slate-900">
              Create Package
            </h1>

            <p className="mt-2 text-slate-500">
              Create a premium travel
              package for your
              customers.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm">
            <Star className="h-5 w-5 text-yellow-500" />

            <div>
              <p className="text-xs uppercase text-slate-400">
                Status
              </p>

              <p className="font-semibold text-green-600">
                New Package
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Basic Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Package Name
              </label>

              <input
                required
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                placeholder="Manali Adventure"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                readOnly
                value={form.slug}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Short Description
              </label>

              <textarea
                rows={3}
                value={
                  form.shortDescription
                }
                onChange={(e) =>
                  updateField(
                    "shortDescription",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Full Description
              </label>

              <textarea
                rows={8}
                value={form.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Package Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                required
                value={form.category}
                onChange={(e) =>
                  updateField(
                    "category",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={
                        category._id
                      }
                      value={
                        category._id
                      }
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Destination
              </label>

              <select
                required
                value={
                  form.destination
                }
                onChange={(e) =>
                  updateField(
                    "destination",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">
                  Select Destination
                </option>

                {destinations.map(
                  (
                    destination
                  ) => (
                    <option
                      key={
                        destination._id
                      }
                      value={
                        destination._id
                      }
                    >
                      {
                        destination.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>
                        <div>
              <label className="mb-2 block text-sm font-medium">
                Duration
              </label>

              <input
                value={form.duration}
                onChange={(e) =>
                  updateField(
                    "duration",
                    e.target.value
                  )
                }
                placeholder="5 Days / 4 Nights"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Group Size
              </label>

              <input
                value={form.groupSize}
                onChange={(e) =>
                  updateField(
                    "groupSize",
                    e.target.value
                  )
                }
                placeholder="2 - 15 People"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Difficulty
              </label>

              <select
                value={form.difficulty}
                onChange={(e) =>
                  updateField(
                    "difficulty",
                    e.target.value as
                      | "easy"
                      | "moderate"
                      | "difficult"
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="easy">
                  Easy
                </option>

                <option value="moderate">
                  Moderate
                </option>

                <option value="difficult">
                  Difficult
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Pricing
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Original Price
              </label>

              <input
                type="number"
                min={0}
                value={form.originalPrice}
                onChange={(e) =>
                  updateField(
                    "originalPrice",
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Discounted Price
              </label>

              <input
                type="number"
                min={0}
                value={
                  form.discountedPrice
                }
                onChange={(e) =>
                  updateField(
                    "discountedPrice",
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
  <label className="mb-2 block text-sm font-medium">
    Complimentary Below Age
  </label>

  <input
    type="number"
    min={0}
    value={form.childPolicy.complimentaryBelow}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        childPolicy: {
          ...prev.childPolicy,
          complimentaryBelow: Number(e.target.value),
        },
      }))
    }
    className="w-full rounded-xl border border-slate-300 px-4 py-3"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium">
    Half Price Below Age
  </label>

  <input
    type="number"
    min={0}
    value={form.childPolicy.halfPriceBelow}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        childPolicy: {
          ...prev.childPolicy,
          halfPriceBelow: Number(e.target.value),
        },
      }))
    }
    className="w-full rounded-xl border border-slate-300 px-4 py-3"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium">
    Half Price Percentage
  </label>

  <input
    type="number"
    min={0}
    max={100}
    value={form.childPolicy.halfPricePercentage}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        childPolicy: {
          ...prev.childPolicy,
          halfPricePercentage: Number(e.target.value),
        },
      }))
    }
    className="w-full rounded-xl border border-slate-300 px-4 py-3"
  />
</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Hero Image
            </h2>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700">
              <Upload className="h-5 w-5" />

              Upload

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleHeroUpload
                }
              />
            </label>
          </div>

          {uploadingHero && (
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading...
            </div>
          )}

          {form.heroImage && (
            <div className="relative mt-4 h-80 overflow-hidden rounded-2xl">
              <Image
                src={form.heroImage}
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Gallery Images
            </h2>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700">
              <ImagePlus className="h-5 w-5" />

              Upload Gallery

              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={
                  handleGalleryUpload
                }
              />
            </label>
          </div>

          {uploadingGallery && (
            <div className="mb-6 flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading gallery...
            </div>
          )}

          {form.gallery.length >
            0 && (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5">
              {form.gallery.map(
                (
                  image,
                  index
                ) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border"
                  >
                    <div className="relative h-48">
                      <Image
                        src={image}
                        alt={`Gallery ${index}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeGalleryImage(
                          index
                        )
                      }
                      className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Highlights
            </h2>

            <button
              type="button"
              onClick={() =>
                addArrayField(
                  "highlights"
                )
              }
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white"
            >
              <Plus className="h-5 w-5" />
              Add Highlight
            </button>
          </div>

          <div className="space-y-4">
            {form.highlights.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    value={item}
                    onChange={(e) =>
                      updateArrayField(
                        "highlights",
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Highlight"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayField(
                        "highlights",
                        index
                      )
                    }
                    className="rounded-xl bg-red-500 px-4 text-white"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Included
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    addArrayField(
                      "included"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
                >
                  <Plus className="h-5 w-5" />
                  Add
                </button>
              </div>

              <div className="space-y-4">
                {form.included.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <input
                        value={item}
                        onChange={(e) =>
                          updateArrayField(
                            "included",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Included Item"
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(
                            "included",
                            index
                          )
                        }
                        className="rounded-xl bg-red-500 px-4 text-white"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Excluded
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    addArrayField(
                      "excluded"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
                >
                  <Plus className="h-5 w-5" />
                  Add
                </button>
              </div>

              <div className="space-y-4">
                {form.excluded.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <input
                        value={item}
                        onChange={(e) =>
                          updateArrayField(
                            "excluded",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Excluded Item"
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(
                            "excluded",
                            index
                          )
                        }
                        className="rounded-xl bg-red-500 px-4 text-white"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Itinerary
            </h2>

            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
            >
              <Plus className="h-5 w-5" />
              Add Day
            </button>
          </div>

          <div className="space-y-6">
            {form.itinerary.map(
              (
                day,
                index
              ) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Day {day.day}
                    </h3>

                    {form.itinerary
                      .length >
                      1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeItineraryDay(
                            index
                          )
                        }
                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                                    <div className="grid gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Day Title
                      </label>

                      <input
                        value={day.title}
                        onChange={(e) =>
                          updateItinerary(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Arrival at Manali"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>

                      <textarea
                        rows={5}
                        value={
                          day.description
                        }
                        onChange={(e) =>
                          updateItinerary(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe the activities planned for this day..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            SEO
          </h2>

          <div className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Title
              </label>

              <input
                value={form.seoTitle}
                onChange={(e) =>
                  updateField(
                    "seoTitle",
                    e.target.value
                  )
                }
                placeholder="Best Manali Tour Package"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Description
              </label>

              <textarea
                rows={4}
                value={
                  form.seoDescription
                }
                onChange={(e) =>
                  updateField(
                    "seoDescription",
                    e.target.value
                  )
                }
                placeholder="Write a search engine optimized description..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Package Settings
            </h2>

            <div className="space-y-6">
              <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold">
                    Featured Package
                  </p>

                  <p className="text-sm text-slate-500">
                    Show on homepage.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    form.featured
                  }
                  onChange={(e) =>
                    updateField(
                      "featured",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />
              </label>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as
                        | "active"
                        | "inactive"
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Summary
            </h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Package
                </span>

                <span className="font-semibold">
                  {form.name || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Category
                </span>

                <span className="font-semibold">
                  {categories.find(
                    (c) =>
                      c._id ===
                      form.category
                  )?.name || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Destination
                </span>

                <span className="font-semibold">
                  {destinations.find(
                    (d) =>
                      d._id ===
                      form.destination
                  )?.name || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Duration
                </span>

                <span className="font-semibold">
                  {form.duration || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Difficulty
                </span>

                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium capitalize text-sky-700">
                  {form.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Gallery Images
                </span>

                <span className="font-semibold">
                  {
                    form.gallery
                      .length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Highlights
                </span>

                <span className="font-semibold">
                  {
                    form
                      .highlights
                      .filter(
                        (x) =>
                          x.trim()
                      ).length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-slate-500">
                  Itinerary Days
                </span>

                <span className="font-semibold">
                  {
                    form
                      .itinerary
                      .length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    form.status ===
                    "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {form.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-6 py-5">
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/packages"
                )
              }
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                uploadingHero ||
                uploadingGallery
              }
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
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