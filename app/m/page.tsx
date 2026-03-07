"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PosterForm from "@/components/poster/poster-form";
import MentorAuthGate from "@/components/badge/mentor-auth-gate";
import { Footer } from "@/components/sections/footer";
import { useCreatePoster, generatePosterId } from "@/lib/poster/mutations";

type AuthStatus = "checking" | "locked" | "authenticated";

export default function MentorPosterPage() {
  const router = useRouter();
  const createPoster = useCreatePoster();

  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [error, setError] = useState<string | null>(null);
  const [existingPosterId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("mentor_poster_id");
  });

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/mentor-badge-auth", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          if (active) setAuthStatus("locked");
          return;
        }

        const data = (await response.json()) as { authenticated: boolean };
        if (!active) return;
        setAuthStatus(data.authenticated ? "authenticated" : "locked");
      } catch {
        if (active) setAuthStatus("locked");
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (email: string, organization: string | null) => {
    setError(null);

    const id = generatePosterId();

    createPoster.mutate(
      {
        id,
        role: "Organizer",
        organization: organization ?? undefined,
        email,
      },
      {
        onSuccess: ({ poster }) => {
          sessionStorage.setItem("mentor_poster_email", email);
          localStorage.setItem("mentor_poster_id", poster.id);
          router.push(`/m/${poster.id}/edit`);
        },
        onError: (err) => {
          if (err.message === "not_approved") {
            setError("Your registration hasn't been approved yet. Check your Luma status.");
          } else if (err.message === "not_found") {
            setError("No registration found for this email on Luma.");
          } else if (err.message === "role_conflict") {
            setError("This email already has a participant poster. Use another email.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-black">
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="flex flex-col gap-6 w-full max-w-md items-center">
          {authStatus === "checking" && (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" />
          )}

          {authStatus === "locked" && (
            <MentorAuthGate onAuthenticated={() => setAuthStatus("authenticated")} />
          )}

          {authStatus === "authenticated" && (
            <>
              {existingPosterId && (
                <div className="w-full brutalist-border border-primary-pink/40 bg-primary-pink/5 p-4 flex flex-col gap-2">
                  <p className="text-white text-sm font-bold uppercase tracking-wider">
                    You already have an organizer poster
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/m/${existingPosterId}`}
                      className="inline-flex items-center gap-1.5 text-primary-pink font-bold text-sm uppercase tracking-wider hover:underline"
                    >
                      View your poster
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-white/40 text-xs">or create a new one below</span>
                  </div>
                </div>
              )}

              <PosterForm
                onSubmit={handleSubmit}
                error={error}
                isLoading={createPoster.isPending}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
