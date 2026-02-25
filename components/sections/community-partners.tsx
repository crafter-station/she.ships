"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

const partners = [
  {
    name: "Inspiratech",
    logo: "/communities/inspiratech-logotipo.png",
    width: 200,
    height: 60,
  },
  {
    name: "Friends of Figma",
    logo: "/communities/fof.svg",
    width: 200,
    height: 60,
  },
  {
    name: "Indies",
    logo: "/communities/indies.png",
    width: 200,
    height: 60,
  },
];

export function CommunityPartners() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="cream" bordered id="community-partners">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.communityPartners.label}
        </span>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
        {partners.map((partner) => (
          <div key={partner.name} className="brutalist-card bg-white p-6 flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="h-auto w-auto max-w-[160px] md:max-w-[200px]"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
