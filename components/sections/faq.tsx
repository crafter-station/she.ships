"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { Accordion } from "radix-ui";
import { useTranslation } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="faq" className="min-h-fit">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-primary-cream md:text-4xl lg:text-5xl mb-4">
          {t.faq.sectionHeadline}
        </h2>
        <p className="text-lg text-primary-cream/70">
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
          {t.qa.items.slice(0, 4).map((item, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="border-t-2 border-primary-cream/20 py-8 first:border-t-0"
            >
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 bg-primary-pink flex-shrink-0 mt-1" />
                  <span className="font-[family-name:var(--font-title)] text-base font-normal text-primary-cream md:text-lg">
                    {item.question}
                  </span>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pl-12 pt-4">
                  <p className="text-lg text-primary-cream/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/qa"
          className="inline-block border-3 border-primary-cream bg-transparent px-8 py-4 font-[family-name:var(--font-title)] text-lg font-bold uppercase tracking-wide text-primary-cream hover:bg-primary-pink hover:text-primary-black transition-colors"
        >
          {t.faq.viewMore}
        </Link>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4">
        <Button asChild variant="pink" size="lg">
          <a href="https://luma.com/ytl522gp" target="_blank" rel="noopener noreferrer">
            {"<"}{t.nav.registerFree}{">"}
          </a>
        </Button>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-gray/80">
          {t.hero.date} · <span className="text-primary-pink">{t.eventInfo.limited}</span>
        </p>
      </div>
    </SectionWrapper>
  );
}
