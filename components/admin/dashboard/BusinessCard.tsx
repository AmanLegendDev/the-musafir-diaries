import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

type CardType = "inquiries" | "bookings";

interface BusinessCardProps {
  type: CardType;
  total: number;
  statuses: Array<{
    label: string;
    value: number;
    tone:
      | "amber"
      | "sky"
      | "violet"
      | "emerald"
      | "red";
  }>;
}

const config = {
  inquiries: {
    href: "/admin/inquiries",
    eyebrow: "Customer enquiries",
    title: "Inquiries",
    description:
      "Track new trip enquiries and move conversations toward confirmation.",
    icon: FileText,
    accent: "#087E8B",
  },
  bookings: {
    href: "/admin/bookings",
    eyebrow: "Travel reservations",
    title: "Bookings",
    description:
      "Manage confirmed journeys, upcoming travel and booking progress.",
    icon: BriefcaseBusiness,
    accent: "#1597C7",
  },
} satisfies Record<
  CardType,
  {
    href: string;
    eyebrow: string;
    title: string;
    description: string;
    icon: typeof FileText;
    accent: string;
  }
>;

const toneClasses = {
  amber: {
    dot: "bg-amber-500",
    text: "text-amber-700",
    bg: "bg-amber-50",
  },
  sky: {
    dot: "bg-sky-500",
    text: "text-sky-700",
    bg: "bg-sky-50",
  },
  violet: {
    dot: "bg-violet-500",
    text: "text-violet-700",
    bg: "bg-violet-50",
  },
  emerald: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  red: {
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
  },
} as const;

export default function BusinessCard({
  type,
  total,
  statuses,
}: BusinessCardProps) {
  const item = config[type];
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative block overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_65px_rgba(15,23,42,0.10)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          backgroundColor: item.accent,
        }}
      />

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              <span>{item.eyebrow}</span>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#071A33]">
              {item.title}
            </h2>
          </div>

          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor:
                type === "inquiries"
                  ? "#087E8B12"
                  : "#1597C712",
              color: item.accent,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
          {item.description}
        </p>

        <div className="mt-7 flex items-end justify-between border-t border-slate-100 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Total
            </p>

            <p className="mt-1 text-4xl font-black tracking-tight text-[#071A33]">
              {total.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#071A33]">
            Manage
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {statuses.map((status) => {
            const tone = toneClasses[status.tone];

            return (
              <div
                key={status.label}
                className={`${tone.bg} rounded-2xl px-3 py-3`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                  />
                  <span
                    className={`truncate text-[11px] font-bold ${tone.text}`}
                  >
                    {status.label}
                  </span>
                </div>

                <p
                  className={`mt-1.5 text-xl font-extrabold ${tone.text}`}
                >
                  {status.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}