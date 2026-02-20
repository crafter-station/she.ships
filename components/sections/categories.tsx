"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Categories() {
  const { t } = useTranslation();

  const categoryColors = [
    "bg-[#5B9A8B]", // teal
    "bg-[#E76F51]", // coral/red
    "bg-[#5B9A8B]", // teal
    "bg-[#F4E04D]", // yellow
    "bg-[#A8BCEE]", // light blue
    "bg-[#E76F51]", // coral/red
  ];

  const categoryTags = [
    ["web app", "mobile", "saas"],
    ["chatbot", "automation", "ml"],
    ["comic", "art", "zine"],
    ["figma", "prototype", "ui"],
    ["course", "tutorial", "tool"],
    ["library", "api", "framework"],
  ];

  return (
    <SectionWrapper variant="cream" id="categories" className="!bg-[#FAF9F6]">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-4xl font-black tracking-tight text-primary-black md:text-5xl lg:text-6xl mb-4">
          {t.categories.sectionHeadline}
        </h2>
        <p className="text-xl text-primary-black/70">
          {t.categories.sectionSubline}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {t.categories.items.map((category, i) => {
          const bgColor = categoryColors[i];
          const tags = categoryTags[i];
          return (
            <div
              key={i}
              className={`${bgColor} p-8 border-4 border-primary-black transition-transform hover:translate-x-1 hover:translate-y-1`}
            >
              <h3 className="font-[family-name:var(--font-title)] text-3xl font-bold text-primary-black mb-3">
                {category.title}
              </h3>
              <p className="text-primary-black/80 text-base mb-6 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-primary-black/60 uppercase tracking-wide">
                  {t.categories.popularTags}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-white border-2 border-primary-black px-3 py-1 text-sm font-medium text-primary-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
