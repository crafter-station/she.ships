import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SideQuestLanding } from "@/components/sections/side-quest-landing";
import { ApplyForm } from "@/components/sections/apply-form";

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <SideQuestLanding />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
