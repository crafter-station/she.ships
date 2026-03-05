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
import { Organizers } from "@/components/sections/organizers";
import { CommunityPartners } from "@/components/sections/community-partners";
import { Footer } from "@/components/sections/footer";
import { SideNav } from "@/components/sections/side-nav";

export default function Home() {
  return (
    <>
      <Nav />
      <SideNav />
      <main className="overflow-x-clip min-w-0">
        <Hero />
        <Countdown />
        <Sponsors />
        <Perks />
        <Prizes />
        <WhatIsSheShips />
        <Agenda />
        <Categories />
        <FAQ />
        <WhatsappCommunity />
        <Organizers />
        <CommunityPartners />
        <Footer />
      </main>
    </>
  );
}
