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
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div>
        <p className="data-label text-primary-pink mb-2">{t.badge.label}</p>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
          {t.badge.resultHeadline}
        </h1>
        <p className="mt-2 text-white/60 text-sm font-[family-name:var(--font-title)]">
          {t.badge.resultDate}
        </p>
      </div>

      <p className="text-neutral-gray text-sm leading-relaxed">
        {t.badge.resultDescription}
      </p>

      <div className="h-px bg-white/10" />

      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-white">
          {t.badge.shareLabel}
        </p>
        <div className="flex gap-3">
          <button
            onClick={shareOnTwitter}
            className="brutalist-button flex-1 py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm flex items-center justify-center gap-2"
          >
            <Twitter className="w-4 h-4" />
            Twitter / X
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="brutalist-button flex-1 py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm flex items-center justify-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.badge.editButton}
      </button>
    </div>
  );
}
