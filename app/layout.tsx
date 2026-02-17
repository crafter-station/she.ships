import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/context";
// import { ClerkLanguageProvider } from "@/components/providers/clerk-language-provider";
import "./globals.css";

// Using Inter as Satoshi substitute (similar rounded, friendly sans-serif)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "She Ships | Where Women Build and Ship",
  description:
    "Join women builders shipping real products with AI-native tools. Mentorship, community, and visibility. No code required.",
  metadataBase: new URL("https://she-ships.crafter.run"),
  openGraph: {
    title: "She Ships | Where Women Build and Ship",
    description:
      "Join women builders shipping real products with AI-native tools.",
    type: "website",
    url: "https://she-ships.crafter.run",
    images: [
      { url: "https://she-ships.crafter.run/og.png", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://she-ships.crafter.run/og-twitter.png"],
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          {/* <ClerkLanguageProvider>{children}</ClerkLanguageProvider> */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
