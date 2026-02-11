"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Globe } from "@/components/ui/globe";
import { useTranslation } from "@/lib/i18n/context";

export function GlobalEvent() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" grid>
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <div>
          <span className="data-label mb-4 block text-warm-gray">
            {t.globalEvent.label}
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {t.globalEvent.headline}{" "}
            <span className="text-rose-coral">
              {t.globalEvent.headlineAccent}
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-warm-gray">
            {t.globalEvent.description}
          </p>
        </div>

        {/* Globe */}
        <div className="relative mx-auto h-[350px] w-full max-w-[350px] md:h-[400px] md:max-w-[400px]">
          <Globe className="top-0" />
        </div>
      </div>
    </SectionWrapper>
  );
}
