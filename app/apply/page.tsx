import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { ApplyForm } from "@/components/sections/apply-form";

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <SectionWrapper
          variant="dark"
          className="min-h-[40vh] flex items-center"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-title text-5xl font-black tracking-tight text-primary-cream md:text-6xl lg:text-7xl uppercase mb-4">
              Social Media <span className="text-primary-pink">Contest</span>
            </h1>
            <p className="text-xl text-primary-cream/80 max-w-2xl mx-auto">
              Submit your social media post to the She Ships side-contest and
              compete for the best content award.
            </p>
          </div>
        </SectionWrapper>

        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
