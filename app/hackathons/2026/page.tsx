import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Sponsors } from "@/components/sections/sponsors";
import { Perks } from "@/components/sections/perks";
import { Footer } from "@/components/sections/footer";

export default function Hackathon2026Page() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0">
        <Hero />
        <Sponsors />
        <Perks />
      </main>
      <Footer />
    </>
  );
}
