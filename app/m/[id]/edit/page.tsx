import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import PosterEditor from "@/components/poster/poster-editor";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import { isMentorRole } from "@/lib/poster/semantics";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MentorPosterEditPage({ params }: Props) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster || !isMentorRole(poster.role)) notFound();

  return <PosterEditor poster={poster} basePath="/m" />;
}
