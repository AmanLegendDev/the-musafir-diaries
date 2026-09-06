export default function PackageDetailSkeleton() {
  return (
    <main className="animate-pulse">

      {/* Breadcrumb */}

      <section className="border-b bg-white">
        <div className="container mx-auto px-6 py-5">
          <div className="h-4 w-72 rounded bg-slate-200" />
        </div>
      </section>

      {/* Header */}

      <section className="py-12">
        <div className="container mx-auto px-6">

          <div className="mb-6 h-8 w-32 rounded-full bg-slate-200" />

          <div className="h-12 w-3/4 rounded bg-slate-200" />

          <div className="mt-6 flex flex-wrap gap-4">

            <div className="h-6 w-28 rounded bg-slate-200" />
            <div className="h-6 w-32 rounded bg-slate-200" />
            <div className="h-6 w-24 rounded bg-slate-200" />
            <div className="h-6 w-36 rounded bg-slate-200" />

          </div>

          <div className="mt-8 h-10 w-48 rounded-xl bg-slate-200" />

        </div>
      </section>

      {/* Gallery */}

      <section className="pb-20">
        <div className="container mx-auto px-6">

          <div className="grid gap-4 lg:grid-cols-4">

            <div className="h-[420px] rounded-3xl bg-slate-200 lg:col-span-2" />

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">

              <div className="h-[200px] rounded-3xl bg-slate-200" />
              <div className="h-[200px] rounded-3xl bg-slate-200" />
              <div className="h-[200px] rounded-3xl bg-slate-200" />
              <div className="h-[200px] rounded-3xl bg-slate-200" />

            </div>

          </div>

        </div>
      </section>

      {/* Overview + Booking */}

      <section className="py-20">
        <div className="container mx-auto px-6">

          <div className="grid gap-10 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">

              <div className="h-8 w-56 rounded bg-slate-200" />

              <div className="space-y-4">

                <div className="h-4 rounded bg-slate-200" />
                <div className="h-4 rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />

              </div>

              <div className="h-52 rounded-3xl bg-slate-200" />

            </div>

            <div className="h-[520px] rounded-3xl bg-slate-200" />

          </div>

        </div>
      </section>

      {/* Generic Sections */}

      {[1, 2, 3, 4].map((section) => (
        <section
          key={section}
          className="py-20"
        >
          <div className="container mx-auto px-6">

            <div className="mx-auto mb-12 h-10 w-72 rounded bg-slate-200" />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 rounded-3xl bg-slate-200"
                />
              ))}

            </div>

          </div>
        </section>
      ))}

      {/* FAQ */}

      <section className="py-20">
        <div className="container mx-auto px-6">

          <div className="mx-auto mb-10 h-10 w-64 rounded bg-slate-200" />

          <div className="mx-auto max-w-4xl space-y-5">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 rounded-3xl bg-slate-200"
              />
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="bg-slate-800 py-24">
        <div className="container mx-auto px-6 text-center">

          <div className="mx-auto h-10 w-80 rounded bg-slate-600" />

          <div className="mx-auto mt-6 h-5 w-2/3 rounded bg-slate-600" />

          <div className="mt-10 flex justify-center gap-4">

            <div className="h-12 w-40 rounded-xl bg-slate-600" />
            <div className="h-12 w-40 rounded-xl bg-slate-600" />
            <div className="h-12 w-40 rounded-xl bg-slate-600" />

          </div>

        </div>
      </section>

    </main>
  );
}