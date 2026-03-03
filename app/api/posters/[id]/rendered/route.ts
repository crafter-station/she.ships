import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const poster = await db.query.posters.findFirst({
      where: eq(posters.id, id),
    });

    if (!poster) {
      return NextResponse.json({ error: "Poster not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 10MB." },
        { status: 400 }
      );
    }

    const blob = await put(`posters/${id}/rendered.png`, file, {
      access: "public",
      allowOverwrite: true,
    });

    const filterJson = formData.get("filterSettings") as string | null;
    const detectionJson = formData.get("faceDetection") as string | null;
    const templateVal = formData.get("template") as string | null;

    const [updated] = await db
      .update(posters)
      .set({
        renderedUrl: blob.url,
        ...(filterJson && { filterSettings: JSON.parse(filterJson) }),
        ...(detectionJson && { faceDetection: JSON.parse(detectionJson) }),
        ...(templateVal && { template: templateVal }),
        updatedAt: new Date(),
      })
      .where(eq(posters.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to upload rendered image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
