"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { Globe, Clock, UsersRound } from "lucide-react";

const icons = [Globe, Clock, UsersRound];
const colors = ["bg-secondary-purple", "bg-primary-pink", "bg-secondary-red"];

export function EventInfo() {
  const { t } = useTranslation();

  const items = [
    { icon: icons[0], color: colors[0], ...t.eventInfo.where },
    { icon: icons[1], color: colors[1], ...t.eventInfo.duration },
    { icon: icons[2], color: colors[2], ...t.eventInfo.who },
  ];

  return (
    <SectionWrapper variant="lightPink" bordered id="event-info">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-black md:text-6xl lg:text-7xl uppercase">
          {t.eventInfo.headline}{" "}
          <span className="text-white">{t.eventInfo.headlineAccent}</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="brutalist-card bg-white p-8">
              <div className={`inline-flex ${item.color} p-4 mb-6`}>
                <Icon className="size-10 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-title)] text-3xl font-black text-primary-black uppercase">
                {item.title}
              </h3>
              <p className="text-neutral-gray text-lg font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
