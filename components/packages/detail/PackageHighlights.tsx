import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PackageHighlightsProps {
  highlights: string[];
}

export default function PackageHighlights({
  highlights,
}: PackageHighlightsProps) {
  if (!highlights?.length) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <Sparkles className="h-4 w-4" />

            Tour Highlights

          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Why You'll Love This Journey
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Every package is thoughtfully designed to deliver
            unforgettable experiences, breathtaking landscapes,
            and hassle-free travel.
          </p>

        </div>

        {/* Highlights */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                <CheckCircle2 className="h-7 w-7 text-emerald-600 transition group-hover:text-white" />

              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {highlight}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Carefully curated to enhance your travel experience
                with comfort, safety, and unforgettable memories.
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}