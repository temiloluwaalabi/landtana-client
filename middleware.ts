import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./app/actions/session.action";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ONBOARDING_REDIRECT,
  guestRoutes,
  sharedRoutes,
} from "./routes";

// Helper function to validate and sanitize callback URLs
const sanitizeCallbackUrl = (url: string, base: string) => {
  try {
    const parsed = new URL(url, base);
    // Only allow same-origin callback URLs
    return parsed.origin === base ? `${parsed.pathname}${parsed.search}` : "";
  } catch {
    return "";
  }
};

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin, search } = nextUrl;
  const session = await getSession();
  const isLoggedIn = session.isLoggedIn || false;
  const isOnboarded = session.is_boarded || false;

  console.log(session);

  // Helper function to check if a path starts with any guest or shared route
  const isAccessibleRoute = (pathname: string, routes: string[]) => {
    return routes.some((route) => pathname.startsWith(route));
  };
  const isAPiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  const isGuestRoute = guestRoutes.some(
    (route) => pathname.startsWith(route) // Check if the pathname starts with a guest route
  );

  const isSharedRoutes = isAccessibleRoute(pathname, sharedRoutes);

  const privateRoutes = !isGuestRoute && !isSharedRoutes;

  if (isAPiAuthRoute) return NextResponse.next();

  if (isLoggedIn && !isOnboarded && pathname !== DEFAULT_ONBOARDING_REDIRECT) {
    return NextResponse.redirect(new URL(DEFAULT_ONBOARDING_REDIRECT, nextUrl));
  }
  // Redirect if reset-password is accessed without a token
  if (pathname === "/reset-password" || pathname === "/confirm-email") {
    const url = new URL(req.url);
    if (!url.searchParams.has("token")) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }
  }
  if (isLoggedIn && isOnboarded && pathname === DEFAULT_ONBOARDING_REDIRECT) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (privateRoutes && !isLoggedIn) {
    const sanitizeCallback = sanitizeCallbackUrl(
      `${pathname}${search}`,
      origin
    );

    const callbackUrl = sanitizeCallback || DEFAULT_LOGIN_REDIRECT;

    const loginUrl = new URL("/sign-in", origin);

    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
