import { NextRequest, NextResponse } from "next/server";
import {
  hasValidMentorBadgeSession,
  MENTOR_BADGE_SESSION_COOKIE,
} from "@/lib/auth/mentor-badge-session";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMentorRoot = pathname === "/m" || pathname === "/m/";
  const isProtectedMentorPath = pathname.startsWith("/m/") && !isMentorRoot;

  if (!isProtectedMentorPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
  const authenticated = await hasValidMentorBadgeSession(token);

  if (authenticated) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/m";
  redirectUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
