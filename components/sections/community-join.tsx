"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function CommunityJoin() {
  const { t } = useTranslation();
  const c = t.org.community;

  return (
    <SectionWrapper variant="dark" id="community" className="min-h-fit">
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-4">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
            {c.memberCount}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase leading-tight text-white">
          {c.headline1} <span className="text-primary-green">{c.headline2}</span>
        </h2>
        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0 border-3 border-white/20 max-w-2xl mx-auto">
        {/* Discord */}
        <div className="border-3 border-white/20 p-8 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-[#5865F2] flex items-center justify-center brutalist-card">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.011.043.027.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-white mb-2">
              Discord
            </h3>
            <p className="text-white/50 text-sm">
              {c.discordDesc}
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white w-full">
            <a href="https://discord.gg/n6nNAqMu" target="_blank" rel="noopener noreferrer">
              {c.discordCta}
            </a>
          </Button>
        </div>

        {/* WhatsApp */}
        <div className="border-3 border-white/20 p-8 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-[#25D366] flex items-center justify-center brutalist-card">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-white mb-2">
              WhatsApp
            </h3>
            <p className="text-white/50 text-sm">
              {c.whatsappDesc}
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white w-full">
            <a href="https://chat.whatsapp.com/GTVHD19bsw7D7GGMgEieYQ" target="_blank" rel="noopener noreferrer">
              {c.whatsappCta}
            </a>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
