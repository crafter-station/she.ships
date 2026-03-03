"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { ArrowRight, Loader2 } from "lucide-react";

interface PosterFormProps {
  onSubmit: (email: string, organization: string | null) => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function PosterForm({ onSubmit, error, isLoading }: PosterFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const canSubmit = email.trim().length > 0 && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(email.trim(), organization.trim() || null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full max-w-md"
    >
      <div>
        <p className="data-label text-primary-pink mb-2">POSTER</p>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
          Generate your{" "}
          <span className="text-primary-pink">poster</span>
        </h1>
        <p className="mt-4 text-neutral-gray text-sm">
          Enter your Luma email to generate a personalized She Ships poster.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="poster-email"
            className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
          >
            {t.badge.emailLabel}
          </label>
          <input
            id="poster-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.badge.emailPlaceholder}
            disabled={isLoading}
            className={`w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors disabled:opacity-50 ${error ? "border-red-500" : ""}`}
          />
          {error ? (
            <p className="mt-1.5 text-red-400 text-xs font-medium">{error}</p>
          ) : (
            <p className="mt-1.5 text-white/30 text-xs">{t.badge.emailHint}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="poster-org"
            className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
          >
            Organization <span className="text-white/40 font-normal normal-case">(optional)</span>
          </label>
          <input
            id="poster-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Crafter Station"
            maxLength={40}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors disabled:opacity-50"
          />
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
            Generate Poster
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
