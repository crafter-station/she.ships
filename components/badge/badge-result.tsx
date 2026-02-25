"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Twitter, Linkedin, ArrowLeft } from "lucide-react";
import type { CardData } from "@/lib/badge/types";

interface BadgeResultProps {
  cardData: CardData;
  onEdit: () => void;
}

export default function BadgeResult({ cardData, onEdit }: BadgeResultProps) {
  const { t } = useTranslation();

  const shareOnTwitter = () => {
    const text = encodeURIComponent(t.badge.shareText);
    const url = encodeURIComponent("https://www.sheships.org/badge");
    const hashtags = "SheShips,WomenInTech";
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent("https://www.sheships.org/badge");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col gap-3 md:gap-8 w-full max-w-md">
      {/* Headline — hidden on mobile to keep badge visible */}
      <div className="hidden md:block">
        <p className="data-label text-primary-pink mb-2">{t.badge.label}</p>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
          {t.badge.resultHeadline}
        </h1>
        <p className="mt-2 text-white/60 text-sm font-[family-name:var(--font-title)]">
          {t.badge.resultDate}
        </p>
      </div>

      {/* Description — hidden on mobile */}
      <p className="hidden md:block text-neutral-gray text-sm leading-relaxed">
        {t.badge.resultDescription}
      </p>

      <div className="hidden md:block h-px bg-white/10" />

      {/* Share buttons — compact on mobile */}
      <div className="flex items-center gap-2 md:flex-col md:items-stretch md:gap-3">
        <p className="hidden md:block text-sm font-bold uppercase tracking-wider text-white">
          {t.badge.shareLabel}
        </p>
        <div className="flex gap-2 md:gap-3 flex-1">
          <button
            onClick={shareOnTwitter}
            className="brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 bg-white text-primary-black font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
          >
            <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Twitter / X
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 bg-white text-primary-black font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
          >
            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            LinkedIn
          </button>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="flex items-center gap-2 text-white/50 hover:text-white text-[10px] md:text-sm uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
        {t.badge.editButton}
      </button>
    </div>
  );
}
