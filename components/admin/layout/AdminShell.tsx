"use client";

import { ReactNode, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function AdminShell({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // Close mobile sidebar with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // Prevent page scrolling while mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Fixed Admin Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
     <main className="min-h-[calc(100vh-5rem)] pt-20">
  <section className="p-4 sm:p-6 lg:p-8">
    {children}
  </section>
</main>
      </div>
    </div>
  );
}