import Link from "next/link";
import {
  Compass,
  Home,
  MapPin,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">

      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

          <Compass className="h-12 w-12 text-emerald-700" />

        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          404 Destination
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
          Destination Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          The destination you're looking for doesn't exist,
          may have been removed, or the link you followed is
          incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/destinations"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              hover:bg-emerald-700
            "
          >
            <MapPin className="h-5 w-5" />
            Explore Destinations
          </Link>

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-8
              py-4
              font-semibold
              text-slate-700
              transition-all
              hover:bg-slate-100
            "
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}