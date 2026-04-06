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
            <svg viewBox="0 0 127.14 96.36" fill="white" className="w-8 h-8">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
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
