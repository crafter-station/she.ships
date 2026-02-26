import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import BadgeCapture from "@/components/badge/badge-capture";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BadgeCapturePage({ params }: Props) {
  const { id } = await params;
  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) notFound();

  return (
    <BadgeCapture
      name={badge.name}
      role={badge.role}
      organization={badge.organization}
      particleConfig={badge.particleConfig}
      badgeNumber={String(badge.number).padStart(7, "0")}
    />
  );
}
