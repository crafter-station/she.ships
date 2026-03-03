import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import PosterEditGate from "@/components/poster/poster-edit-gate";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PosterEditPage({ params }: Props) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster) notFound();

  return <PosterEditGate poster={poster} />;
}
