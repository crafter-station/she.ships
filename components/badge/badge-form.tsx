"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { ArrowRight, Loader2 } from "lucide-react";
import type { CardData } from "@/lib/badge/types";

interface BadgeFormProps {
  onSubmit: (data: CardData, secret: string) => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function BadgeForm({ onSubmit, error, isLoading }: BadgeFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [secret, setSecret] = useState("");

  const canSubmit = name.trim().length > 0 && secret.trim().length > 0 && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(
      {
        name: name.trim(),
        role: "Hacker",
        organization: organization.trim() || null,
      },
      secret.trim()
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full max-w-md"
    >
      <div>
        <p className="data-label text-primary-pink mb-2">{t.badge.label}</p>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
          {t.badge.headline}{" "}
          <span className="text-primary-pink">{t.badge.headlineAccent}</span>
        </h1>
        <p className="mt-4 text-neutral-gray text-sm">{t.badge.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="badge-name"
            className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
          >
            {t.badge.nameLabel}
          </label>
          <input
            id="badge-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.badge.namePlaceholder}
            maxLength={40}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="badge-org"
            className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
          >
            Organization <span className="text-white/40 font-normal normal-case">(optional)</span>
          </label>
          <input
            id="badge-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Crafter Station"
            maxLength={40}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="badge-secret"
            className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
          >
            {t.badge.secretLabel}
          </label>
          <input
            id="badge-secret"
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder={t.badge.secretPlaceholder}
            disabled={isLoading}
            className={`w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors font-mono tracking-widest disabled:opacity-50 ${error ? "border-red-500" : ""}`}
          />
          {error ? (
            <p className="mt-1.5 text-red-400 text-xs font-medium">{error}</p>
          ) : (
            <p className="mt-1.5 text-white/30 text-xs">{t.badge.secretHint}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="brutalist-button w-full py-4 px-6 bg-primary-pink text-primary-black font-bold uppercase tracking-wider text-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {t.badge.generateButton}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
