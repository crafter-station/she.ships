"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { Calendar, Wrench, Users, Rocket } from "lucide-react";

export function LandingAbout() {
  const { t } = useTranslation();

  const items = [
    {
      icon: Calendar,
      title: t.landing.aboutItem1Title,
      description: t.landing.aboutItem1Desc,
      color: "text-primary-pink",
      bgColor: "bg-primary-pink/10",
      borderColor: "border-primary-pink/30",
    },
    {
      icon: Wrench,
      title: t.landing.aboutItem2Title,
      description: t.landing.aboutItem2Desc,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
      borderColor: "border-primary-green/30",
    },
    {
      icon: Users,
      title: t.landing.aboutItem3Title,
      description: t.landing.aboutItem3Desc,
      color: "text-primary-cream",
      bgColor: "bg-primary-cream/10",
      borderColor: "border-primary-cream/30",
    },
    {
      icon: Rocket,
      title: t.landing.aboutItem4Title,
      description: t.landing.aboutItem4Desc,
      color: "text-primary-pink",
      bgColor: "bg-primary-pink/10",
      borderColor: "border-primary-pink/30",
    },
  ];

  return (
    <SectionWrapper variant="dark" id="about" className="min-h-fit">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-6">
          <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
            {t.landing.aboutLabel}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          {t.landing.aboutHeadline}{" "}
          <span className="text-primary-pink">{t.landing.aboutHeadlineAccent}</span>
        </h2>

        <p className="text-neutral-gray text-lg max-w-2xl mx-auto leading-relaxed">
          {t.landing.aboutDescription}
        </p>
      </div>

      {/* 4 Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-6 border ${item.borderColor} ${item.bgColor}`}
            >
              <div className={`w-12 h-12 flex items-center justify-center ${item.bgColor} border ${item.borderColor} mb-4`}>
                <Icon className={item.color} size={24} />
              </div>
              <h3 className={`font-[family-name:var(--font-title)] text-lg font-bold ${item.color} mb-2`}>
                {item.title}
              </h3>
              <p className="text-neutral-gray text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
