"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubBadge } from "@/components/shared/github-badge";
import { WhatsappBadge } from "@/components/shared/whatsapp-badge";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslation } from "@/lib/i18n/context";

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: t.nav.sponsors, href: "#sponsors" },
    { label: t.nav.whoWeAre, href: "#organizers" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-primary-cream/80 backdrop-blur-xl border-b border-primary-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/">
            <Image
              src="/brand/she-ships-one-line-logo.svg"
              alt="She Ships"
              width={180}
              height={25}
              className={`h-5 sm:h-6 w-auto transition-all duration-300 ${
                scrolled ? "brightness-0" : ""
              }`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-title)] text-sm transition-colors duration-300 ${
                  scrolled
                    ? "text-primary-black/70 hover:text-primary-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <GithubBadge light={!scrolled} />
            <WhatsappBadge light={!scrolled} />
            <LanguageSwitcher light={!scrolled} />
            <Button asChild variant="outline" size="sm">
              <Link href="/p">
                {t.nav.myBadge}
              </Link>
            </Button>
            <Button asChild variant="pink" size="sm">
              <a
                href="https://luma.com/ytl522gp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.join}
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden relative z-50 p-2 transition-colors duration-300 ${
              mobileOpen || scrolled ? "text-primary-black" : "text-white"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary-cream flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[family-name:var(--font-title)] text-3xl font-bold text-primary-black/70 hover:text-primary-black transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-12 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.05 * links.length, duration: 0.25 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <GithubBadge />
                <WhatsappBadge />
                <LanguageSwitcher />
              </div>
              <Button asChild variant="outline" size="lg">
                <Link href="/p" onClick={() => setMobileOpen(false)}>
                  {t.nav.myBadge}
                </Link>
              </Button>
              <Button asChild variant="pink" size="lg">
                <a
                  href="https://luma.com/ytl522gp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.nav.join}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
