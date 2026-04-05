"use client";

import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-[1] w-full border-t-4 border-primary-black bg-primary-black text-white overflow-hidden">
      <div className="bg-primary-black px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <a
            href="mailto:shiara@sheships.org"
            className="text-xs font-bold uppercase tracking-wide text-white/60 hover:text-primary-pink transition-colors"
          >
            shiara@sheships.org
          </a>
        </div>
      </div>

      {/* Big logo — bottom 10% hidden */}
      <div className="relative w-full px-6 pt-12 pb-0 translate-y-[10%]">
        <img
          src="/brand/she-ships-one-line-logo.svg"
          alt=""
          className="w-full opacity-15"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
