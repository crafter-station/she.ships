import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Workshops } from "@/components/sections/workshops";

export const metadata = {
  title: "Workshops | She Ships",
  description: "Workshops prácticos para aprender a construir con herramientas de IA. Gratis y pagos. She Ships.",
};

export default function WorkshopsPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <Workshops />
        <Footer />
      </main>
    </>
  );
}
