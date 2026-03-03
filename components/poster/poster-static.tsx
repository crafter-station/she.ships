"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Download, Pencil } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import type { Badge } from "@/lib/db/schema";

interface PosterStaticProps {
  badge: Badge;
}

export default function PosterStatic({ badge }: PosterStaticProps) {
  const { t } = useTranslation();

  const [isOwner] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("badge_id") === badge.id;
  });

  const badgeNumber = String(badge.number).padStart(7, "0");
  const shareUrl = `https://sheships.org/badge/${badge.id}`;
  const accentColor = "#e49bc2";

  const shareOnTwitter = () => {
    const text = encodeURIComponent(t.badge.shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=SheShips,WomenInTech`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const handleDownload = () => {
    if (badge.posterImageUrl) {
      const a = document.createElement("a");
      a.href = badge.posterImageUrl;
      a.download = `${badge.name.toLowerCase().replace(/\s+/g, "-")}-sheships.png`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="min-h-dvh bg-primary-black">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        {/* Left: text content */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8 w-full max-w-lg">
          <div>
            <p
              className="data-label mb-2"
              style={{ color: accentColor }}
            >
              {t.badge.label}
            </p>
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

          <div
            className="h-px"
            style={{
              backgroundColor: `${accentColor}33`,
            }}
          />

          {/* Badge holder info */}
          <div>
            <h2
              className="text-xl md:text-2xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight"
              style={{ color: accentColor }}
            >
              {badge.name}
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider mt-1">
              {badge.role}
            </p>
            {badge.organization && (
              <p className="text-white/40 text-xs md:text-sm mt-0.5">
                {badge.organization}
              </p>
            )}
            <p className="text-white/20 text-[10px] md:text-xs font-mono tracking-widest mt-2">
              #{badgeNumber}
            </p>
          </div>

          {/* Share buttons */}
          <div className="flex flex-col gap-3">
            <p
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              {t.badge.shareLabel}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={shareOnTwitter}
                className="brutalist-button flex-1 py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter / X
              </button>
              <button
                type="button"
                onClick={shareOnLinkedIn}
                className="brutalist-button flex-1 py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
            </div>
            <div className="flex gap-3">
              {badge.posterImageUrl && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="brutalist-button flex-1 py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Image
                </button>
              )}
            </div>
          </div>

          {/* Edit link for badge owner */}
          {isOwner && (
            <Link
              href={`/badge/${badge.id}/edit`}
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Badge
            </Link>
          )}

          {/* Branding */}
          <p className="text-white/20 text-[10px] md:text-xs tracking-widest uppercase">
            sheships.org
          </p>
        </div>

        {/* Right: poster image */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          {badge.posterImageUrl ? (
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={badge.posterImageUrl}
                alt={`${badge.name}'s poster`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/5] bg-neutral-dark border border-[#333] flex items-center justify-center">
              <div className="text-center px-8">
                <h2
                  className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-title)] uppercase"
                  style={{ color: accentColor }}
                >
                  {badge.name}
                </h2>
                <p className="text-white/80 text-sm font-bold uppercase tracking-wider mt-2">
                  {badge.role}
                </p>
                {badge.organization && (
                  <p className="text-white/40 text-xs mt-1">
                    {badge.organization}
                  </p>
                )}
                <p className="text-white/20 text-[10px] font-mono tracking-widest mt-4">
                  #{badgeNumber}
                </p>
                <p className="text-white/30 text-xs mt-6">
                  SHE SHIPS 2026
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
