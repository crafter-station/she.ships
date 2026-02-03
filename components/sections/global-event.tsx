import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Globe } from "@/components/ui/globe";

export function GlobalEvent() {
  return (
    <SectionWrapper variant="dark" grid>
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <div>
          <span className="data-label mb-4 block text-warm-gray">
            March 8 · Global Online Event
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            From anywhere.{" "}
            <span className="text-rose-coral">For everyone.</span>
          </h2>
          <p className="text-lg leading-relaxed text-warm-gray">
            She Ships is a 100% online event on March 8, International
            Women&apos;s Day. No matter where you are, if you have an idea and
            the drive to build, this is your space. Builders from Latin America
            and around the world, connected to ship together.
          </p>
        </div>

        {/* Globe */}
        <div className="relative mx-auto h-[350px] w-full max-w-[350px] md:h-[400px] md:max-w-[400px]">
          <Globe className="top-0" />
        </div>
      </div>
    </SectionWrapper>
  );
}
