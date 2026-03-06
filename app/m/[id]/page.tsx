import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import PosterPublic from "@/components/poster/poster-public";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import { isMentorRole } from "@/lib/poster/semantics";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster || !isMentorRole(poster.role)) return {};

  const title = `${poster.name} is participating in She Ships!`;
  const description = `${poster.name} (${poster.role}) is building and shipping at She Ships Hackathon.`;
  const ogImageUrl = `https://sheships.org/api/og/poster/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://sheships.org/m/${id}`,
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

export default async function MentorPosterIdPage({ params }: Props) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster || !isMentorRole(poster.role)) notFound();

  return <PosterPublic poster={poster} basePath="/m" ownerStorageKey="mentor_poster_id" />;
}
