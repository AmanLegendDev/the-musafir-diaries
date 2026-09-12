import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Edit3,
  ImageIcon,
  MapPin,
  Plus,
  Star,
} from "lucide-react";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

import DestinationDeleteButton from "@/components/admin/destinations/DestinationDeleteButton";

interface DestinationItem {
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
  createdAt: string;
  updatedAt: string;
}

async function getDestinations(): Promise<DestinationItem[]> {
  await connectDB();

  const destinations = await Destination.find({})
    .sort({
      featured: -1,
      featuredOrder: 1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(
    JSON.stringify(destinations),
  ) as DestinationItem[];
}

function formatPrice(price: number) {
  if (!price || price <= 0) {
    return "Price on enquiry";
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

function getLocation(destination: DestinationItem) {
  return [destination.city, destination.state, destination.country]
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index,
    )
    .join(", ");
}

function getDescription(destination: DestinationItem) {
  return (
    destination.shortDescription ||
    destination.description ||
    "No destination description added yet."
  );
}

function DestinationCard({
  destination,
}: {
  destination: DestinationItem;
}) {
  const location = getLocation(destination);

  return (
    <article className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {destination.heroImage ? (
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <Compass className="h-12 w-12 text-slate-300" />
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md ${
              destination.status === "active"
                ? "bg-emerald-500/90 text-white"
                : "bg-white/90 text-slate-700"
            }`}
          >
            {destination.status}
          </span>

          {destination.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Destination name on image */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
            {destination.country || "Destination"}
          </p>

          <h2 className="font-serif text-3xl font-medium tracking-[-0.035em] text-white">
            {destination.name}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-[#087E8B]" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {getDescription(destination)}
        </p>

        {/* Key details */}
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
          <div className="bg-slate-50 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Starting from
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatPrice(destination.startingPrice)}
            </p>
          </div>

          <div className="bg-slate-50 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Duration
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {destination.duration || "Not specified"}
            </p>
          </div>

          <div className="bg-slate-50 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Rating
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />

              <span className="text-sm font-semibold text-slate-800">
                {Number(destination.rating || 0).toFixed(1)}
              </span>

              <span className="text-[11px] text-slate-400">
                ({destination.reviewCount || 0})
              </span>
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Gallery
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-[#087E8B]" />

              <span className="text-sm font-semibold text-slate-800">
                {destination.gallery?.length || 0}
              </span>

              <span className="text-[11px] text-slate-400">
                images
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/admin/destinations/${destination._id}`}
            className="group/view inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-4 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#0D2747]"
          >
            View details

            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/view:translate-x-0.5" />
          </Link>

          <Link
            href={`/admin/destinations/${destination._id}`}
            aria-label={`Edit ${destination.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-[#087E8B]/30 hover:bg-[#087E8B]/5 hover:text-[#087E8B]"
          >
            <Edit3 className="h-4 w-4" />
          </Link>

          <DestinationDeleteButton
            id={destination._id}
            name={destination.name}
          />
        </div>
      </div>
    </article>
  );
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  const activeCount = destinations.filter(
    (destination) => destination.status === "active",
  ).length;

  const draftCount = destinations.filter(
    (destination) => destination.status === "draft",
  ).length;

  const featuredCount = destinations.filter(
    (destination) => destination.featured,
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-7 bg-[#087E8B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#087E8B]">
              Content Management
            </span>
          </div>

          <h1 className="font-serif text-4xl font-medium tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Destinations
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage the places, destinations and Himalayan
            journeys shown across The Musafir Diaries.
          </p>
        </div>

        <Link
          href="/admin/destinations/new"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white shadow-lg shadow-[#071A33]/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0D2747]"
        >
          <Plus className="h-4 w-4" />
          Add Destination
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Total destinations
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {destinations.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Active
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-600">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Drafts
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-700">
            {draftCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Featured
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#087E8B]">
            {featuredCount}
          </p>
        </div>
      </div>

      {/* Destination grid */}
      {destinations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[26px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E8B]/10 text-[#087E8B]">
            <Compass className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-900">
            No destinations yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Create your first destination and it will appear
            here with all of its travel information.
          </p>

          <Link
            href="/admin/destinations/new"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <Plus className="h-4 w-4" />
            Create destination
          </Link>
        </div>
      )}
    </div>
  );
}