"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bell,
  ExternalLink,
  Menu,
} from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
    <header
      className="
        fixed left-0 right-0 top-0 z-40
        flex h-20 items-center justify-between
        border-b border-slate-200
        bg-white/95 px-4
        backdrop-blur-md
        sm:px-6
        lg:left-72 lg:px-8
      "
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center">
        {/* Mobile / Tablet Brand */}
        <Link
          href="/admin/dashboard"
          className="flex min-w-0 items-center gap-3 lg:hidden"
          aria-label="Go to admin dashboard"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
            <Image
              src="/logo.png"
              alt="The Musafir Diaries"
              width={48}
              height={48}
              priority
              className="h-11 w-11 object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-[#071A33] sm:text-[15px]">
              The Musafir Diaries
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
              Admin Panel
            </p>
          </div>
        </Link>

        {/* Desktop Page Heading */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold tracking-tight text-[#071A33]">
            Dashboard
          </h1>

          <p className="mt-0.5 text-sm text-slate-500">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* View Website */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden h-10 items-center gap-2
            rounded-xl
            border border-slate-200
            px-3.5
            text-sm font-medium
            text-slate-600
            transition-all duration-200
            hover:border-[#087E8B]/30
            hover:bg-slate-50
            hover:text-[#087E8B]
            sm:flex
          "
        >
          <span>View Website</span>

          <ExternalLink
            size={15}
            strokeWidth={2}
          />
        </Link>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            text-slate-500
            transition-all duration-200
            hover:bg-slate-50
            hover:text-[#071A33]
            active:scale-95
          "
        >
          <Bell
            size={18}
            strokeWidth={2}
          />

          <span
            aria-hidden="true"
            className="
              absolute right-2.5 top-2.5
              h-1.5 w-1.5 rounded-full
              bg-[#F06A5B]
            "
          />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Admin / Mobile Menu */}
        <div className="flex items-center gap-2.5">
          {/* Admin Name */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-slate-800">
              Administrator
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Admin
            </p>
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open admin sidebar"
            aria-controls="admin-sidebar"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-[#071A33]
              shadow-sm
              transition-all duration-200
              hover:border-slate-300
              hover:bg-slate-50
              active:scale-95
              lg:hidden
              sm:h-11 sm:w-11
            "
          >
            <Menu
              size={21}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </header>
  );
}