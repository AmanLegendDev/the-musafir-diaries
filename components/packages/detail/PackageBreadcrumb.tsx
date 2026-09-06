"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronRight,
  Home,
  ArrowLeft,
  MapPin,
} from "lucide-react";

interface PackageBreadcrumbProps {
  packageName: string;
  destinationName: string;
  destinationSlug: string;
}

export default function PackageBreadcrumb({
  packageName,
  destinationName,
  destinationSlug,
}: PackageBreadcrumbProps) {
  const router = useRouter();

  return (
    <section className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto px-6 py-5">

<div className="flex flex-col gap-4">
          {/* Back Button */}

          <button
            onClick={() => router.back()}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />

            Back
          </button>

          {/* Breadcrumb */}

        <nav aria-label="Breadcrumb">
  <ol className="flex flex-wrap items-center gap-2 text-sm">

    <li>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-slate-500 transition hover:text-emerald-600"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">
          Home
        </span>
      </Link>
    </li>

    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />

    <li>
      <Link
        href="/packages"
        className="rounded-lg px-2 py-1 text-slate-500 transition hover:text-emerald-600"
      >
        Packages
      </Link>
    </li>

    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />

    <li className="min-w-0 flex-1">
      <span
        className="block truncate rounded-lg bg-emerald-50 px-3 py-1 font-semibold text-emerald-700"
        title={packageName}
      >
        {packageName}
      </span>
    </li>

  </ol>
</nav>

        </div>

      </div>
    </section>
  );
}