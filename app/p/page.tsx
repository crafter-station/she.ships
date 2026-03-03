"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import PosterForm from "@/components/poster/poster-form";
import { useCreatePoster, generatePosterId } from "@/lib/poster/mutations";

export default function PosterPage() {
  const router = useRouter();
  const createPoster = useCreatePoster();
  const [error, setError] = useState<string | null>(null);
  const [existingPosterId, setExistingPosterId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("poster_id");
    if (stored) {
      setExistingPosterId(stored);
    }
  }, []);

  const handleSubmit = async (email: string, organization: string | null) => {
    setError(null);

    const id = generatePosterId();

    createPoster.mutate(
      {
        id,
        role: "Hacker",
        organization: organization ?? undefined,
        email,
      },
      {
        onSuccess: ({ poster }) => {
          sessionStorage.setItem("poster_email", email);
          localStorage.setItem("poster_id", poster.id);
          router.push(`/p/${poster.id}/edit`);
        },
        onError: (err) => {
          if (err.message === "not_approved") {
            setError("Your registration hasn't been approved yet. Check your Luma status.");
          } else if (err.message === "not_found") {
            setError("No registration found for this email on Luma.");
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
          {existingPosterId && (
            <div className="w-full brutalist-border border-primary-pink/40 bg-primary-pink/5 p-4 flex flex-col gap-2">
              <p className="text-white text-sm font-bold uppercase tracking-wider">
                You already have a poster
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/p/${existingPosterId}`}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
