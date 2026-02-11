"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";
import { esES } from "@clerk/localizations";
import { shadcn } from "@clerk/themes";
import { useTranslation } from "@/lib/i18n/context";

export function ClerkLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useTranslation();

  return (
    <ClerkProvider
      localization={locale === "es" ? esES : enUS}
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
  );
}
