import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Rocket, Award } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Build",
    description:
      "Pick an idea, any idea. Use AI-native tools to go from concept to product without writing a single line of code.",
  },
  {
    icon: Rocket,
    step: "02",
    title: "Ship",
    description:
      "Launch publicly with the support of mentors and a community that celebrates your progress. Ship in public, learn in public.",
  },
  {
    icon: Award,
    step: "03",
    title: "Showcase",
    description:
      "Present your product to the community. Get feedback, recognition, and visibility. Your shipped product is your portfolio.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper variant="dark" grid id="how-it-works">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block text-warm-gray">
          The Process
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Three steps to <span className="text-rose-coral">ship.</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <Card
            key={step.step}
            className="relative overflow-hidden border-grid-gray bg-charcoal/80 text-white"
          >
            {/* Large faded step number */}
            <span
              aria-hidden
              className="absolute -right-2 -top-4 font-mono text-[120px] font-black leading-none text-white/[0.03]"
            >
              {step.step}
            </span>
            <CardContent className="relative pt-6">
              <step.icon className="mb-4 size-8 text-rose-coral" />
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-warm-gray leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
