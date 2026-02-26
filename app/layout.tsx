import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/space-grotesk";
import "@fontsource/space-mono";
import { LanguageProvider } from "@/lib/i18n/context";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { QueryProvider } from "@/components/providers/query-provider";
// import { ClerkLanguageProvider } from "@/components/providers/clerk-language-provider";
import "./globals.css";

const monoblock = localFont({
  src: [
    { path: "../public/brand/Monoblock-Thin.otf", weight: "100", style: "normal" },
    { path: "../public/brand/Monoblock-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../public/brand/Monoblock-Light.otf", weight: "300", style: "normal" },
    { path: "../public/brand/Monoblock-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/brand/Monoblock-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/brand/Monoblock-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/brand/Monoblock-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/brand/Monoblock-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../public/brand/Monoblock-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-monoblock",
  display: "swap",
});

export const metadata: Metadata = {
  title: "She Ships | Where Women Build and Ship",
  description:
    "Join women builders shipping real products with AI-native tools. Mentorship, community, and visibility. No code required.",
  metadataBase: new URL("https://www.sheships.org"),
  openGraph: {
    title: "She Ships | Where Women Build and Ship",
    description:
      "Join women builders shipping real products with AI-native tools.",
    type: "website",
    url: "https://www.sheships.org",
    images: [
      { url: "https://www.sheships.org/og.png", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.sheships.org/og-twitter.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={monoblock.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;window.addEventListener("scroll",function(){document.documentElement.classList.add("is-scrolling");clearTimeout(t);t=setTimeout(function(){document.documentElement.classList.remove("is-scrolling")},1000)},{passive:true})})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <LanguageProvider>
            <QueryProvider>
              {/* <ClerkLanguageProvider>{children}</ClerkLanguageProvider> */}
              {children}
            </QueryProvider>
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
