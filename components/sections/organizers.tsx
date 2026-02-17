"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

export function Organizers() {
  const { t } = useTranslation();

  const organizers = [
    {
      name: "Inspiratech",
      logo: "/inspiratech-logotipo.png",
      width: 200,
      height: 60,
    },
    {
      name: "Crafter Station",
      logo: "/crafter-logotipo.svg",
      width: 200,
      height: 60,
    },
  ];

  return (
    <SectionWrapper variant="light" bordered id="organizers">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.organizers.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-4xl font-black tracking-tight text-primary-black md:text-5xl lg:text-6xl uppercase">
          {t.organizers.headline}{" "}
          <span className="text-primary-pink">{t.organizers.headlineAccent}</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
        {organizers.map((org) => (
          <div
            key={org.name}
            className="brutalist-card bg-white p-8 hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <Image
              src={org.logo}
              alt={org.name}
              width={org.width}
              height={org.height}
              className="h-auto w-auto max-w-[200px]"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
