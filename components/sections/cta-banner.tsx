"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function CtaBanner({ label }: { label?: string }) {
  const { t } = useTranslation();
  return (
    <div className="bg-primary-black py-14 flex flex-col items-center gap-4 border-t-2 border-primary-pink/30">
      <Button asChild variant="pink" size="lg">
        <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
          {"<"}{label ?? t.nav.registerFree}{">"}
        </a>
      </Button>
      <p className="text-xs font-black uppercase tracking-widest text-neutral-gray/80">
        {t.hero.date} · <span className="text-primary-pink">{t.eventInfo.limited}</span>
      </p>
    </div>
  );
}
