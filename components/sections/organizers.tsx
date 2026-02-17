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
      width: 250,
      height: 80,
    },
    {
      name: "Crafter Station",
      logo: "/crafter-logotipo.svg",
      width: 250,
      height: 80,
    },
  ];

  return (
    <SectionWrapper variant="dark" bordered id="organizers">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.organizers.label}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 lg:gap-24">
        {organizers.map((org) => (
          <div key={org.name}>
            <Image
              src={org.logo}
              alt={org.name}
              width={org.width}
              height={org.height}
              className="h-auto w-auto max-w-[200px] md:max-w-[250px]"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
