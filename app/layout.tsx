import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/space-grotesk";
import "@fontsource/space-mono";
import { LanguageProvider } from "@/lib/i18n/context";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Analytics } from "@vercel/analytics/react";
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

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "She Ships | Women's Tech Hub - Events, Tools & Community",
    template: "%s | She Ships",
  },
  description:
    "She Ships is a women's tech hub organizing hackathons, workshops, and events. Access cutting-edge tools, mentorship, and join a community of women building and leading in technology.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "women in tech",
    "women hackathon",
    "tech events for women",
    "women developers",
    "women engineers",
    "tech community",
    "hackathon",
    "women founders",
    "diversity in tech",
    "women coding",
    "tech workshops",
    "STEM women",
    "female developers",
    "women builders",
  ],
  authors: [{ name: "She Ships" }],
  creator: "She Ships",
  publisher: "She Ships",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: siteUrl,
    siteName: "She Ships",
    title: "She Ships | Women's Tech Hub - Events, Tools & Community",
    description:
      "Join She Ships, a women's tech hub with hackathons, workshops, and a global community. Access sponsor tools, mentorship, and real opportunities in tech.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "She Ships - Women's Tech Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "She Ships | Women's Tech Hub",
    description:
      "Hackathons, workshops, tools & community for women in tech. Join us and ship something real.",
    images: ["/og-twitter.png"],
    creator: "@sheships",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
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
              <Analytics />
            </QueryProvider>
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
