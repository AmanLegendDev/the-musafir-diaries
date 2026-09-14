"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

interface Props {
  children: ReactNode;
}

export default function PublicChrome({
  children,
}: Props) {
  const pathname = usePathname();

 const isAdminRoute =
  pathname === "/admin" ||
  pathname.startsWith("/admin/");

const isAuthRoute = pathname === "/login";

if (isAdminRoute || isAuthRoute) {
  return <>{children}</>;
}

  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}