import Link from "next/link";
import {
  ArrowRight,
  FilePlus2,
  Hotel,
  MapPinned,
  PackagePlus,
  PenLine,
} from "lucide-react";

const actions = [
  {
    title: "Add destination",
    description: "Create a new place",
    href: "/admin/destinations/new",
    icon: MapPinned,
  },
  {
    title: "Add package",
    description: "Create a new journey",
    href: "/admin/packages/new",
    icon: PackagePlus,
  },
  {
    title: "Add hotel",
    description: "Add a new stay",
    href: "/admin/hotels/new",
    icon: Hotel,
  },
  {
    title: "Write a blog",
    description: "Publish a journal story",
    href: "/admin/blogs/new",
    icon: PenLine,
  },
  {
    title: "Add testimonial",
    description: "Add a guest experience",
    href: "/admin/testimonials/new",
    icon: FilePlus2,
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
          Shortcuts
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#071A33]">
          Quick actions
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_6px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087E8B]/20 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/[0.08] text-[#087E8B] transition-colors group-hover:bg-[#087E8B] group-hover:text-white">
                <Icon className="h-4.5 w-4.5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-[#071A33]">
                  {action.title}
                </span>

                <span className="mt-0.5 block truncate text-xs text-slate-400">
                  {action.description}
                </span>
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#087E8B]" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}