"use client";

import Link from "next/link";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Accordion } from "radix-ui";
import { useTranslation } from "@/lib/i18n/context";

export default function QAPage() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main>
        <SectionWrapper variant="dark" className="min-h-fit">
          <div className="mb-8">
            <Link
              href="/#faq"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-title)] text-sm font-bold uppercase tracking-wide text-primary-cream/70 hover:text-primary-pink transition-colors"
            >
              <span aria-hidden="true">&larr;</span>
              {t.qa.backToHome}
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-cream md:text-6xl lg:text-7xl mb-4">
              {t.qa.title}
            </h1>
            <p className="text-lg text-primary-cream/70 max-w-2xl mx-auto">
              {t.qa.subtitle}
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Accordion.Root type="multiple" className="space-y-0">
              {t.qa.items.map((item, i) => (
                <Accordion.Item
                  key={`qa-${item.question.slice(0, 20)}`}
                  value={`qa-${i}`}
                  className="border-t-2 border-primary-cream/20 py-8 first:border-t-0"
                >
                  <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-pink flex-shrink-0" />
                      <span className="font-[family-name:var(--font-title)] text-2xl font-bold text-primary-cream md:text-3xl">
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
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
