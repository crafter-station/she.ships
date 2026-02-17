"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { Globe, Clock, UsersRound } from "lucide-react";

const icons = [Globe, Clock, UsersRound];

export function EventInfo() {
  const { t } = useTranslation();

  const items = [
    { icon: icons[0], ...t.eventInfo.where },
    { icon: icons[1], ...t.eventInfo.duration },
    { icon: icons[2], ...t.eventInfo.who },
  ];

  return (
    <SectionWrapper variant="beige" id="event-info">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block">{t.eventInfo.label}</span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t.eventInfo.headline}{" "}
          <span className="text-rose-coral">{t.eventInfo.headlineAccent}</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="border-t-4 border-t-charcoal bg-off-white p-8">
              <Icon className="mb-4 size-10 text-rose-coral" />
              <h3 className="mb-3 text-2xl font-bold text-charcoal">
                {item.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
