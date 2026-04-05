import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Programs } from "@/components/sections/programs";
import { Workshops } from "@/components/sections/workshops";
import { PastEvents } from "@/components/sections/past-events";

export const metadata = {
  title: "Eventos | She Ships",
  description: "Hackathons, workshops y todos los programas de She Ships para mujeres builders en LATAM.",
};

export default function EventosPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <Programs />
        <Workshops />
        <PastEvents />
        <Footer />
      </main>
    </>
  );
}
