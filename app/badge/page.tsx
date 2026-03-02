"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import BadgeForm from "@/components/badge/badge-form";
import { useCreateBadge, generateBadgeId } from "@/lib/badge/mutations";
import { defaultParticleConfig, capConfigForMobile } from "@/lib/badge/particle-config";

export default function BadgePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const createBadge = useCreateBadge();
  const [error, setError] = useState<string | null>(null);
  const [existingBadgeId, setExistingBadgeId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("badge_id");
    if (stored) {
      setExistingBadgeId(stored);
    }
  }, []);

  const handleSubmit = async (email: string, organization: string | null) => {
    setError(null);

    const id = generateBadgeId();
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const particleConfig = isMobile
      ? capConfigForMobile(defaultParticleConfig)
      : defaultParticleConfig;

    createBadge.mutate(
      {
        id,
        role: "Hacker",
        organization: organization ?? undefined,
        particleConfig,
        email,
      },
      {
        onSuccess: ({ badge, created }) => {
          sessionStorage.setItem("badge_email", email);
          localStorage.setItem("badge_id", badge.id);

          if (created) {
            router.push(`/badge/${badge.id}/edit`);
          } else {
            router.push(`/badge/${badge.id}`);
          }
        },
        onError: (err) => {
          if (err.message === "not_approved") {
            setError(t.badge.errorNotApproved);
          } else if (err.message === "not_found") {
            setError(t.badge.errorNotFound);
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
          {existingBadgeId && (
            <div className="w-full brutalist-border border-primary-pink/40 bg-primary-pink/5 p-4 flex flex-col gap-2">
              <p className="text-white text-sm font-bold uppercase tracking-wider">
                {t.badge.existingBadge}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/badge/${existingBadgeId}`}
                  className="inline-flex items-center gap-1.5 text-primary-pink font-bold text-sm uppercase tracking-wider hover:underline"
                >
                  {t.badge.existingBadgeLink}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-white/40 text-xs">{t.badge.existingBadgeOr}</span>
              </div>
            </div>
          )}
          <BadgeForm
            onSubmit={handleSubmit}
            error={error}
            isLoading={createBadge.isPending}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
