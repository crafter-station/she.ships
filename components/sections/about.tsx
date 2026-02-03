import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { CrafterStationLogo } from "@/components/logos/crafter-station";

export function About() {
  return (
    <SectionWrapper variant="beige" id="about">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* Mission text */}
        <div>
          <span className="data-label mb-4 block">About the Movement</span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            We believe every woman has a product{" "}
            <span className="text-rose-coral">ready to ship.</span>
          </h2>
          <p className="text-lg leading-relaxed text-charcoal/80">
            She Ships is a{" "}
            <a
              href="https://www.crafterstation.com"
              className="inline-flex items-center gap-1 font-medium text-charcoal hover:text-rose-coral transition-colors"
            >
              <CrafterStationLogo className="size-4 inline" />
              Crafter Station
            </a>{" "}
            initiative that gives women the tools, mentorship, and stage to go
            from idea to launched product. No gatekeeping. No prerequisites.
            Just builders building.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            Whether you&apos;re a first-time founder, a designer who codes, or
            someone who&apos;s never touched a terminal, this is your place.
          </p>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-rose-coral pl-8">
          <blockquote className="font-script text-2xl leading-relaxed text-charcoal/90 md:text-3xl">
            &ldquo;Women don&apos;t just build the future. They ship it.&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-warm-gray">
            She Ships Manifesto
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
