import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import type { Metadata } from "next";
import PosterPublic from "@/components/poster/poster-public";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster) return {};

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
      url: `https://sheships.org/p/${id}`,
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

export default async function PosterIdPage({ params }: Props) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster) notFound();

  return <PosterPublic poster={poster} />;
}
