import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

export default function JudgePage() {
  return (
    <>
      <Nav />
      <main>
        <SectionWrapper variant="red" className="min-h-[60vh] flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl uppercase mb-6">
              Be a <span className="text-secondary-light-pink">Judge</span>
            </h1>
            <p className="text-2xl text-white/90 mb-10 font-medium">
              Evaluate shipped projects and help recognize the best builders. Be part of the final showcase on International Women's Day.
            </p>
            <Button asChild variant="default" size="lg">
              <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
                Apply as Judge
              </a>
            </Button>
          </div>
        </SectionWrapper>

        <SectionWrapper variant="cream" bordered>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase mb-8">
              What Judges Do
            </h2>

            <div className="space-y-6">
              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Review Projects
                </h3>
                <p className="text-lg text-neutral-gray">
                  Evaluate shipped projects based on creativity, execution, impact, and completion. Look for real outputs with public links.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Provide Feedback
                </h3>
                <p className="text-lg text-neutral-gray">
                  Give constructive feedback to participants during the final showcase. Help builders understand what made their project stand out.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Celebrate Builders
                </h3>
                <p className="text-lg text-neutral-gray">
                  Recognize and celebrate the best projects on March 8th. Help shine a spotlight on women who shipped something real.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
