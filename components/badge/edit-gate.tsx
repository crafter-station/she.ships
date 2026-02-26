"use client";

import { useState, useEffect } from "react";
import BadgeView from "@/components/badge/badge-view";
import type { Badge } from "@/lib/db/schema";

interface EditGateProps {
  badge: Badge;
}

export default function EditGate({ badge }: EditGateProps) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("badge_secret");
    if (stored) {
      verify(stored);
    } else {
      setChecking(false);
    }
  }, []);

  const verify = async (secret: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/badges/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) {
        sessionStorage.setItem("badge_secret", secret);
        setAuthorized(true);
      } else {
        sessionStorage.removeItem("badge_secret");
        setError("Invalid code.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    verify(code.trim());
  };

  if (checking) {
    return (
      <div className="h-dvh flex items-center justify-center bg-primary-black">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (authorized) {
    return <BadgeView badge={badge} />;
  }

  return (
    <div className="h-dvh flex items-center justify-center bg-primary-black px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
            Enter Code
          </h1>
          <p className="mt-1 text-white/40 text-sm">
            Enter your secret code to edit this badge.
          </p>
        </div>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Secret code"
          disabled={loading}
          autoFocus
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white font-mono tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/40 disabled:opacity-50"
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="brutalist-button py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
