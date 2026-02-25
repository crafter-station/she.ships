"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Loader2 } from "lucide-react";

interface ParticleInputProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export default function ParticleInput({
  onGenerate,
  isLoading,
}: ParticleInputProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");

  const suggestions = t.badge.particlePromptSuggestions;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;
        onGenerate(prompt.trim());
      }
    },
    [prompt, isLoading, onGenerate]
  );

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    setPrompt(suggestion);
    onGenerate(suggestion);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Clickable suggestion chips */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            disabled={isLoading}
            onClick={() => handleSuggestionClick(s)}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/30 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            {s.replace("...", "")}
          </button>
        ))}
      </div>

      {/* Textarea for custom input */}
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.badge.particlePromptCustom}
          disabled={isLoading}
          rows={2}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none disabled:opacity-50 backdrop-blur-sm"
        />
        {isLoading && (
          <div className="absolute right-3 bottom-3 flex items-center gap-2 text-white/40 text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            {t.badge.particlePromptLoading}
          </div>
        )}
      </div>
    </div>
  );
}
