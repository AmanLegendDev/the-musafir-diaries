"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/constants/admin-navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-4">

          <Image
            src="/logo.png"
            alt="Altitude Escapes"
            width={54}
            height={54}
            priority
          />

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Altitude Escapes
            </h2>

            <p className="text-sm text-slate-500">
              Admin Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        {adminNavigation.map((group) => (
          <div
            key={group.title}
            className="mb-8"
          >
            <h3 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              {group.title}
            </h3>

            <div className="space-y-1">

              {group.items.map((item) => {
                const Icon = item.icon;

                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200

                    ${
                      active
                        ? "bg-[#0F4C81] text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0F4C81]"
                    }`}
                  >
                    <Icon size={20} />

                    <span className="font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}

            </div>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-5">

        <div className="rounded-xl bg-slate-100 p-4">

          <p className="font-semibold text-slate-800">
            Administrator
          </p>

          <p className="mt-1 text-sm text-slate-500">
            admin@altitudeescapes.com
          </p>

        </div>

      </div>

    </aside>
  );
}