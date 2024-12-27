import { authRoutes, defaultRedirect, publicRoutes } from "@/lib/routes";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./lib/auth";

async function middleware(req) {
  const res = NextResponse.next();

  const { nextUrl: url } = req;
  const token = await getCookie(AUTH_TOKEN_KEY, { res, req });

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (isPublicRoute) {
    return res;
  }

  if (isAuthRoute) {
    if (!token) {
      return res;
    }

    return Response.redirect(new URL(defaultRedirect, url));
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
