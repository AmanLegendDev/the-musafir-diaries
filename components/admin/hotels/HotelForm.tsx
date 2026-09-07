"use client";

import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Save,
  Trash2,
  Star,
} from "lucide-react";

type HotelType =
  | "hotel"
  | "resort"
  | "boutique"
  | "homestay"
  | "villa"
  | "guesthouse"
  | "camp"
  | "other";

type HotelStatus = "active" | "draft";

interface Destination {
  _id: string;
  name: string;
}

interface RoomType {
  name: string;
  description: string;
  occupancy: string;
  bedType: string;
}

interface Policies {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  childPolicy: string;
  other: string;
}

interface HotelFormData {
  name: string;
  slug: string;
  destination: string;

  area: string;
  address: string;
  city: string;
  state: string;
  country: string;

  starRating: number;
  hotelType: HotelType;

  shortDescription: string;
  description: string;

  heroImage: string;
  gallery: string[];

  roomTypes: RoomType[];
  amenities: string[];

  policies: Policies;

  guestRating: number | null;
  reviewCount: number;

  featured: boolean;
  displayOrder: number;
  status: HotelStatus;

  seoTitle: string;
  seoDescription: string;
}

const initialForm: HotelFormData = {
  name: "",
  slug: "",
  destination: "",

  area: "",
  address: "",
  city: "",
  state: "",
  country: "India",

  starRating: 3,
  hotelType: "hotel",

  shortDescription: "",
  description: "",

  heroImage: "",
  gallery: [],

  roomTypes: [
    {
      name: "",
      description: "",
      occupancy: "",
      bedType: "",
    },
  ],

  amenities: [""],

  policies: {
    checkIn: "",
    checkOut: "",
    cancellation: "",
    childPolicy: "",
    other: "",
  },

  guestRating: null,
  reviewCount: 0,

  featured: false,
  displayOrder: 0,
  status: "draft",

  seoTitle: "",
  seoDescription: "",
};

export default function NewHotelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destinationFromQuery =
    searchParams.get("destination") || "";

  const [form, setForm] =
    useState<HotelFormData>(initialForm);

  const [destinations, setDestinations] =
    useState<Destination[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

 
useEffect(() => {
  async function fetchInitialData() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/destinations");

      if (!response.ok) {
        throw new Error("Failed to load destinations.");
      }

      const data = await response.json();

      const destinationList =
        data.destinations || [];

      setDestinations(destinationList);

      if (destinationFromQuery) {
        const exists = destinationList.some(
          (destination: Destination) =>
            destination._id === destinationFromQuery
        );

        if (exists) {
          setForm((prev) => ({
            ...prev,
            destination: destinationFromQuery,
          }));
        }
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load destinations."
      );
    } finally {
      setLoading(false);
    }
  }

  fetchInitialData();
}, [destinationFromQuery]);

function updateField<K extends keyof HotelFormData>(
  key: K,
  value: HotelFormData[K]
) {
  setForm((prev) => {
    if (key === "name") {
      const name = value as string;

      const generatedSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");

      return {
        ...prev,
        name,
        slug: generatedSlug,
      };
    }

    return {
      ...prev,
      [key]: value,
    };
  });
}

  function updatePolicy(
    key: keyof Policies,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      policies: {
        ...prev.policies,
        [key]: value,
      },
    }));
  }

  function updateRoom(
    index: number,
    key: keyof RoomType,
    value: string
  ) {
    setForm((prev) => {
      const rooms = [...prev.roomTypes];

      rooms[index] = {
        ...rooms[index],
        [key]: value,
      };

      return {
        ...prev,
        roomTypes: rooms,
      };
    });
  }

  function addRoom() {
    setForm((prev) => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        {
          name: "",
          description: "",
          occupancy: "",
          bedType: "",
        },
      ],
    }));
  }

  function removeRoom(index: number) {
    setForm((prev) => ({
      ...prev,
      roomTypes:
        prev.roomTypes.length > 1
          ? prev.roomTypes.filter(
              (_, i) => i !== index
            )
          : prev.roomTypes,
    }));
  }

  function updateAmenity(
    index: number,
    value: string
  ) {
    setForm((prev) => {
      const amenities = [...prev.amenities];

      amenities[index] = value;

      return {
        ...prev,
        amenities,
      };
    });
  }

  function addAmenity() {
    setForm((prev) => ({
      ...prev,
      amenities: [
        ...prev.amenities,
        "",
      ],
    }));
  }

  function removeAmenity(index: number) {
    setForm((prev) => ({
      ...prev,
      amenities:
        prev.amenities.length > 1
          ? prev.amenities.filter(
              (_, i) => i !== index
            )
          : prev.amenities,
    }));
  }

  function validateForm() {
    const errors: string[] = [];

    if (!form.name.trim()) {
      errors.push(
        "Hotel name is required."
      );
    }

    if (!form.destination) {
      errors.push(
        "Destination is required."
      );
    }

    if (
      !form.shortDescription.trim()
    ) {
      errors.push(
        "Short description is required."
      );
    }

    if (!form.description.trim()) {
      errors.push(
        "Full description is required."
      );
    }

    if (
      form.status === "active" &&
      !form.heroImage
    ) {
      errors.push(
        "Active hotels require a hero image."
      );
    }

    if (
      form.status === "active" &&
      form.gallery.length === 0
    ) {
      errors.push(
        "Active hotels require at least one gallery image."
      );
    }

    if (
      form.guestRating !== null &&
      form.reviewCount <= 0
    ) {
      errors.push(
        "Guest rating requires at least one review."
      );
    }

    if (
      form.guestRating === null &&
      form.reviewCount > 0
    ) {
      errors.push(
        "Add a guest rating when review count is greater than zero."
      );
    }

    if (
      form.status === "active" &&
      form.seoTitle.trim().length < 10
    ) {
      errors.push(
        "Active hotels require an SEO title of at least 10 characters."
      );
    }

    if (
      form.status === "active" &&
      form.seoDescription.trim().length < 50
    ) {
      errors.push(
        "Active hotels require an SEO description of at least 50 characters."
      );
    }

    if (errors.length > 0) {
      setError(errors[0]);
      return false;
    }

    setError("");
    return true;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,

        roomTypes:
          form.roomTypes.filter(
            (room) =>
              room.name.trim()
          ),

        amenities:
          form.amenities.filter(
            (amenity) =>
              amenity.trim()
          ),
      };

      const response =
        await fetch("/api/hotels", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        });

      const data =
        await response.json();

     if (!response.ok) {
  console.error("HOTEL_CREATE_ERROR:", data);

  const fieldErrors = data.fieldErrors
    ? Object.entries(data.fieldErrors)
        .map(
          ([field, errors]) =>
            `${field}: ${(errors as string[]).join(", ")}`
        )
        .join("\n")
    : "";

  throw new Error(
    [data.error, fieldErrors]
      .filter(Boolean)
      .join("\n") ||
      "Unable to create hotel."
  );
}

      alert(
        "Hotel created successfully!"
      );

      router.push("/admin/hotels");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  const selectedDestination =
    destinations.find(
      (destination) =>
        destination._id ===
        form.destination
    );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* HEADER */}
      <div>
        <Link
          href="/admin/hotels"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hotels
        </Link>

        <div className="mt-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Add New Hotel
          </h1>

          <p className="mt-2 text-slate-500">
            Create a hotel and connect it
            to the correct destination.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* BASIC INFORMATION */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Core hotel identity and
              classification.
            </p>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Hotel Name *
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
                placeholder="The Oberoi Cecil"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                readOnly
                value={form.slug}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Destination *
              </label>

              <select
                required
                value={form.destination}
                onChange={(e) =>
                  updateField(
                    "destination",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-600"
              >
                <option value="">
                  Select Destination
                </option>

                {destinations.map(
                  (destination) => (
                    <option
                      key={
                        destination._id
                      }
                      value={
                        destination._id
                      }
                    >
                      {destination.name}
                    </option>
                  )
                )}
              </select>

              {destinationFromQuery &&
                selectedDestination && (
                  <p className="mt-2 text-xs text-sky-600">
                    Destination preselected:
                    {" "}
                    {
                      selectedDestination.name
                    }
                  </p>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Hotel Type *
              </label>

              <select
                value={form.hotelType}
                onChange={(e) =>
                  updateField(
                    "hotelType",
                    e.target.value as HotelType
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="hotel">
                  Hotel
                </option>
                <option value="resort">
                  Resort
                </option>
                <option value="boutique">
                  Boutique
                </option>
                <option value="homestay">
                  Homestay
                </option>
                <option value="villa">
                  Villa
                </option>
                <option value="guesthouse">
                  Guesthouse
                </option>
                <option value="camp">
                  Camp
                </option>
                <option value="other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Star Classification *
              </label>

              <select
                value={form.starRating}
                onChange={(e) =>
                  updateField(
                    "starRating",
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value={1}>
                  1 Star
                </option>
                <option value={2}>
                  2 Stars
                </option>
                <option value={3}>
                  3 Stars
                </option>
                <option value={4}>
                  4 Stars
                </option>
                <option value={5}>
                  5 Stars
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Country *
              </label>

              <input
                value={form.country}
                onChange={(e) =>
                  updateField(
                    "country",
                    e.target.value
                  )
                }
                placeholder="India"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Location
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Exact hotel location and
              destination-area information.
            </p>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Area
              </label>

              <input
                value={form.area}
                onChange={(e) =>
                  updateField(
                    "area",
                    e.target.value
                  )
                }
                placeholder="Mall Road"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                value={form.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
                placeholder="Shimla"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                value={form.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value
                  )
                }
                placeholder="Himachal Pradesh"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Full Address
              </label>

              <textarea
                rows={3}
                value={form.address}
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                placeholder="Hotel address..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600"
              />
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Hotel Description
            </h2>
          </div>

          <div className="space-y-6 p-8">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Short Description *
              </label>

              <textarea
                rows={3}
                required
                value={
                  form.shortDescription
                }
                onChange={(e) =>
                  updateField(
                    "shortDescription",
                    e.target.value
                  )
                }
                placeholder="A short introduction to the hotel..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600"
              />

              <p className="mt-1 text-xs text-slate-400">
                {form.shortDescription.length}
                / 300
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Description *
              </label>

              <textarea
                rows={9}
                required
                value={form.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Detailed description of the hotel, experience, location and stay..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600"
              />

              <p className="mt-1 text-xs text-slate-400">
                {form.description.length}
                / 10000
              </p>
            </div>
          </div>
        </section>

        {/* IMAGES */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Hotel Images
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload the main hotel image and
              additional gallery images.
            </p>
          </div>

          <div className="space-y-8 p-8">
            <div>
              <label className="mb-3 block text-sm font-medium">
                Hero Image
              </label>

              <CloudinaryUploader
                multiple={false}
                value={form.heroImage}
                onChange={(value) =>
                  updateField(
                    "heroImage",
                    value as string
                  )
                }
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">
                Gallery Images
              </label>

              <CloudinaryUploader
                multiple
                value={form.gallery}
                onChange={(value) =>
                  updateField(
                    "gallery",
                    value as string[]
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* ROOMS */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
            <div>
              <h2 className="text-xl font-semibold">
                Room Types
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the room types offered by
                this hotel.
              </p>
            </div>

            <button
              type="button"
              onClick={addRoom}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              <Plus className="h-4 w-4" />
              Add Room
            </button>
          </div>

          <div className="space-y-6 p-8">
            {form.roomTypes.map(
              (room, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Room {index + 1}
                    </h3>

                    {form.roomTypes
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeRoom(
                            index
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Room Name
                      </label>

                      <input
                        value={room.name}
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Deluxe Room"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Bed Type
                      </label>

                      <input
                        value={room.bedType}
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "bedType",
                            e.target.value
                          )
                        }
                        placeholder="King Bed"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Occupancy
                      </label>

                      <input
                        value={room.occupancy}
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "occupancy",
                            e.target.value
                          )
                        }
                        placeholder="2 Adults"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Room Description
                      </label>

                      <textarea
                        rows={3}
                        value={
                          room.description
                        }
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe the room..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* AMENITIES */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
            <div>
              <h2 className="text-xl font-semibold">
                Amenities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add facilities and services
                available at the hotel.
              </p>
            </div>

            <button
              type="button"
              onClick={addAmenity}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              <Plus className="h-4 w-4" />
              Add Amenity
            </button>
          </div>

          <div className="space-y-4 p-8">
            {form.amenities.map(
              (amenity, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    value={amenity}
                    onChange={(e) =>
                      updateAmenity(
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Free Wi-Fi"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeAmenity(
                        index
                      )
                    }
                    className="rounded-xl bg-red-50 px-4 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* POLICIES */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Hotel Policies
            </h2>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Check-in
              </label>

              <input
                value={form.policies.checkIn}
                onChange={(e) =>
                  updatePolicy(
                    "checkIn",
                    e.target.value
                  )
                }
                placeholder="2:00 PM"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Check-out
              </label>

              <input
                value={
                  form.policies.checkOut
                }
                onChange={(e) =>
                  updatePolicy(
                    "checkOut",
                    e.target.value
                  )
                }
                placeholder="11:00 AM"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Cancellation Policy
              </label>

              <textarea
                rows={4}
                value={
                  form.policies
                    .cancellation
                }
                onChange={(e) =>
                  updatePolicy(
                    "cancellation",
                    e.target.value
                  )
                }
                placeholder="Cancellation terms..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Child Policy
              </label>

              <textarea
                rows={4}
                value={
                  form.policies
                    .childPolicy
                }
                onChange={(e) =>
                  updatePolicy(
                    "childPolicy",
                    e.target.value
                  )
                }
                placeholder="Child and extra bed policy..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Other Policies
              </label>

              <textarea
                rows={4}
                value={
                  form.policies.other
                }
                onChange={(e) =>
                  updatePolicy(
                    "other",
                    e.target.value
                  )
                }
                placeholder="Other important hotel policies..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* RATINGS */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Guest Rating
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Only enter genuine review data.
              Star classification above is
              separate from guest rating.
            </p>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Guest Rating
              </label>

              <select
                value={
                  form.guestRating === null
                    ? ""
                    : form.guestRating
                }
                onChange={(e) =>
                  updateField(
                    "guestRating",
                    e.target.value === ""
                      ? null
                      : Number(
                          e.target.value
                        )
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="">
                  No Rating
                </option>

                <option value="1">
                  1.0
                </option>
                <option value="1.5">
                  1.5
                </option>
                <option value="2">
                  2.0
                </option>
                <option value="2.5">
                  2.5
                </option>
                <option value="3">
                  3.0
                </option>
                <option value="3.5">
                  3.5
                </option>
                <option value="4">
                  4.0
                </option>
                <option value="4.5">
                  4.5
                </option>
                <option value="5">
                  5.0
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Review Count
              </label>

              <input
                type="number"
                min={0}
                value={form.reviewCount}
                onChange={(e) =>
                  updateField(
                    "reviewCount",
                    Math.max(
                      0,
                      Number(
                        e.target.value
                      )
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold">
              SEO Information
            </h2>
          </div>

          <div className="space-y-6 p-8">
            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Title
              </label>

              <input
                maxLength={60}
                value={form.seoTitle}
                onChange={(e) =>
                  updateField(
                    "seoTitle",
                    e.target.value
                  )
                }
                placeholder="Best Hotels in Shimla | The Musafir Diaries"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

              <p className="mt-1 text-xs text-slate-400">
                {form.seoTitle.length}/60
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Description
              </label>

              <textarea
                rows={4}
                maxLength={160}
                value={
                  form.seoDescription
                }
                onChange={(e) =>
                  updateField(
                    "seoDescription",
                    e.target.value
                  )
                }
                placeholder="Discover a comfortable stay in Shimla with The Musafir Diaries..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

              <p className="mt-1 text-xs text-slate-400">
                {
                  form.seoDescription
                    .length
                }
                /160
              </p>
            </div>
          </div>
        </section>

        {/* SETTINGS + SUMMARY */}
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-8 py-6">
              <h2 className="text-xl font-semibold">
                Hotel Settings
              </h2>
            </div>

            <div className="space-y-6 p-8">
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">
                <div>
                  <p className="font-semibold">
                    Featured Hotel
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Show this hotel in
                    featured hotel sections.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.featured}
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
                  Display Order
                </label>

                <input
                  type="number"
                  min={0}
                  value={form.displayOrder}
                  onChange={(e) =>
                    updateField(
                      "displayOrder",
                      Math.max(
                        0,
                        Number(
                          e.target.value
                        )
                      )
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as HotelStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="active">
                    Active
                  </option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-8 py-6">
              <h2 className="text-xl font-semibold">
                Summary
              </h2>
            </div>

            <div className="space-y-5 p-8">
              <SummaryRow
                label="Hotel"
                value={
                  form.name || "-"
                }
              />

              <SummaryRow
                label="Destination"
                value={
                  selectedDestination
                    ?.name || "-"
                }
              />

              <SummaryRow
                label="Hotel Type"
                value={form.hotelType}
                capitalize
              />

              <SummaryRow
                label="Star Classification"
                value={`${form.starRating} Star`}
              />

              <SummaryRow
                label="Rooms"
                value={String(
                  form.roomTypes.filter(
                    (room) =>
                      room.name.trim()
                  ).length
                )}
              />

              <SummaryRow
                label="Amenities"
                value={String(
                  form.amenities.filter(
                    (amenity) =>
                      amenity.trim()
                  ).length
                )}
              />

              <SummaryRow
                label="Gallery"
                value={`${form.gallery.length} images`}
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    form.status ===
                    "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {form.status}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 py-5 backdrop-blur">
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/hotels"
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-7 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Hotel...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Create Hotel
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <span className="text-slate-500">
        {label}
      </span>

      <span
        className={`max-w-[60%] text-right font-semibold ${
          capitalize
            ? "capitalize"
            : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}