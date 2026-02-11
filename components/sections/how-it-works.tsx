"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Rocket, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

const stepIcons = [Lightbulb, Rocket, Award];
const stepNumbers = ["01", "02", "03"];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" grid id="how-it-works">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block text-warm-gray">
          {t.howItWorks.label}
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {t.howItWorks.headline}{" "}
          <span className="text-rose-coral">{t.howItWorks.headlineAccent}</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {t.howItWorks.steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <Card
              key={stepNumbers[i]}
              className="relative overflow-hidden border-grid-gray bg-charcoal/80 text-white"
            >
              {/* Large faded step number */}
              <span
                aria-hidden
                className="absolute -right-2 -top-4 font-mono text-[120px] font-black leading-none text-white/[0.03]"
              >
                {stepNumbers[i]}
              </span>
              <CardContent className="relative pt-6">
                <Icon className="mb-4 size-8 text-rose-coral" />
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-warm-gray leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
