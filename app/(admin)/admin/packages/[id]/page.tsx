import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Image as ImageIcon,
  MapPin,
  Star,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

import connectDB from "@/lib/db";
import Package from "@/models/package.model";

import DeletePackageButton from "@/components/admin/packages/DeletePackageButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function PackageDetailPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const pkg = await Package.findById(id)
    .populate("destination", "name slug")
    .populate("category", "name slug")
    .lean();

  if (!pkg) {
    notFound();
  }

  const data = JSON.parse(JSON.stringify(pkg));

  const discount =
    data.originalPrice > 0
      ? Math.round(
          ((data.originalPrice - data.discountedPrice) /
            data.originalPrice) *
            100
        )
      : 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/packages"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#1597C7]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                data.status === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {data.status}
            </span>

            {data.featured && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#071A33] sm:text-4xl">
            {data.name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {data.shortDescription ||
              "No short description added."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/packages/${data._id}/edit`}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-[#1597C7]/30 hover:text-[#1597C7]"
          >
            <Edit3 className="h-4 w-4" />
            Edit Package
          </Link>

          <DeletePackageButton
            id={data._id}
            name={data.name}
          />
        </div>
      </div>

      {/* Hero */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-[320px] overflow-hidden sm:h-[420px]">
          {data.heroImage ? (
            <img
              src={data.heroImage}
              alt={data.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-slate-300">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {data.destination?.name ||
                "Destination"}
            </p>

            <div className="mt-2 flex flex-wrap items-end gap-4">
              <span className="text-3xl font-bold sm:text-4xl">
                {formatPrice(data.discountedPrice)}
              </span>

              {data.originalPrice >
                data.discountedPrice && (
                <span className="mb-1 text-sm text-white/55 line-through">
                  {formatPrice(data.originalPrice)}
                </span>
              )}

              {discount > 0 && (
                <span className="mb-1 rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid divide-y border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <Fact
            icon={<CalendarDays className="h-4 w-4" />}
            label="Duration"
            value={data.duration || "Not set"}
          />

          <Fact
            icon={<Users className="h-4 w-4" />}
            label="Group Size"
            value={data.groupSize || "Not set"}
          />

          <Fact
            icon={<Clock3 className="h-4 w-4" />}
            label="Difficulty"
            value={data.difficulty || "Not set"}
          />

          <Fact
            icon={<MapPin className="h-4 w-4" />}
            label="Destination"
            value={
              data.destination?.name || "Not assigned"
            }
          />
        </div>
      </div>

      {/* Main content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="About This Package">
            <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
              {data.description ||
                "No detailed description added."}
            </p>
          </DetailCard>

          <DetailCard title="Package Highlights">
            {data.highlights?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {data.highlights.map(
                  (item: string, index: number) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText />
            )}
          </DetailCard>

          <DetailCard title="Day-by-Day Itinerary">
            {data.itinerary?.length ? (
              <div className="space-y-4">
                {data.itinerary.map(
                  (
                    day: {
                      day: number;
                      title: string;
                      description: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={`${day.day}-${index}`}
                      className="relative flex gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071A33] text-xs font-bold text-white">
                        D{day.day}
                      </div>

                      <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                        <h3 className="text-sm font-bold text-slate-900">
                          {day.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText />
            )}
          </DetailCard>

          <div className="grid gap-6 md:grid-cols-2">
            <DetailCard title="What's Included">
              <BulletList
                items={data.included}
                icon="check"
              />
            </DetailCard>

            <DetailCard title="What's Excluded">
              <BulletList
                items={data.excluded}
                icon="cross"
              />
            </DetailCard>
          </div>

          <DetailCard title="Gallery">
            {data.gallery?.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {data.gallery.map(
                  (image: string, index: number) => (
                    <div
                      key={`${image}-${index}`}
                      className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                    >
                      <img
                        src={image}
                        alt={`${data.name} gallery ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText text="No gallery images added." />
            )}
          </DetailCard>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <DetailCard title="Package Information">
            <div className="space-y-4">
              <InfoRow
                label="Category"
                value={
                  data.category?.name || "Not assigned"
                }
              />

              <InfoRow
                label="Destination"
                value={
                  data.destination?.name ||
                  "Not assigned"
                }
              />

              <InfoRow
                label="Difficulty"
                value={data.difficulty || "Not set"}
              />

              <InfoRow
                label="Group Size"
                value={data.groupSize || "Not set"}
              />

              <InfoRow
                label="Gallery"
                value={`${data.gallery?.length || 0} images`}
              />

              <InfoRow
                label="Itinerary"
                value={`${data.itinerary?.length || 0} days`}
              />
            </div>
          </DetailCard>

          <DetailCard title="Child Policy">
            <div className="space-y-4">
              <InfoRow
                label="Complimentary below"
                value={`${data.childPolicy?.complimentaryBelow ?? 5} years`}
              />

              <InfoRow
                label="Half price below"
                value={`${data.childPolicy?.halfPriceBelow ?? 10} years`}
              />

              <InfoRow
                label="Half price"
                value={`${data.childPolicy?.halfPricePercentage ?? 50}%`}
              />
            </div>
          </DetailCard>

          <DetailCard title="SEO">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SEO Title
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {data.seoTitle || "Not configured"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SEO Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {data.seoDescription ||
                    "Not configured"}
                </p>
              </div>
            </div>
          </DetailCard>
        </aside>
      </div>
    </div>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="text-[#1597C7]">{icon}</div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold capitalize text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-bold text-[#071A33]">
        {title}
      </h2>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function BulletList({
  items,
  icon,
}: {
  items: string[];
  icon: "check" | "cross";
}) {
  if (!items?.length) {
    return <EmptyText />;
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex gap-3 text-sm leading-6 text-slate-600"
        >
          {icon === "check" ? (
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
          )}

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function EmptyText({
  text = "No information added yet.",
}: {
  text?: string;
}) {
  return (
    <p className="text-sm text-slate-400">
      {text}
    </p>
  );
}