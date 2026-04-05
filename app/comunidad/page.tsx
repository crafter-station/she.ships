import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { CommunityJoin } from "@/components/sections/community-join";

export const metadata = {
  title: "Comunidad | She Ships",
  description: "Únete a la comunidad de She Ships. 300+ mujeres builders en LATAM en Discord y WhatsApp.",
};

export default function ComunidadPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0 pt-16">
        <CommunityJoin />
        <Footer />
      </main>
    </>
  );
}
