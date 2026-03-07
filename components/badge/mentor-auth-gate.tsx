"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";

interface MentorAuthGateProps {
  onAuthenticated: () => void;
}

export default function MentorAuthGate({ onAuthenticated }: MentorAuthGateProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/mentor-badge-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: { code?: string } }
          | null;
        const code = payload?.error?.code;

        if (response.status === 401 && code === "INVALID_PASSWORD") {
          setError(t.badge.mentorAuth.invalidPassword);
        } else if (response.status === 500 && code?.startsWith("AUTH_CONFIG_")) {
          setError(t.badge.mentorAuth.configError);
        } else {
          setError(t.badge.mentorAuth.serverError);
        }
        return;
      }

      setPassword("");
      onAuthenticated();
    } catch {
      setError(t.badge.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md brutalist-border bg-primary-black p-6 md:p-8">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <p className="data-label text-primary-pink">{t.badge.mentorAuth.label}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
            {t.badge.mentorAuth.title}
          </h1>
          <p className="text-sm text-neutral-gray">{t.badge.mentorAuth.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="mentor-password"
            className="text-sm font-bold uppercase tracking-wider text-white"
          >
            {t.badge.mentorAuth.passwordLabel}
          </label>
          <input
            id="mentor-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t.badge.mentorAuth.passwordPlaceholder}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/40 brutalist-border focus:outline-none focus:border-primary-pink transition-colors disabled:opacity-50"
          />
        </div>

        {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || password.trim().length === 0}
          className="brutalist-button w-full py-4 px-6 bg-primary-pink text-primary-black font-bold uppercase tracking-wider text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? t.badge.mentorAuth.verifying : t.badge.mentorAuth.submit}
        </button>
      </form>
    </div>
  );
}
