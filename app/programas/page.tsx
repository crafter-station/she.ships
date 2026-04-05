import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Programs } from "@/components/sections/programs";

export const metadata = {
  title: "Programas | She Ships",
  description: "Hackathons, workshops, mentorías y más. Conoce todos los programas de She Ships para mujeres builders en LATAM.",
};

export default function ProgramasPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <Programs />
        <Footer />
      </main>
    </>
  );
}
