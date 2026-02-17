"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="beige" id="faq">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block">{t.faq.label}</span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t.faq.headline}{" "}
          <span className="text-rose-coral">{t.faq.headlineAccent}</span>
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion.Root type="multiple" className="space-y-0">
          {t.faq.items.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="border-t border-charcoal/15"
            >
              <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-lg font-bold text-charcoal transition-colors hover:text-rose-coral md:text-xl">
                {item.question}
                <ChevronDown className="size-5 shrink-0 text-charcoal/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-5 text-charcoal/70 leading-relaxed">
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
