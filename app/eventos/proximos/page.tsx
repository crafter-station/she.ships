import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { LandingUpcomingEvents } from "@/components/sections/landing-upcoming-events";

export const metadata = {
  title: "Próximos Eventos | She Ships",
  description: "Workshops, hackathons y eventos próximos de She Ships para mujeres builders en LATAM.",
};

export default function ProximosEventosPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <LandingUpcomingEvents />
        <Footer />
      </main>
    </>
  );
}
