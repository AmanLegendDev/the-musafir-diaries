"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  BedDouble,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  Hotel as HotelIcon,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";

import PageHeader from "@/components/admin/shared/PageHeader";

interface DestinationRef {
  _id: string;
  name: string;
  slug?: string;
}

interface RoomType {
  _id?: string;
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

interface Hotel {
  _id: string;
  name: string;
  slug: string;

  destination:
    | DestinationRef
    | string
    | null;

  area: string;
  address: string;
  city: string;
  state: string;
  country: string;

  starRating: number;

  hotelType:
    | "hotel"
    | "resort"
    | "boutique"
    | "homestay"
    | "villa"
    | "guesthouse"
    | "camp"
    | "other";

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
  status: "active" | "draft";

  seoTitle: string;
  seoDescription: string;

  createdAt: string;
  updatedAt: string;
}

type FilterStatus =
  | "all"
  | "active"
  | "draft";

export default function HotelListing() {
  const [hotels, setHotels] =
    useState<Hotel[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<FilterStatus>("all");

  const [destinationFilter, setDestinationFilter] =
    useState("all");

  const [viewHotel, setViewHotel] =
    useState<Hotel | null>(null);

  const [deleteHotel, setDeleteHotel] =
    useState<Hotel | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  async function loadHotels() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/hotels",
        {
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Unable to load hotels."
        );
      }

      setHotels(result.hotels || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load hotels."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHotels();
  }, []);

  const destinations = useMemo(() => {
    const map = new Map<string, string>();

    hotels.forEach((hotel) => {
      if (
        hotel.destination &&
        typeof hotel.destination === "object"
      ) {
        map.set(
          hotel.destination._id,
          hotel.destination.name
        );
      }
    });

    return Array.from(map.entries()).map(
      ([id, name]) => ({
        id,
        name,
      })
    );
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const destinationName =
        hotel.destination &&
        typeof hotel.destination === "object"
          ? hotel.destination.name
          : "";

      const matchesSearch =
        !query ||
        hotel.name
          .toLowerCase()
          .includes(query) ||
        hotel.city
          .toLowerCase()
          .includes(query) ||
        hotel.area
          .toLowerCase()
          .includes(query) ||
        destinationName
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        hotel.status === status;

      const destinationId =
        hotel.destination &&
        typeof hotel.destination === "object"
          ? hotel.destination._id
          : "";

      const matchesDestination =
        destinationFilter === "all" ||
        destinationId === destinationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDestination
      );
    });
  }, [
    hotels,
    search,
    status,
    destinationFilter,
  ]);

  const stats = useMemo(() => {
    return {
      total: hotels.length,
      active: hotels.filter(
        (hotel) =>
          hotel.status === "active"
      ).length,
      draft: hotels.filter(
        (hotel) =>
          hotel.status === "draft"
      ).length,
      featured: hotels.filter(
        (hotel) => hotel.featured
      ).length,
    };
  }, [hotels]);

  async function handleDelete() {
    if (!deleteHotel) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/hotels/${deleteHotel._id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Unable to delete hotel."
        );
      }

      setHotels((previous) =>
        previous.filter(
          (hotel) =>
            hotel._id !==
            deleteHotel._id
        )
      );

      setDeleteHotel(null);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete hotel."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Hotels & Stays"
        description="Manage the hotels, resorts, homestays and mountain stays shown across The Musafir Diaries."
        buttonText="Add Hotel"
        buttonHref="/admin/hotels/new"
      />

      {/* ================= STATS ================= */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Hotels"
          value={stats.total}
          icon={
            <HotelIcon className="h-5 w-5" />
          }
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={
            <Check className="h-5 w-5" />
          }
          tone="green"
        />

        <StatCard
          label="Drafts"
          value={stats.draft}
          icon={
            <ShieldCheck className="h-5 w-5" />
          }
          tone="amber"
        />

        <StatCard
          label="Featured"
          value={stats.featured}
          icon={
            <Star className="h-5 w-5" />
          }
          tone="orange"
        />
      </div>

      {/* ================= FILTER BAR ================= */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search hotels, cities or destinations..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          {/* Destination */}

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <select
              value={
                destinationFilter
              }
              onChange={(event) =>
                setDestinationFilter(
                  event.target.value
                )
              }
              className="h-11 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm text-slate-700 outline-none transition focus:border-[#1597C7] focus:bg-white"
            >
              <option value="all">
                All destinations
              </option>

              {destinations.map(
                (destination) => (
                  <option
                    key={destination.id}
                    value={
                      destination.id
                    }
                  >
                    {destination.name}
                  </option>
                )
              )}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Status */}

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <Filter className="ml-2 h-4 w-4 text-slate-400" />

            {(
              [
                "all",
                "active",
                "draft",
              ] as FilterStatus[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setStatus(item)
                }
                className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize transition ${
                  status === item
                    ? "bg-[#071A33] text-white shadow-sm"
                    : "text-slate-500 hover:bg-white hover:text-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          <div className="flex items-center justify-between gap-4">
            <span>{error}</span>

            <button
              onClick={loadHotels}
              className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <HotelSkeleton
              key={index}
            />
          ))}
        </div>
      ) : filteredHotels.length ===
        0 ? (
        <EmptyState
          hasFilters={
            Boolean(search) ||
            status !== "all" ||
            destinationFilter !==
              "all"
          }
          onClear={() => {
            setSearch("");
            setStatus("all");
            setDestinationFilter(
              "all"
            );
          }}
        />
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredHotels.map(
            (hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                onView={() =>
                  setViewHotel(hotel)
                }
                onDelete={() =>
                  setDeleteHotel(hotel)
                }
              />
            )
          )}
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}

      {viewHotel && (
        <HotelViewModal
          hotel={viewHotel}
          onClose={() =>
            setViewHotel(null)
          }
          onDelete={() => {
            setDeleteHotel(
              viewHotel
            );
            setViewHotel(null);
          }}
        />
      )}

      {/* ================= DELETE MODAL ================= */}

      {deleteHotel && (
        <DeleteHotelModal
          hotel={deleteHotel}
          deleting={deleting}
          onCancel={() =>
            setDeleteHotel(null)
          }
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

/* =========================================================
   HOTEL CARD
========================================================= */

function HotelCard({
  hotel,
  onView,
  onDelete,
}: {
  hotel: Hotel;
  onView: () => void;
  onDelete: () => void;
}) {
  const destinationName =
    hotel.destination &&
    typeof hotel.destination === "object"
      ? hotel.destination.name
      : "Destination";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5">
      {/* Image */}

      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {hotel.heroImage ? (
          <Image
            src={hotel.heroImage}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <HotelIcon className="h-12 w-12" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        {/* Status */}

        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${
              hotel.status ===
              "active"
                ? "bg-emerald-500/90 text-white"
                : "bg-amber-400/95 text-slate-900"
            }`}
          >
            {hotel.status}
          </span>

          {hotel.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B]/95 px-2.5 py-1 text-[10px] font-bold text-white">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Stars */}

        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Star
              key={index}
              className={`h-3.5 w-3.5 ${
                index <
                hotel.starRating
                  ? "fill-[#F59E0B] text-[#F59E0B]"
                  : "text-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-[#071A33]">
              {hotel.name}
            </h2>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {destinationName}
                {hotel.area
                  ? ` · ${hotel.area}`
                  : ""}
              </span>
            </div>
          </div>

          <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {hotel.hotelType}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {hotel.shortDescription ||
            hotel.description ||
            "No hotel description added yet."}
        </p>

        {/* Meta */}

        <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-100 bg-slate-50 py-3">
          <MiniStat
            label="Rooms"
            value={String(
              hotel.roomTypes
                ?.length || 0
            )}
          />

          <MiniStat
            label="Rating"
            value={
              hotel.guestRating !==
                null &&
              hotel.reviewCount > 0
                ? `${hotel.guestRating.toFixed(
                    1
                  )} ★`
                : "No reviews"
            }
          />

          <MiniStat
            label="Gallery"
            value={String(
              hotel.gallery
                ?.length || 0
            )}
          />
        </div>

        {/* Actions */}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>

          <Link
            href={`/admin/hotels/${hotel._id}/edit`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#071A33] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </Link>

          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${hotel.name}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 transition hover:border-rose-200 hover:bg-rose-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   VIEW MODAL
========================================================= */

function HotelViewModal({
  hotel,
  onClose,
  onDelete,
}: {
  hotel: Hotel;
  onClose: () => void;
  onDelete: () => void;
}) {
  const destinationName =
    hotel.destination &&
    typeof hotel.destination === "object"
      ? hotel.destination.name
      : "Destination";

  return (
    <Modal onClose={onClose}>
      <div className="overflow-hidden">
        {/* Hero */}

        <div className="relative h-56 bg-slate-100">
          {hotel.heroImage && (
            <Image
              src={hotel.heroImage}
              alt={hotel.name}
              fill
              sizes="700px"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/90 via-[#071A33]/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur">
                {hotel.status}
              </span>

              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur">
                {hotel.hotelType}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold">
              {hotel.name}
            </h2>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
              <MapPin className="h-3.5 w-3.5" />
              {destinationName}
              {hotel.area
                ? ` · ${hotel.area}`
                : ""}
            </p>
          </div>
        </div>

        {/* Details */}

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <DetailBox
              label="Star Rating"
              value={`${hotel.starRating} / 5`}
            />

            <DetailBox
              label="Guest Rating"
              value={
                hotel.guestRating !==
                  null &&
                hotel.reviewCount > 0
                  ? `${hotel.guestRating.toFixed(
                      1
                    )} (${hotel.reviewCount})`
                  : "No reviews"
              }
            />

            <DetailBox
              label="Rooms"
              value={String(
                hotel.roomTypes
                  ?.length || 0
              )}
            />
          </div>

          <div className="mt-6">
            <ModalSection title="Description">
              <p className="text-sm leading-7 text-slate-600">
                {hotel.description ||
                  hotel.shortDescription ||
                  "No description added."}
              </p>
            </ModalSection>
          </div>

          <ModalSection title="Location">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <InfoItem
                label="Area"
                value={
                  hotel.area || "—"
                }
              />

              <InfoItem
                label="City"
                value={
                  hotel.city || "—"
                }
              />

              <InfoItem
                label="State"
                value={
                  hotel.state || "—"
                }
              />

              <InfoItem
                label="Country"
                value={
                  hotel.country || "—"
                }
              />

              <InfoItem
                label="Address"
                value={
                  hotel.address || "—"
                }
              />
            </div>
          </ModalSection>

          <ModalSection title="Amenities">
            {hotel.amenities?.length ? (
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map(
                  (amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {amenity}
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No amenities added.
              </p>
            )}
          </ModalSection>

          <ModalSection title="Room Types">
            {hotel.roomTypes
              ?.length ? (
              <div className="space-y-3">
                {hotel.roomTypes.map(
                  (room) => (
                    <div
                      key={
                        room._id ||
                        room.name
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-[#071A33]">
                            {room.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {room.description ||
                              "No description"}
                          </p>
                        </div>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                          {room.bedType ||
                            "Bed not specified"}
                        </span>
                      </div>

                      {room.occupancy && (
                        <p className="mt-2 text-[11px] text-slate-400">
                          Occupancy:{" "}
                          {
                            room.occupancy
                          }
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No room types added.
              </p>
            )}
          </ModalSection>

          <ModalSection title="Policies">
            <div className="space-y-3">
              <InfoItem
                label="Check-in"
                value={
                  hotel.policies
                    ?.checkIn ||
                  "—"
                }
              />

              <InfoItem
                label="Check-out"
                value={
                  hotel.policies
                    ?.checkOut ||
                  "—"
                }
              />

              <InfoItem
                label="Cancellation"
                value={
                  hotel.policies
                    ?.cancellation ||
                  "—"
                }
              />

              <InfoItem
                label="Child Policy"
                value={
                  hotel.policies
                    ?.childPolicy ||
                  "—"
                }
              />
            </div>
          </ModalSection>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>

          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>

          <Link
            href={`/admin/hotels/${hotel._id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#071A33] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2747]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Hotel
          </Link>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteHotelModal({
  hotel,
  deleting,
  onCancel,
  onConfirm,
}: {
  hotel: Hotel;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal onClose={onCancel}>
      <div className="p-6 sm:p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <Trash2 className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#071A33]">
          Delete this hotel?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You are about to permanently
          delete{" "}
          <strong className="font-semibold text-slate-700">
            {hotel.name}
          </strong>
          . This action cannot be undone.
        </p>

        <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50/60 p-3.5">
          <p className="text-xs text-rose-700">
            The hotel and its CMS data
            will be removed from the
            database.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                Delete Hotel
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071A33]/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone = "blue",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "orange";
}) {
  const tones = {
    blue: "bg-sky-50 text-[#1597C7]",
    green:
      "bg-emerald-50 text-emerald-600",
    amber:
      "bg-amber-50 text-amber-600",
    orange:
      "bg-orange-50 text-orange-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-[#071A33]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-400">
        {label}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-2 text-center">
      <p className="text-xs font-bold text-[#071A33]">
        {value}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#071A33]">
        {value}
      </p>
    </div>
  );
}

function ModalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h3>

      {children}
    </section>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-600">
        {value}
      </p>
    </div>
  );
}

function HotelSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[16/9] animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <HotelIcon className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#071A33]">
        {hasFilters
          ? "No hotels match your filters"
          : "No hotels found"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilters
          ? "Try changing your search or filters to find another hotel."
          : "Start building your hotel collection for The Musafir Diaries."}
      </p>

      {hasFilters ? (
        <button
          onClick={onClear}
          className="mt-6 rounded-xl bg-[#071A33] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2747]"
        >
          Clear Filters
        </button>
      ) : (
        <Link
          href="/admin/hotels/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#071A33] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2747]"
        >
          <Plus className="h-4 w-4" />
          Add First Hotel
        </Link>
      )}
    </div>
  );
}