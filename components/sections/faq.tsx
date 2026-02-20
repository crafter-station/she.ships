"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Accordion } from "radix-ui";
import { useTranslation } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="cream" id="faq" className="!bg-[#FAF9F6]">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-black md:text-6xl lg:text-7xl mb-4">
          {t.faq.sectionHeadline}
        </h2>
        <p className="text-lg text-primary-black/70">
          {t.faq.noQuestion}{" "}
          <a
            href="mailto:hello@sheship.com"
            className="underline hover:text-primary-pink transition-colors"
          >
            {t.faq.contactUs}
          </a>
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Accordion.Root type="multiple" className="space-y-0">
          {t.faq.items.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="border-t-2 border-primary-black py-8 first:border-t-0"
            >
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-black flex-shrink-0" />
                  <span className="font-[family-name:var(--font-title)] text-2xl font-bold text-primary-black md:text-3xl">
                    {item.question}
                  </span>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pl-12 pt-4">
                  <p className="text-lg text-primary-black/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </SectionWrapper>
  );
}
