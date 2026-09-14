import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Edit3,
  ImageIcon,
  MapPin,
  Mountain,
  Star,
  Tag,
} from "lucide-react";

import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface DestinationData {
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

  createdAt?: string;
  updatedAt?: string;
}

async function getDestination(
  id: string,
): Promise<DestinationData | null> {
  await connectDB();

  const destination = await Destination.findById(id)
    .lean();

  if (!destination) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(destination),
  ) as DestinationData;
}

function formatPrice(price: number) {
  if (!price || price <= 0) {
    return "Price on enquiry";
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>

          <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
            {value || "Not specified"}
          </p>
        </div>
      </div>
    </div>
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
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_35px_rgba(15,23,42,0.04)]">
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

export default async function DestinationDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const destination = await getDestination(id);

  if (!destination) {
    notFound();
  }

  const location = [
    destination.city,
    destination.state,
    destination.country,
  ]
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index,
    )
    .join(", ");

  const gallery = Array.isArray(
    destination.gallery,
  )
    ? destination.gallery.filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-16">
      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/admin/destinations"
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#087E8B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#087E8B]/10 text-[#087E8B]">
              <MapPin className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087E8B]">
                Destination CMS
              </p>

              <h1 className="mt-1 font-serif text-3xl font-medium tracking-[-0.035em] text-slate-900 sm:text-4xl">
                Destination Details
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Review the complete destination information
            currently stored in the CMS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${
              destination.status === "active"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                destination.status === "active"
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }`}
            />

            {destination.status === "active"
              ? "Active"
              : "Draft"}
          </span>

          <Link
            href={`/admin/destinations/${destination._id}/edit`}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:-translate-y-0.5 hover:bg-[#0D2747]"
          >
            <Edit3 className="h-4 w-4" />
            Edit Destination
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}

      <section className="overflow-hidden rounded-[28px] bg-[#071A33] shadow-[0_15px_60px_rgba(7,26,51,0.12)]">
        <div className="relative min-h-[360px] sm:min-h-[430px]">
          {destination.heroImage ? (
            <Image
              src={destination.heroImage}
              alt={destination.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0D2747]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#071A33]/65 to-[#071A33]/20" />

          <div className="relative flex min-h-[360px] items-end p-6 sm:min-h-[430px] sm:p-9 lg:p-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <MapPin className="h-3 w-3" />
                  {location || "Destination"}
                </span>

                {destination.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#071A33]">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <h2 className="mt-5 font-serif text-4xl font-medium tracking-[-0.045em] text-white sm:text-6xl">
                {destination.name}
              </h2>

              {destination.shortDescription && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  {destination.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* KEY METRICS                                                   */}
      {/* ============================================================ */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={<Tag className="h-4 w-4" />}
          label="Starting from"
          value={formatPrice(
            Number(destination.startingPrice) || 0,
          )}
        />

        <InfoCard
          icon={<Clock3 className="h-4 w-4" />}
          label="Duration"
          value={
            destination.duration ||
            "Not specified"
          }
        />

        <InfoCard
          icon={
            <Star className="h-4 w-4" />
          }
          label="Guest rating"
          value={`${Number(
            destination.rating || 0,
          ).toFixed(1)} · ${
            destination.reviewCount || 0
          } reviews`}
        />

        <InfoCard
          icon={
            <Mountain className="h-4 w-4" />
          }
          label="Altitude"
          value={
            destination.altitude ||
            "Not specified"
          }
        />
      </div>

      {/* ============================================================ */}
      {/* DESCRIPTION                                                    */}
      {/* ============================================================ */}

      <SectionCard
        eyebrow="01 · Story"
        title="About this destination"
        description="The editorial content used to describe the destination."
      >
        {destination.description ? (
          <div className="max-w-4xl whitespace-pre-line text-sm leading-7 text-slate-600">
            {destination.description}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm text-slate-400">
            No full description has been added.
          </div>
        )}
      </SectionCard>

      {/* ============================================================ */}
      {/* DESTINATION INFORMATION                                      */}
      {/* ============================================================ */}

      <SectionCard
        eyebrow="02 · Travel Information"
        title="Destination Details"
        description="Location and practical travel information."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={<MapPin className="h-4 w-4" />}
            label="Country"
            value={
              destination.country ||
              "Not specified"
            }
          />

          <InfoCard
            icon={<MapPin className="h-4 w-4" />}
            label="State"
            value={
              destination.state ||
              "Not specified"
            }
          />

          <InfoCard
            icon={<MapPin className="h-4 w-4" />}
            label="City"
            value={
              destination.city ||
              "Not specified"
            }
          />

          <InfoCard
            icon={
              <CalendarDays className="h-4 w-4" />
            }
            label="Best time"
            value={
              destination.bestTime ||
              "Not specified"
            }
          />

          <InfoCard
            icon={
              <Mountain className="h-4 w-4" />
            }
            label="Altitude"
            value={
              destination.altitude ||
              "Not specified"
            }
          />

          <InfoCard
            icon={<Clock3 className="h-4 w-4" />}
            label="Recommended duration"
            value={
              destination.duration ||
              "Not specified"
            }
          />
        </div>
      </SectionCard>

      {/* ============================================================ */}
      {/* GALLERY                                                       */}
      {/* ============================================================ */}

      <SectionCard
        eyebrow="03 · Media"
        title="Destination Gallery"
        description={`${gallery.length} image${
          gallery.length === 1 ? "" : "s"
        } currently attached to this destination.`}
      >
        {gallery.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${destination.name} gallery ${
                      index + 1
                    }`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-12 text-center">
            <ImageIcon className="mx-auto h-7 w-7 text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-500">
              No gallery images added.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add images from the edit page.
            </p>
          </div>
        )}
      </SectionCard>

      {/* ============================================================ */}
      {/* HOMEPAGE / PUBLISHING                                        */}
      {/* ============================================================ */}

      <SectionCard
        eyebrow="04 · Publishing"
        title="Homepage & Visibility"
        description="Current publishing settings for this destination."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon={
              <Star className="h-4 w-4" />
            }
            label="Featured"
            value={
              destination.featured
                ? "Featured destination"
                : "Not featured"
            }
          />

          <InfoCard
            icon={<Tag className="h-4 w-4" />}
            label="Featured order"
            value={String(
              destination.featuredOrder || 0,
            )}
          />

          <InfoCard
            icon={
              <Check className="h-4 w-4" />
            }
            label="Status"
            value={
              destination.status === "active"
                ? "Published / Active"
                : "Draft"
            }
          />

          <InfoCard
            icon={
              <CalendarDays className="h-4 w-4" />
            }
            label="Last updated"
            value={formatDate(
              destination.updatedAt,
            )}
          />
        </div>
      </SectionCard>

      {/* ============================================================ */}
      {/* SEO                                                            */}
      {/* ============================================================ */}

      <SectionCard
        eyebrow="05 · Search"
        title="SEO Information"
        description="Search-engine information currently configured for this destination."
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              SEO Title
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {destination.seoTitle ||
                "No SEO title configured."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              SEO Description
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {destination.seoDescription ||
                "No SEO description configured."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Public Slug
            </p>

            <p className="mt-2 break-all font-mono text-sm font-medium text-[#087E8B]">
              /destinations/{destination.slug}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* ============================================================ */}
      {/* FOOTER ACTIONS                                                 */}
      {/* ============================================================ */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/destinations"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Destinations
        </Link>

        <Link
          href={`/admin/destinations/${destination._id}/edit`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-6 text-sm font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:bg-[#0D2747]"
        >
          <Edit3 className="h-4 w-4" />
          Edit Destination
        </Link>
      </div>
    </div>
  );
}