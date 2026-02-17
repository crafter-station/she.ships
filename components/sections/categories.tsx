"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, GraduationCap, Landmark, Palette, Globe, Wrench } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

const categoryIcons = [Heart, GraduationCap, Landmark, Palette, Globe, Wrench];

export function Categories() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" grid id="categories">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block text-warm-gray">
          {t.categories.label}
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {t.categories.headline}{" "}
          <span className="text-rose-coral">
            {t.categories.headlineAccent}
          </span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.categories.items.map((category, i) => {
          const Icon = categoryIcons[i];
          return (
            <Card
              key={i}
              className="border-grid-gray bg-grid-gray/50 text-white transition-colors hover:border-rose-coral/50"
            >
              <CardContent className="pt-6">
                <Icon className="mb-4 size-8 text-sunny-yellow" />
                <h3 className="mb-2 text-xl font-bold">{category.title}</h3>
                <p className="text-warm-gray leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
