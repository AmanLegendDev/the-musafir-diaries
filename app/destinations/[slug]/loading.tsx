import {
  Camera,
  MapPin,
} from "lucide-react";

export default function Loading() {
  return (
    <main className="animate-pulse">

      {/* Breadcrumb */}

      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-5 lg:px-8">

          <div className="h-4 w-60 rounded-full bg-slate-200" />

        </div>
      </div>

      {/* Gallery */}

      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="mb-8">
            <div className="h-8 w-52 rounded-full bg-slate-200" />

            <div className="mt-4 h-4 w-80 rounded-full bg-slate-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

            <div className="aspect-[16/10] rounded-3xl bg-slate-200" />

            <div className="hidden grid-cols-2 gap-4 lg:grid">

              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-slate-200"
                />
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* Overview */}

      <section className="py-10">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            <div>

              <div className="h-10 w-72 rounded-full bg-slate-200" />

              <div className="mt-6 space-y-3">

                <div className="h-4 rounded-full bg-slate-200" />

                <div className="h-4 rounded-full bg-slate-200" />

                <div className="h-4 w-3/4 rounded-full bg-slate-200" />

              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">

                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="h-12 w-12 rounded-xl bg-slate-200" />

                    <div className="mt-5 h-4 w-24 rounded-full bg-slate-200" />

                    <div className="mt-3 h-5 w-40 rounded-full bg-slate-200" />

                  </div>
                ))}

              </div>

            </div>

            {/* Sidebar */}

            <div className="space-y-6">

              <div className="rounded-3xl border border-slate-200 p-6">

                <div className="h-8 w-40 rounded-full bg-slate-200" />

                <div className="mt-6 h-12 w-52 rounded-full bg-slate-200" />

                <div className="mt-8 space-y-4">

                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 rounded-full bg-slate-200"
                    />
                  ))}

                </div>

                <div className="mt-8 h-12 rounded-xl bg-slate-200" />

                <div className="mt-3 h-12 rounded-xl bg-slate-200" />

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Generic Sections */}

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 p-6"
              >
                <Camera className="h-10 w-10 text-slate-200" />

                <div className="mt-6 h-6 w-36 rounded-full bg-slate-200" />

                <div className="mt-4 h-4 rounded-full bg-slate-200" />

                <div className="mt-3 h-4 w-3/4 rounded-full bg-slate-200" />

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}