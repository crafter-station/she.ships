import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Waitlist } from "@clerk/nextjs";

export function CTA() {
  return (
    <SectionWrapper variant="beige" id="cta">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-script text-xl text-rose-coral md:text-2xl">
          March 8, 2026
        </p>
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Ready to <span className="text-rose-coral">ship?</span>
        </h2>
        <p className="mb-10 text-lg text-charcoal/70">
          Sign up and secure your spot at the event. No spam, just energy to
          build.
        </p>

        <div className="mx-auto max-w-md">
          <Waitlist />
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-warm-gray">
          Be among the first to join
        </p>
      </div>
    </SectionWrapper>
  );
}
