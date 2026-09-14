import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";

const COOKIE_NAME = "altitude_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  const isLoginPage = pathname === "/login";

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  const session = await verifyToken(token);

  if (!session || session.role !== "admin") {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};