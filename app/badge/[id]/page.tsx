import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import type { Metadata } from "next";
import PosterStatic from "@/components/poster/poster-static";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) return {};

  const role = badge.organization
    ? `${badge.role} @ ${badge.organization}`
    : badge.role;
  const title = `${badge.name} is hacking at She Ships — 48h Global Hackathon`;
  const description = `${badge.name} (${role}) is building and shipping at She Ships Hackathon 2026. Join women and creators from around the world in 48 hours of building.`;
  const ogImageUrl = `https://sheships.org/api/og/badge/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://sheships.org/badge/${id}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BadgeIdPage({ params }: Props) {
  const { id } = await params;
  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) notFound();

  return <PosterStatic badge={badge} />;
}
