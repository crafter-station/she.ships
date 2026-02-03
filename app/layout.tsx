import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";
import { shadcn } from "@clerk/themes";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  weight: ["400", "700"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <ClerkProvider
          localization={enUS}
          appearance={{
            baseTheme: shadcn,
            variables: {
              colorPrimary: "#E05A7A",
              colorTextOnPrimaryBackground: "#FFFFFF",
              colorBackground: "#F5F2ED",
              colorInputBackground: "#FFFFFF",
              colorInputText: "#171717",
              colorText: "#171717",
              colorTextSecondary: "#9B9688",
              borderRadius: "0px",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
