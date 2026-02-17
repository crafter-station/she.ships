import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

export default function SponsorPage() {
  return (
    <>
      <Nav />
      <main>
        <SectionWrapper variant="pink" className="min-h-[60vh] flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-primary-black md:text-7xl lg:text-8xl uppercase mb-6">
              Be a <span className="text-white">Sponsor</span>
            </h1>
            <p className="text-2xl text-primary-black/90 mb-10 font-medium">
              Support women builders and help make She Ships possible. Partner with us to empower the next generation of creators.
            </p>
            <Button asChild variant="default" size="lg">
              <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
                Apply as Sponsor
              </a>
            </Button>
          </div>
        </SectionWrapper>

        <SectionWrapper variant="cream" bordered>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase mb-8">
              Why Sponsor She Ships?
            </h2>

            <div className="space-y-6">
              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Visibility
                </h3>
                <p className="text-lg text-neutral-gray">
                  Your brand will be featured across all event materials, social media, and the showcase event reaching 200+ participants and thousands online.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Impact
                </h3>
                <p className="text-lg text-neutral-gray">
                  Directly support women in tech by providing resources, tools, and opportunities for builders to ship their projects.
                </p>
              </div>

              <div className="brutalist-card bg-white p-8">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase mb-4">
                  Community
                </h3>
                <p className="text-lg text-neutral-gray">
                  Connect with a global community of talented developers, designers, and creators who are passionate about building and shipping.
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
