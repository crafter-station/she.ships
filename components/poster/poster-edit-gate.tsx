"use client";

import { useState, useEffect, useCallback } from "react";
import PosterEditor from "@/components/poster/poster-editor";
import type { Poster } from "@/lib/db/schema";

interface PosterEditGateProps {
  poster: Poster;
}

export default function PosterEditGate({ poster }: PosterEditGateProps) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const verify = useCallback(async (emailToVerify: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posters/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify }),
      });
      if (res.ok) {
        sessionStorage.setItem("poster_email", emailToVerify);
        setAuthorized(true);
      } else {
        sessionStorage.removeItem("poster_email");
        const data = await res.json().catch(() => ({}));
        if (data.error === "not_approved") {
          setError("You haven't been accepted yet. Check your Luma status.");
        } else if (data.error === "not_found") {
          setError("No registration found for this email.");
        } else {
          setError("Invalid email.");
        }
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("poster_email");
    if (stored) {
      verify(stored);
    } else {
      setChecking(false);
    }
  }, [verify]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    verify(email.trim());
  };

  if (checking) {
    return (
      <div className="h-dvh flex items-center justify-center bg-primary-black">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (authorized) {
    return <PosterEditor poster={poster} />;
  }

  return (
    <div className="h-dvh flex items-center justify-center bg-primary-black px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
            Enter Email
          </h1>
          <p className="mt-1 text-white/40 text-sm">
            Enter the email you registered with on Luma to edit this poster.
          </p>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={loading}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 disabled:opacity-50"
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="brutalist-button py-3 px-4 bg-white text-primary-black font-bold uppercase text-sm disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
