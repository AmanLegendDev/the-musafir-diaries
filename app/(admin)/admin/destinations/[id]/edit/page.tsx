"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ImageIcon,
  Loader2,
  MapPin,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface Destination {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  country: string;
  state: string;
  city: string;

  bestTime: string;
  altitude: string;

  heroImage: string;
  gallery: string[];

  startingPrice: number;
  duration: string;

  rating: number;
  reviewCount: number;

  featured: boolean;
  featuredOrder: number;

  seoTitle: string;
  seoDescription: string;

  status: "active" | "draft";
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const EMPTY_DESTINATION: Destination = {
  _id: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",

  country: "India",
  state: "",
  city: "",

  bestTime: "",
  altitude: "",

  heroImage: "",
  gallery: [],

  startingPrice: 0,
  duration: "",

  rating: 0,
  reviewCount: 0,

  featured: false,
  featuredOrder: 0,

  seoTitle: "",
  seoDescription: "",

  status: "draft",
};

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10"
      />
    </label>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_35px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087E8B]">
          {eyebrow}
        </p>

        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="p-6 sm:p-7">
        {children}
      </div>
    </section>
  );
}

export default function EditDestinationPage({
  params,
}: Props) {
  const router = useRouter();

  const [destination, setDestination] =
    useState<Destination>(EMPTY_DESTINATION);

  const [original, setOriginal] =
    useState<Destination>(EMPTY_DESTINATION);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);

  const { id } = useMemo(() => {
    return { id: "" };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadDestination() {
      try {
        /*
         * We cannot read params directly inside the client
         * component body because params is a Promise.
         */
        const resolvedParams = await params;
        const destinationId = resolvedParams.id;

        const response = await fetch(
          `/api/destinations/${destinationId}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load destination.",
          );
        }

        const data = result.destination || result.data;

        if (!data) {
          throw new Error(
            "Destination data was not returned by the server.",
          );
        }

        const normalized: Destination = {
          ...EMPTY_DESTINATION,
          ...data,
          _id: String(data._id),
          gallery: Array.isArray(data.gallery)
            ? data.gallery
            : [],
        };

        if (mounted) {
          setDestination(normalized);
          setOriginal(normalized);
        }
      } catch (error) {
        console.error(
          "DESTINATION_LOAD_ERROR:",
          error,
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load destination.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDestination();

    return () => {
      mounted = false;
    };
  }, [params]);

  const isDirty =
    JSON.stringify(destination) !==
    JSON.stringify(original);

  function updateField<K extends keyof Destination>(
    field: K,
    value: Destination[K],
  ) {
    setDestination((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateGallery(
    index: number,
    value: string,
  ) {
    setDestination((current) => {
      const gallery = [...current.gallery];

      gallery[index] = value;

      return {
        ...current,
        gallery,
      };
    });
  }

  function addGalleryImage() {
    setDestination((current) => ({
      ...current,
      gallery: [...current.gallery, ""],
    }));
  }

  function removeGalleryImage(index: number) {
    setDestination((current) => ({
      ...current,
      gallery: current.gallery.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  }

  async function handleSave() {
    if (saving) return;

    if (!destination.name.trim()) {
      toast.error("Destination name is required.");
      return;
    }

    if (!destination.slug.trim()) {
      toast.error("Destination slug is required.");
      return;
    }

    if (!destination.country.trim()) {
      toast.error("Country is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: destination.name.trim(),
            slug: destination.slug.trim(),
            shortDescription:
              destination.shortDescription.trim(),
            description:
              destination.description.trim(),

            country: destination.country.trim(),
            state: destination.state.trim(),
            city: destination.city.trim(),

            bestTime: destination.bestTime.trim(),
            altitude: destination.altitude.trim(),

            heroImage:
              destination.heroImage.trim(),

            gallery: destination.gallery
              .map((image) => image.trim())
              .filter(Boolean),

            startingPrice:
              Number(destination.startingPrice) || 0,

            duration:
              destination.duration.trim(),

            rating:
              Number(destination.rating) || 0,

            reviewCount:
              Number(destination.reviewCount) || 0,

            featured: destination.featured,

            featuredOrder:
              Number(destination.featuredOrder) || 0,

            seoTitle:
              destination.seoTitle.trim(),

            seoDescription:
              destination.seoDescription.trim(),

            status: destination.status,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update destination.",
        );
      }

      const updated =
        result.destination || result.data;

      const normalized: Destination = {
        ...destination,
        ...(updated || {}),
        gallery: Array.isArray(
          updated?.gallery,
        )
          ? updated.gallery
          : destination.gallery,
      };

      setDestination(normalized);
      setOriginal(normalized);

      toast.success(
        "Destination updated successfully.",
      );
    } catch (error) {
      console.error(
        "DESTINATION_UPDATE_ERROR:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update destination.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (deleting) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/destinations/${destination._id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete destination.",
        );
      }

      toast.success(
        "Destination deleted successfully.",
      );

      router.push("/admin/destinations");
      router.refresh();
    } catch (error) {
      console.error(
        "DESTINATION_DELETE_ERROR:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete destination.",
      );
    } finally {
      setDeleting(false);
    }
  }

  function handleClose() {
    if (isDirty) {
      setCloseOpen(true);
      return;
    }

    router.push("/admin/destinations");
  }

  function discardAndClose() {
    setCloseOpen(false);
    router.push("/admin/destinations");
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-[#087E8B]" />
          Loading destination...
        </div>
      </div>
    );
  }

  if (!destination._id) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <MapPin className="h-7 w-7" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-900">
          Destination not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The destination could not be loaded.
        </p>

        <Link
          href="/admin/destinations"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to destinations
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-7 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <button
              type="button"
              onClick={handleClose}
              className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#087E8B]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Destinations
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087E8B]/10 text-[#087E8B]">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087E8B]">
                  Destination CMS
                </p>

                <h1 className="mt-1 font-serif text-3xl font-medium tracking-[-0.035em] text-slate-900 sm:text-4xl">
                  Edit Destination
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Update every piece of content used across
              the destination experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              disabled={deleting || saving}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-sm font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>

            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Dirty state */}
        {isDirty && (
          <div className="flex items-center gap-3 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-5 py-3.5 text-sm text-slate-700">
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />

            You have unsaved changes.
          </div>
        )}

        {/* Preview */}
        <div className="overflow-hidden rounded-[26px] bg-[#071A33]">
          <div className="relative min-h-[250px]">
            {destination.heroImage ? (
              <img
                src={destination.heroImage}
                alt={destination.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#0D2747]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#071A33]/50 to-[#071A33]/20" />

            <div className="relative flex min-h-[250px] items-end p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    {destination.status}
                  </span>

                  {destination.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#071A33]">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-white sm:text-5xl">
                  {destination.name ||
                    "Untitled Destination"}
                </h2>

                <p className="mt-2 text-sm text-white/60">
                  {[
                    destination.city,
                    destination.state,
                    destination.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic information */}
        <SectionCard
          eyebrow="01 · Core Content"
          title="Destination Information"
          description="The main identity and editorial content for this destination."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Destination name"
              value={destination.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="Shimla"
              required
            />

            <Input
              label="Slug"
              value={destination.slug}
              onChange={(value) =>
                updateField("slug", value)
              }
              placeholder="shimla"
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Short description"
                value={destination.shortDescription}
                onChange={(value) =>
                  updateField(
                    "shortDescription",
                    value,
                  )
                }
                placeholder="A concise introduction to the destination..."
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Full description"
                value={destination.description}
                onChange={(value) =>
                  updateField(
                    "description",
                    value,
                  )
                }
                placeholder="Write the complete destination story..."
                rows={8}
              />
            </div>
          </div>
        </SectionCard>

        {/* Location */}
        <SectionCard
          eyebrow="02 · Location"
          title="Destination Details"
          description="Geographical and travel information displayed throughout the website."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Country"
              value={destination.country}
              onChange={(value) =>
                updateField("country", value)
              }
              placeholder="India"
              required
            />

            <Input
              label="State"
              value={destination.state}
              onChange={(value) =>
                updateField("state", value)
              }
              placeholder="Himachal Pradesh"
            />

            <Input
              label="City"
              value={destination.city}
              onChange={(value) =>
                updateField("city", value)
              }
              placeholder="Shimla"
            />

            <Input
              label="Best time"
              value={destination.bestTime}
              onChange={(value) =>
                updateField("bestTime", value)
              }
              placeholder="March to June"
            />

            <Input
              label="Altitude"
              value={destination.altitude}
              onChange={(value) =>
                updateField("altitude", value)
              }
              placeholder="2,205 m"
            />

            <Input
              label="Duration"
              value={destination.duration}
              onChange={(value) =>
                updateField("duration", value)
              }
              placeholder="5 Days / 3 Nights"
            />
          </div>
        </SectionCard>

        {/* Media */}
        <SectionCard
          eyebrow="03 · Media"
          title="Destination Images"
          description="Manage the hero image and destination gallery."
        >
          <div className="space-y-6">
            <Input
              label="Hero image URL"
              value={destination.heroImage}
              onChange={(value) =>
                updateField(
                  "heroImage",
                  value,
                )
              }
              placeholder="https://res.cloudinary.com/..."
            />

            {destination.heroImage && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={destination.heroImage}
                  alt="Hero preview"
                  className="h-64 w-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Gallery
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Add image URLs for the destination gallery.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
                >
                  <ImageIcon className="h-4 w-4" />
                  Add Image
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {destination.gallery.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-10 text-center">
                    <ImageIcon className="mx-auto h-6 w-6 text-slate-300" />

                    <p className="mt-2 text-sm text-slate-400">
                      No gallery images added.
                    </p>
                  </div>
                ) : (
                  destination.gallery.map(
                    (image, index) => (
                      <div
                        key={`${index}-${image}`}
                        className="flex gap-3"
                      >
                        <input
                          value={image}
                          onChange={(event) =>
                            updateGallery(
                              index,
                              event.target.value,
                            )
                          }
                          placeholder={`Gallery image ${index + 1} URL`}
                          className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(
                              index,
                            )
                          }
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Homepage */}
        <SectionCard
          eyebrow="04 · Homepage"
          title="Homepage Settings"
          description="Control how this destination appears in featured sections."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Starting price"
              value={destination.startingPrice}
              type="number"
              onChange={(value) =>
                updateField(
                  "startingPrice",
                  Number(value) || 0,
                )
              }
              placeholder="25000"
            />

            <Input
              label="Featured order"
              value={destination.featuredOrder}
              type="number"
              onChange={(value) =>
                updateField(
                  "featuredOrder",
                  Number(value) || 0,
                )
              }
              placeholder="1"
            />

            <Input
              label="Rating"
              value={destination.rating}
              type="number"
              onChange={(value) =>
                updateField(
                  "rating",
                  Number(value) || 0,
                )
              }
              placeholder="5"
            />

            <Input
              label="Review count"
              value={destination.reviewCount}
              type="number"
              onChange={(value) =>
                updateField(
                  "reviewCount",
                  Number(value) || 0,
                )
              }
              placeholder="0"
            />

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Featured destination
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Show this destination in featured
                    homepage content.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={
                    destination.featured
                  }
                  onClick={() =>
                    updateField(
                      "featured",
                      !destination.featured,
                    )
                  }
                  className={`relative h-7 w-12 rounded-full transition ${
                    destination.featured
                      ? "bg-[#087E8B]"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      destination.featured
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Publishing */}
        <SectionCard
          eyebrow="05 · Publishing"
          title="Visibility"
          description="Choose whether this destination is available on the public website."
        >
          <div className="relative">
            <select
              value={destination.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target
                    .value as Destination["status"],
                )
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10"
            >
              <option value="draft">
                Draft
              </option>

              <option value="active">
                Active
              </option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </SectionCard>

        {/* SEO */}
        <SectionCard
          eyebrow="06 · Search"
          title="SEO Settings"
          description="Search-engine title and description for this destination page."
        >
          <div className="space-y-5">
            <Input
              label="SEO title"
              value={destination.seoTitle}
              onChange={(value) =>
                updateField(
                  "seoTitle",
                  value,
                )
              }
              placeholder="Shimla | The Musafir Diaries"
            />

            <Textarea
              label="SEO description"
              value={destination.seoDescription}
              onChange={(value) =>
                updateField(
                  "seoDescription",
                  value,
                )
              }
              placeholder="Discover Shimla with The Musafir Diaries..."
              rows={4}
            />
          </div>
        </SectionCard>

        {/* Bottom actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-7 text-sm font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}

            {saving
              ? "Saving changes..."
              : "Save Destination"}
          </button>
        </div>
      </div>

      {/* Delete modal */}
      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[26px] bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Trash2 className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-900">
                  Delete destination?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This will permanently delete{" "}
                  <span className="font-semibold text-slate-800">
                    {destination.name}
                  </span>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteOpen(false)
                }
                disabled={deleting}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteOpen(false)
                }
                disabled={deleting}
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {deleting
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved changes modal */}
      {closeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[26px] bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
              <X className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Unsaved changes
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You have changes that haven't been saved.
              Are you sure you want to leave this page?
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setCloseOpen(false)
                }
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700"
              >
                Keep Editing
              </button>

              <button
                type="button"
                onClick={discardAndClose}
                className="min-h-11 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white"
              >
                Discard & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}