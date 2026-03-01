"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

const partners = [
  { name: "Friends of Figma", logo: "/communities/fof.svg" },
  { name: "Indies", logo: "/communities/indies.png" },
  { name: "Inspiratech", logo: "/communities/inspiratech-logotipo.png" },
  { name: "Empremafia", logo: "/communities/EMPREMAFIA.png" },
  { name: "Notion Peru", logo: "/communities/notion-peru.png" },
  { name: "Comunidad Aliada", logo: "/communities/comunidad-aliada.png" },
];

export function CommunityPartners() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" bordered id="community-partners">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.communityPartners.label}
        </span>
      </div>

      <div
        className="relative grid grid-cols-3 place-items-center gap-0 max-w-3xl mx-auto"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="relative flex items-center justify-center w-full aspect-square border border-white/[0.06] p-10 md:p-12"
          >
            <div className="relative w-full h-full">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
