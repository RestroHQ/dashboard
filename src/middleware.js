import { authRoutes, publicRoutes } from "@/lib/routes";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./services/cookies.service";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const middleware = async (req) => {
  const { nextUrl: url } = req;

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next();
  }

  const token = await getCookie(AUTH_TOKEN_KEY, { req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", url.origin));
  }

  const { payload: user } = await jwtVerify(token, SECRET_KEY);

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", url.origin));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
