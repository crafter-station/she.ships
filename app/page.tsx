import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Countdown } from "@/components/sections/countdown";
import { WhatIsSheShips } from "@/components/sections/what-is-sheships";
import { Agenda } from "@/components/sections/agenda";
import { Categories } from "@/components/sections/categories";
import { FAQ } from "@/components/sections/faq";
import { Organizers } from "@/components/sections/organizers";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden min-w-0">
        <Hero />
        <Countdown />
        <WhatIsSheShips />
        <Agenda />
        <Categories />
        <FAQ />
        <Organizers />
      </main>
      <Footer />
    </>
  );
}
