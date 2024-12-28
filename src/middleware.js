import {
  authRoutes,
  publicRoutes,
  adminRoutes,
  cashierRoutes,
} from "@/lib/routes";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./lib/auth";

const middleware = async (req) => {
  const { nextUrl: url } = req;

  const token = await getCookie(AUTH_TOKEN_KEY, { req });
  const userCookie = await getCookie("user", { req });
  const user = userCookie ? JSON.parse(userCookie) : null;

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);
  const isAdminRoute = adminRoutes.includes(url.pathname);
  const isCashierRoute = cashierRoutes.includes(url.pathname);

  const isLoggedIn = Boolean(token && user);
  const isUser = user?.role === "USER";
  const isSuperAdmin = user?.role === "SUPERADMIN";
  const isAdmin = user?.role === "ADMIN";
  const isCashier = user?.role === "CASHIER";

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", url.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", url.origin));
  }

  if (isUser) {
    return NextResponse.redirect(new URL(`/auth/error?error=403`, url.origin));
  }

  if (isSuperAdmin) {
    return NextResponse.next();
  }

  if (isAdmin) {
    if (isAdminRoute || isCashierRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/auth/error?error=403`, url.origin));
  }

  if (isCashier) {
    if (isCashierRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/auth/error?error=403`, url.origin));
  }

  return NextResponse.redirect(new URL(`/auth/error?error=403`, url.origin));
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
