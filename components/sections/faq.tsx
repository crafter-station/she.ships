"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="red" bordered id="faq">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl uppercase">
          {t.faq.headline}{" "}
          <span className="text-secondary-light-pink">
            {t.faq.headlineAccent}
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion.Root type="multiple" className="space-y-4">
          {t.faq.items.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="brutalist-card bg-white"
            >
              <Accordion.Trigger className="group flex w-full items-center justify-between p-6 text-left font-[family-name:var(--font-title)] text-xl font-black text-primary-black transition-colors hover:text-primary-pink uppercase">
                {item.question}
                <ChevronDown
                  className="size-6 shrink-0 text-primary-black transition-transform duration-200 group-data-[state=open]:rotate-180"
                  strokeWidth={3}
                />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-6 pb-6 text-neutral-gray text-lg font-medium leading-relaxed">
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </SectionWrapper>
  );
}
