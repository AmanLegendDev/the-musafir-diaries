import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Building2,
  FolderTree,
  Hotel,
  Map,
  MessageSquareQuote,
  Package,
  HelpCircle,
} from "lucide-react";

type ContentType =
  | "destinations"
  | "packages"
  | "hotels"
  | "categories"
  | "blogs"
  | "faqs"
  | "testimonials";

interface Props {
  type: ContentType;
  count: number;
}

const config = {
  destinations: {
    title: "Destinations",
    description: "Places & regions",
    href: "/admin/destinations",
    icon: Map,
  },
  packages: {
    title: "Packages",
    description: "Curated journeys",
    href: "/admin/packages",
    icon: Package,
  },
  hotels: {
    title: "Hotels",
    description: "Stays & properties",
    href: "/admin/hotels",
    icon: Hotel,
  },
  categories: {
    title: "Categories",
    description: "Package organization",
    href: "/admin/categories",
    icon: FolderTree,
  },
  blogs: {
    title: "Blogs",
    description: "The Musafir Journal",
    href: "/admin/blogs",
    icon: BookOpenText,
  },
  faqs: {
    title: "FAQs",
    description: "Customer questions",
    href: "/admin/faqs",
    icon: HelpCircle,
  },
  testimonials: {
    title: "Testimonials",
    description: "Guest experiences",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
} satisfies Record<
  ContentType,
  {
    title: string;
    description: string;
    href: string;
    icon: typeof Map;
  }
>;

export default function ContentCard({
  type,
  count,
}: Props) {
  const item = config[type];
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#087E8B]/20 hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087E8B]/[0.08] text-[#087E8B] transition-colors group-hover:bg-[#087E8B] group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#087E8B]" />
      </div>

      <div className="mt-6">
        <p className="text-3xl font-black tracking-tight text-[#071A33]">
          {count.toLocaleString("en-IN")}
        </p>

        <h3 className="mt-1 text-base font-bold text-[#071A33]">
          {item.title}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-400">
          {item.description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#087E8B]">
        Manage
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}