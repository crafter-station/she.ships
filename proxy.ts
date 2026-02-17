// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// Clerk middleware disabled
export default function middleware() {
  // No-op middleware
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
