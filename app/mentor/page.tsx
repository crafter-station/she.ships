import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

export default function MentorPage() {
  return (
    <>
      <Nav />
      <main>
        <SectionWrapper variant="purple" className="min-h-[60vh] flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl uppercase mb-6">
              Be a <span className="text-secondary-light-pink">Mentor</span>
            </h1>
            <p className="text-2xl text-white/90 mb-10 font-medium">
              Share your expertise and guide builders through their 48-hour journey. Help turn ideas into shipped products.
            </p>
            <Button asChild variant="pink" size="lg">
              <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
                Apply as Mentor
              </a>
            </Button>
          </div>
        </SectionWrapper>

        <SectionWrapper variant="cream" bordered>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase mb-8">
              What Mentors Do
            </h2>

            <div className="space-y-6">
              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Guide & Support
                </h3>
                <p className="text-lg text-neutral-gray">
                  Provide technical guidance, answer questions, and help participants overcome blockers during the 48-hour hackathon.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Office Hours
                </h3>
                <p className="text-lg text-neutral-gray">
                  Host virtual office hours where participants can drop in for quick feedback, code reviews, or strategic advice.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Inspire
                </h3>
                <p className="text-lg text-neutral-gray">
                  Share your experience shipping products and inspire the next generation of women builders to launch their ideas.
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
