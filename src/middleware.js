import {
  authRoutes,
  publicRoutes,
  adminRoutes,
  cashierRoutes,
} from "@/lib/routes";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./services/cookies.service";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const middleware = async (req) => {
  const { nextUrl: url } = req;

  const token = await getCookie(AUTH_TOKEN_KEY, { req });

  let user;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      user = payload;
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);
  const isAdminRoute = adminRoutes.includes(url.pathname);
  const isCashierRoute = cashierRoutes.includes(url.pathname);

  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", url.origin));
  }

  const isSuperAdmin = user.role === "SUPERADMIN";
  const isAdmin = user.role === "ADMIN";
  const isCashier = user.role === "CASHIER";
  const isUser = user.role === "USER";

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
