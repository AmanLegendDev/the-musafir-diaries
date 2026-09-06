import Link from "next/link";
import { Mountain, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

          <Mountain className="h-12 w-12 text-emerald-600" />

        </div>

        <h1 className="mt-8 text-5xl font-bold text-slate-900">
          Package Not Found
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          The travel package you're looking for doesn't exist,
          may have been removed, or the link is incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/packages"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
          >
            Browse Packages
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600"
          >
            <ArrowLeft className="h-5 w-5" />

            Back Home
          </Link>

        </div>

      </div>
    </section>
  );
}