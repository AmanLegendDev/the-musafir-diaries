import {
  CalendarDays,
  MapPin,
  Mountain,
  Tag,
  Users,
  Baby,
  IndianRupee,
} from "lucide-react";

interface ChildPolicy {
  complimentaryBelow: number;
  halfPriceBelow: number;
  halfPricePercentage: number;
}

interface PackageInfoProps {
  destination: string;
  category: string;
  duration: string;
  difficulty: string;
  groupSize: string;
  discountedPrice: number;
  childPolicy: ChildPolicy;
}

export default function PackageInfo({
  destination,
  category,
  duration,
  difficulty,
  groupSize,
  discountedPrice,
  childPolicy,
}: PackageInfoProps) {
  const info = [
    {
      icon: MapPin,
      label: "Destination",
      value: destination,
    },
    {
      icon: Tag,
      label: "Category",
      value: category,
    },
    {
      icon: CalendarDays,
      label: "Duration",
      value: duration,
    },
    {
      icon: Mountain,
      label: "Difficulty",
      value: difficulty,
    },
    {
      icon: Users,
      label: "Group Size",
      value: groupSize,
    },
    {
      icon: IndianRupee,
      label: "Starting From",
      value: `₹${discountedPrice.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Package Information
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Everything You Need To Know
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Essential information about your journey before you
            book your adventure.
          </p>

        </div>

        {/* Info Grid */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {info.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon className="h-7 w-7 text-emerald-600" />

                </div>

                <p className="mt-6 text-sm font-medium uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {item.value}
                </h3>

              </div>
            );
          })}

        </div>

        {/* Child Policy */}

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8">

          <div className="flex items-center gap-3">

            <Baby className="h-7 w-7 text-emerald-600" />

            <h3 className="text-2xl font-bold text-slate-900">
              Child Policy
            </h3>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Complimentary
              </p>

              <h4 className="mt-2 text-3xl font-bold text-emerald-600">
                Below {childPolicy.complimentaryBelow} Years
              </h4>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Half Price
              </p>

              <h4 className="mt-2 text-3xl font-bold text-slate-900">
                Below {childPolicy.halfPriceBelow} Years
              </h4>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Pay
              </p>

              <h4 className="mt-2 text-3xl font-bold text-red-500">
                {childPolicy.halfPricePercentage}%
              </h4>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}