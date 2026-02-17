"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  GraduationCap,
  Landmark,
  Palette,
  Globe,
  Wrench,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

const categoryIcons = [Heart, GraduationCap, Landmark, Palette, Globe, Wrench];
const categoryColors = [
  "bg-primary-pink",
  "bg-secondary-purple",
  "bg-secondary-red",
  "bg-secondary-light-pink",
  "bg-primary-pink",
  "bg-secondary-purple",
];

export function Categories() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="cream" bordered id="categories">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-black md:text-6xl lg:text-7xl uppercase">
          {t.categories.headline}{" "}
          <span className="text-primary-pink">
            {t.categories.headlineAccent}
          </span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.categories.items.map((category, i) => {
          const Icon = categoryIcons[i];
          const colorClass = categoryColors[i];
          return (
            <Card
              key={i}
              className="bg-white hover:translate-x-1 hover:translate-y-1"
            >
              <CardContent className="pt-6">
                <div className={`inline-flex ${colorClass} p-3 mb-4`}>
                  <Icon className="size-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-title)] text-2xl font-black uppercase">
                  {category.title}
                </h3>
                <p className="text-neutral-gray font-medium leading-relaxed">
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
