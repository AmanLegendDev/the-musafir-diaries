import PackageCard from "./PackageCard";
import EmptyState from "./EmptyState";

interface PackageGridProps {
  packages: any[];
  searching?: boolean;
  search?: string;
}
export default function PackageGrid({
  packages,
  searching = false,
  search = "",
}: PackageGridProps) {
  if (!packages.length) {
    return <EmptyState />;
  }

  return (
    <section
      id="packages"
      className="py-16"
    >
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
<div>
  {searching ? (
    <>
      <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Search Results
      </span>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">
        Results for "{search}"
      </h2>

      <p className="mt-3 max-w-2xl text-slate-600">
        Found {packages.length} matching travel package
        {packages.length !== 1 ? "s" : ""}.
      </p>
    </>
  ) : (
    <>
      <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Curated Collection
      </span>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">
        Explore Our Packages
      </h2>

      <p className="mt-3 max-w-2xl text-slate-600">
        Discover premium travel experiences
        carefully crafted for unforgettable
        adventures across the Himalayas.
      </p>
    </>
  )}
</div>

          <div className="rounded-2xl bg-slate-100 px-5 py-3">

            <span className="text-sm text-slate-500">
              Showing
            </span>

            <p className="text-2xl font-bold text-slate-900">
              {packages.length}
            </p>

            <span className="text-sm text-slate-500">
              Packages
            </span>

          </div>

        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {packages.map((packageItem) => (
            <PackageCard
              key={packageItem._id}
              packageData={packageItem}
            />
          ))}

        </div>

      </div>
    </section>
  );
}