import {
  CheckCircle2,
  Sparkles,
  XCircle,
} from "lucide-react";

interface PackageIncludedExcludedProps {
  included: string[];
  excluded: string[];
}

export default function PackageIncludedExcluded({
  included,
  excluded,
}: PackageIncludedExcludedProps) {
  if (!included?.length && !excluded?.length) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">

        <div className="mb-14 text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <Sparkles className="h-4 w-4" />

            What's Included

          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Included & Excluded
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Everything that's covered in your package along with
            items that you'll need to arrange separately.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Included */}

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">

            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-emerald-700">

              <CheckCircle2 className="h-7 w-7" />

              Included

            </h3>

            <div className="space-y-5">

              {included.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <span className="leading-7 text-slate-700">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Excluded */}

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-red-600">

              <XCircle className="h-7 w-7" />

              Not Included

            </h3>

            <div className="space-y-5">

              {excluded.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                  <span className="leading-7 text-slate-700">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}