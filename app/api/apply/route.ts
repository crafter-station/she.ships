import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { socialSubmissions } from "@/lib/db/schema";

const applySchema = z.object({
  projectName: z.string().min(1).max(200),
  category: z.enum(["instagram", "linkedin"]),
  postUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = applySchema.parse(body);

    const [submission] = await db
      .insert(socialSubmissions)
      .values({
        id: nanoid(),
        projectName: data.projectName,
        category: data.category,
        postUrl: data.postUrl,
      })
      .returning();

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to create social submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
