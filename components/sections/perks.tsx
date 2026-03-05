"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Perks() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="perks" className="min-h-fit">
      <div className="mb-10">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.perks.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl uppercase">
          {t.perks.headline}{" "}
          <span className="text-primary-pink">{t.perks.headlineAccent}</span>
        </h2>
        <p className="mt-3 text-neutral-gray text-base">{t.perks.description}</p>
        <p className="mt-1 text-xs font-black text-primary-green font-mono uppercase tracking-widest">
          {t.perks.globalNote}
        </p>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border border-white/15">
        {t.perks.items.map((item, i) => {
          const inner = (
            <>
              <span className="data-label text-neutral-gray">{item.sponsor}</span>
              <p className="font-[family-name:var(--font-title)] text-xl font-bold text-primary-cream leading-tight">
                {item.perk}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.inPersonOnly && (
                  <span className="inline-block w-fit bg-primary-pink px-2 py-0.5 text-xs font-black uppercase tracking-wider text-primary-black">
                    {t.perks.inPerson}
                  </span>
                )}
                {item.inPersonLima && (
                  <span className="inline-block w-fit bg-primary-green px-2 py-0.5 text-xs font-black uppercase tracking-wider text-primary-black">
                    {t.perks.inPersonLima}
                  </span>
                )}
                {item.inPersonLimaBogota && (
                  <span className="inline-block w-fit bg-primary-green px-2 py-0.5 text-xs font-black uppercase tracking-wider text-primary-black">
                    {t.perks.inPersonLimaBogota}
                  </span>
                )}
              </div>
            </>
          );
          return item.url ? (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 p-6 flex flex-col gap-3 transition-colors hover:bg-white/5 cursor-pointer"
            >
              {inner}
            </a>
          ) : (
            <div key={i} className="border border-white/15 p-6 flex flex-col gap-3">
              {inner}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
