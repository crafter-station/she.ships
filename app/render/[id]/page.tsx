import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import { RenderCanvas } from "./render-canvas";
import type { TemplateType } from "@/lib/poster/types";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function RenderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (
    !poster ||
    !poster.photoUrl ||
    !poster.filterSettings ||
    !poster.faceDetection
  ) {
    notFound();
  }

  return (
    <div style={{ margin: 0, padding: 0, background: "#000", lineHeight: 0 }}>
      <RenderCanvas
        photoUrl={poster.photoUrl}
        name={poster.name}
        role={poster.role}
        template={poster.template as TemplateType}
        filter={poster.filterSettings}
        detection={poster.faceDetection}
      />
    </div>
  );
}
