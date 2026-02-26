import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import EditGate from "@/components/badge/edit-gate";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BadgeEditPage({ params }: Props) {
  const { id } = await params;
  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) notFound();

  return <EditGate badge={badge} />;
}
