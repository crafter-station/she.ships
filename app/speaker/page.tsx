import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

export default function SpeakerPage() {
  return (
    <>
      <Nav />
      <main>
        <SectionWrapper variant="lightPink" className="min-h-[60vh] flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-primary-black md:text-7xl lg:text-8xl uppercase mb-6">
              Be a <span className="text-white">Speaker</span>
            </h1>
            <p className="text-2xl text-primary-black/90 mb-10 font-medium">
              Share your story and inspire 200+ women builders. Kick off the hackathon or lead a workshop during the 48-hour event.
            </p>
            <Button asChild variant="default" size="lg">
              <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
                Apply as Speaker
              </a>
            </Button>
          </div>
        </SectionWrapper>

        <SectionWrapper variant="cream" bordered>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase mb-8">
              Speaker Opportunities
            </h2>

            <div className="space-y-6">
              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Keynote Talk
                </h3>
                <p className="text-lg text-neutral-gray">
                  Deliver an inspiring keynote during the global kickoff on March 6th. Share your journey building and shipping products.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Workshop
                </h3>
                <p className="text-lg text-neutral-gray">
                  Lead a hands-on workshop on topics like AI tools, no-code platforms, design systems, or shipping strategies.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Panel Discussion
                </h3>
                <p className="text-lg text-neutral-gray">
                  Join a panel discussion on building in public, overcoming imposter syndrome, or the future of women in tech.
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
