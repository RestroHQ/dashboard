import { authRoutes, publicRoutes, superAdminRoutes } from "@/lib/routes";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./lib/auth";

async function middleware(req) {
  const res = NextResponse.next();

  const { nextUrl: url } = req;

  const token = await getCookie(AUTH_TOKEN_KEY, { res, req });
  const user = await getCookie("user", { res, req });

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);
  const isSuperAdminRoute = superAdminRoutes.includes(url.pathname);

  if (isPublicRoute) {
    return res;
  }

  if (isAuthRoute) {
    if (!token) {
      return res;
    }

    return Response.redirect(new URL("/", url));
  }

  const hasAccess = user.role !== "USER";

  if (!hasAccess) {
    return Response.redirect(new URL("/unauthorized", url));
  }

  if (isSuperAdminRoute) {
    if (!token || user.role !== "SUPERADMIN") {
      return Response.redirect(new URL("/unauthorized", url));
    }

    return res;
  }

  if (!token) {
    return Response.redirect(new URL("/auth/login", url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
