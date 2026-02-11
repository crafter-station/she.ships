"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, Cpu, Code2, Megaphone, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

const featureIcons = [Heart, Users, Eye, Cpu, Code2, Megaphone];

export function Features() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="beige" id="features">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block">{t.features.label}</span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t.features.headline}{" "}
          <span className="text-rose-coral">{t.features.headlineAccent}</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((feature, i) => {
          const Icon = featureIcons[i];
          return (
            <Card
              key={i}
              className="border-t-4 border-t-rose-coral border-x-warm-beige/50 border-b-warm-beige/50 bg-off-white shadow-sm"
            >
              <CardContent className="pt-6">
                <Icon className="mb-4 size-7 text-rose-coral" />
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  {feature.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
