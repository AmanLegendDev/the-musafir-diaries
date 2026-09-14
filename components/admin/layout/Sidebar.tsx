"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  X,
  LayoutDashboard,
  Map,
  Package,
  Hotel,
  Tags,
  FileText,
  HelpCircle,
  MessageSquareQuote,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const adminNavigation = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: ClipboardList,
      },
      {
        label: "Bookings",
        href: "/admin/bookings",
        icon: CalendarCheck,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Destinations",
        href: "/admin/destinations",
        icon: Map,
      },
      {
        label: "Packages",
        href: "/admin/packages",
        icon: Package,
      },
      {
        label: "Hotels",
        href: "/admin/hotels",
        icon: Hotel,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: Tags,
      },
      {
        label: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        icon: HelpCircle,
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquareQuote,
      },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ============================================================ */}
      {/* MOBILE OVERLAY                                               */}
      {/* ============================================================ */}

      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-[#071A33]/50
          backdrop-blur-[2px]
          transition-opacity duration-300
          lg:hidden
          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* ============================================================ */}
      {/* SIDEBAR                                                       */}
      {/* ============================================================ */}

      <aside
        id="admin-sidebar"
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[290px] flex-col
          border-r border-slate-200
          bg-white
          shadow-2xl shadow-slate-900/10
          transition-transform duration-300 ease-out

          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-30
          lg:h-screen
          lg:w-72
          lg:translate-x-0
          lg:shadow-none

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ======================================================== */}
        {/* BRAND HEADER                                               */}
        {/* ======================================================== */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="group flex min-w-0 items-center gap-3"
            aria-label="Go to admin dashboard"
          >
            {/* Logo */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center">
              <Image
                src="/logo.png"
                alt="The Musafir Diaries"
                width={50}
                height={50}
                priority
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Brand */}
            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-bold tracking-tight text-[#071A33]">
                The Musafir Diaries
              </h2>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-500
              transition-all duration-200
              hover:bg-slate-100
              hover:text-[#071A33]
              active:scale-95
              lg:hidden
            "
          >
            <X
              size={20}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* ======================================================== */}
        {/* NAVIGATION                                                 */}
        {/* ======================================================== */}

        <nav
          aria-label="Admin navigation"
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          {adminNavigation.map((group) => (
            <div
              key={group.title}
              className="mb-8 last:mb-2"
            >
              {/* Group Title */}
              <h3 className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                {group.title}
              </h3>

              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={
                        active ? "page" : undefined
                      }
                      className={`
                        group flex items-center gap-3
                        rounded-xl
                        px-3 py-2.5
                        text-sm font-medium
                        transition-all duration-200

                        ${
                          active
                            ? "bg-[#071A33] text-white shadow-md shadow-[#071A33]/15"
                            : "text-slate-600 hover:bg-slate-100 hover:text-[#071A33]"
                        }
                      `}
                    >
                      {/* Icon */}
                      <span
                        className={`
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-lg
                          transition-all duration-200

                          ${
                            active
                              ? "bg-white/10 text-white"
                              : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-[#087E8B]"
                          }
                        `}
                      >
                        <Icon
                          size={18}
                          strokeWidth={2}
                        />
                      </span>

                      {/* Label */}
                      <span className="truncate">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ======================================================== */}
        {/* ADMIN PROFILE                                               */}
        {/* ======================================================== */}

        <div className="shrink-0 border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            {/* Avatar */}
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                bg-[#071A33]
                text-sm font-bold
                text-white
              "
            >
              A
            </div>

            {/* Details */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Administrator
              </p>

              <p className="truncate text-xs text-slate-500">
                The Musafir Diaries
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}