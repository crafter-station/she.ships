"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/sections/footer";
import BadgeForm from "@/components/badge/badge-form";
import type { CardData } from "@/lib/badge/types";
import { useCreateBadge, generateBadgeId } from "@/lib/badge/mutations";
import { defaultParticleConfig, capConfigForMobile } from "@/lib/badge/particle-config";

export default function BadgePage() {
  const router = useRouter();
  const createBadge = useCreateBadge();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CardData, secret: string) => {
    setError(null);

    const id = generateBadgeId();
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const particleConfig = isMobile
      ? capConfigForMobile(defaultParticleConfig)
      : defaultParticleConfig;

    createBadge.mutate(
      {
        id,
        name: data.name,
        role: data.role,
        organization: data.organization ?? undefined,
        particleConfig,
        secret,
      },
      {
        onSuccess: () => {
          router.push(`/badge/${id}`);
        },
        onError: (err) => {
          if (err.message === "Invalid secret") {
            setError("Invalid code. Check your acceptance email and try again.");
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
        <BadgeForm
          onSubmit={handleSubmit}
          error={error}
          isLoading={createBadge.isPending}
        />
      </main>
      <Footer />
    </div>
  );
}
