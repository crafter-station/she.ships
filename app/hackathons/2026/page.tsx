import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Countdown } from "@/components/sections/countdown";
import { Sponsors } from "@/components/sections/sponsors";
import { WhatIsSheShips } from "@/components/sections/what-is-sheships";
import { Agenda } from "@/components/sections/agenda";
import { Categories } from "@/components/sections/categories";
import { FAQ } from "@/components/sections/faq";
import { Perks } from "@/components/sections/perks";
import { Prizes } from "@/components/sections/prizes";
import { WhatsappCommunity } from "@/components/sections/whatsapp-community";
import { CommunityPartners } from "@/components/sections/community-partners";
import { Footer } from "@/components/sections/footer";
import { SideNav } from "@/components/sections/side-nav";

export const metadata: Metadata = {
  title: "8M Hackathon 2026 | 48-Hour Global Hackathon for Women",
  description:
    "Join the She Ships 8M Hackathon 2026, a 48-hour global hackathon celebrating International Women's Day. Build real solutions for women with AI tools, win $1,500+ in prizes, and connect with 200+ participants worldwide. March 6-8, 2026.",
  keywords: [
    "8M hackathon",
    "International Women's Day hackathon",
    "women hackathon 2026",
    "global hackathon",
    "48 hour hackathon",
    "women in tech event",
    "AI hackathon",
    "remote hackathon",
    "women developers",
    "March 8 hackathon",
  ],
  openGraph: {
    title: "8M Hackathon 2026 | 48-Hour Global Hackathon for Women",
    description:
      "48-hour global hackathon celebrating International Women's Day. Build real solutions, win prizes, and ship with 200+ women worldwide. March 6-8, 2026.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "She Ships 8M Hackathon 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "8M Hackathon 2026 | She Ships",
    description:
      "48-hour global hackathon for International Women's Day. March 6-8, 2026. Build, ship, and win with 200+ women worldwide.",
  },
};

export default function Hackathon2026Page() {
  return (
    <>
      <Nav />
      <SideNav />
      <main className="overflow-x-clip min-w-0">
        <Hero />
        <Sponsors />
        <Countdown />
        <WhatIsSheShips />
        <Perks />
        <Prizes />
        <Agenda />
        <Categories />
        <FAQ />
        <WhatsappCommunity />
        <CommunityPartners />
        <Footer />
      </main>
    </>
  );
}
