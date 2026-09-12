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
<header className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:left-72">      {/* ═══════════════════════════════════════
          LEFT
      ═══════════════════════════════════════ */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open admin sidebar"
          aria-controls="admin-sidebar"
          className="
            flex h-11 w-11 shrink-0
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
          "
        >
          <Menu
            size={21}
            strokeWidth={2}
          />
        </button>

        {/* Mobile Logo */}
        <Link
          href="/admin"
          className="flex min-w-0 items-center gap-2.5 lg:hidden"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071A33] p-1.5">
            <Image
              src="/logo.png"
              alt="The Musafir Diaries"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-bold leading-tight text-[#071A33]">
              The Musafir Diaries
            </p>

            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Admin
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

      {/* ═══════════════════════════════════════
          RIGHT
      ═══════════════════════════════════════ */}

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

          {/* Notification Dot */}
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#F06A5B]" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Admin */}
        <div className="flex items-center gap-2.5">
          {/* Name */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-slate-800">
              Administrator
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Admin
            </p>
          </div>

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071A33] text-sm font-bold text-white shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}