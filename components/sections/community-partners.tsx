"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { track } from "@vercel/analytics";
import Image from "next/image";

const partners = [
  { name: "Friends of Figma", logo: "/communities/fof.svg", url: "https://friends.figma.com/lima/" },
  { name: "Indies", logo: "/communities/indies.png", url: "https://indies.la" },
  { name: "Inspiratech", logo: "/communities/inspiratech-logotipo.png", url: "https://www.instagram.com/inspiratech.la/" },
  { name: "Empremafia", logo: "/communities/EMPREMAFIA.png", url: "https://empremafia.com/" },
  { name: "Notion Peru", logo: "/communities/notion-peru.png", url: "https://notionperu.com" },
  { name: "Comunidad Aliada", logo: "/communities/comunidad-aliada.png", url: "https://www.the502project.com/" },
  { name: "Female Force", logo: "/sponsors/Female Force - Creme - Logo Padrão.png", url: "https://femaleforcelatam.com/" },
  { name: "Maker", logo: "/communities/maker.png", url: "https://maker.com/" },
];

export function CommunityPartners() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="community-partners" className="min-h-fit" innerClassName="pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.communityPartners.label}
        </span>
      </div>

      <div
        className="relative grid grid-cols-2 md:grid-cols-4 place-items-center gap-0 max-w-4xl mx-auto"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {partners.map((partner) => {
          const inner = (
            <div className="relative w-full h-full">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          );
          return partner.url ? (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("community_partner_click", { name: partner.name })}
              className="relative flex items-center justify-center w-full aspect-square border border-white/[0.06] p-6 md:p-8 transition-opacity hover:opacity-80"
            >
              {inner}
            </a>
          ) : (
            <div
              key={partner.name}
              className="relative flex items-center justify-center w-full aspect-square border border-white/[0.06] p-6 md:p-8"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
