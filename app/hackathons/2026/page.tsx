import { Nav } from "@/components/sections/nav";
import { Sponsors } from "@/components/sections/sponsors";
import { Perks } from "@/components/sections/perks";
import { Footer } from "@/components/sections/footer";

export default function Hackathon2026Page() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <Sponsors />
        <Perks />
      </main>
      <Footer />
    </>
  );
}
