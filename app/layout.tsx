import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
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
  title: "She Ships | Donde las Mujeres Construyen y Hacen Ship",
  description:
    "Únete a mujeres builders que hacen ship de productos reales con herramientas AI-native. Mentoría, comunidad y visibilidad. Sin código.",
  openGraph: {
    title: "She Ships | Donde las Mujeres Construyen y Hacen Ship",
    description:
      "Únete a mujeres builders que hacen ship de productos reales con herramientas AI-native.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <ClerkProvider
          localization={esES}
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
