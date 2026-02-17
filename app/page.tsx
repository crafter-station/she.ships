import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Countdown } from "@/components/sections/countdown";
import { EventInfo } from "@/components/sections/event-info";
import { Agenda } from "@/components/sections/agenda";
import { Categories } from "@/components/sections/categories";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Countdown />
        <EventInfo />
        <Agenda />
        <Categories />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
