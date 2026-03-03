import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";

// Requires Vercel Pro (60s) — rendering takes ~5-10s with Chromium cold start
export const maxDuration = 60;

const faceBoxSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

const bodySchema = z.object({
  template: z.enum(["half-face", "eyes", "smile"]),
  filter: z.object({
    bgBlur: z.number(),
    bgGrain: z.number(),
    faceGrain: z.number(),
    faceTintHex: z.string(),
    faceTintOpacity: z.number(),
    accentColor: z.string(),
    overlay: z.boolean(),
    autoPosition: z.boolean(),
    panX: z.number(),
    panY: z.number(),
    zoom: z.number(),
  }),
  detection: z.object({
    faceBox: faceBoxSchema,
    rightHalfBox: faceBoxSchema,
    eyesRegion: faceBoxSchema,
    smileRegion: faceBoxSchema,
    landmarks: z.array(z.object({ x: z.number(), y: z.number() })),
  }),
});

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getExecutablePath(): Promise<string> {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  if (process.env.NODE_ENV === "development") {
    // Typical Chrome path on macOS — set PUPPETEER_EXECUTABLE_PATH to override
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  return chromium.executablePath();
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster || !poster.photoUrl) {
    return NextResponse.json({ error: "Poster not found" }, { status: 404 });
  }

  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await request.json());
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { filter, detection, template } = body;

  // Persist filter + detection so the render page can read them
  await db
    .update(posters)
    .set({ filterSettings: filter, faceDetection: detection, template, updatedAt: new Date() })
    .where(eq(posters.id, id));

  const siteUrl = getSiteUrl();
  const executablePath = await getExecutablePath();

  const browser = await puppeteer.launch({
    args: process.env.NODE_ENV === "development" ? ["--no-sandbox"] : chromium.args,
    executablePath,
    headless: true,
    defaultViewport: { width: 1080, height: 1350, deviceScaleFactor: 1 },
  });

  try {
    const page = await browser.newPage();

    // Surface render-page logs/errors in the API logs for easier debugging
    page.on("console", (msg) =>
      console.log(`[render-page ${msg.type()}]`, msg.text())
    );
    page.on("pageerror", (err) =>
      console.error("[render-page error]", err.message)
    );

    // networkidle0: waits for JS bundles, fonts, and images to finish loading.
    // By the time this resolves the canvas is either rendered or about to be.
    // Generous timeout handles Next.js dev-server compilation on first hit.
    const response = await page.goto(`${siteUrl}/render/${id}`, {
      waitUntil: "networkidle0",
      timeout: 50000,
    });

    if (response && !response.ok()) {
      throw new Error(`Render page returned HTTP ${response.status()}`);
    }

    // Poll for the ready OR error signal set by render-canvas.tsx
    await page.waitForFunction(
      () => {
        const el = document.getElementById(
          "poster-canvas"
        ) as HTMLCanvasElement | null;
        return el?.dataset.ready === "true" || el?.dataset.error !== undefined;
      },
      { timeout: 15000 }
    );

    // Fail fast if the canvas reported an error
    const renderError = await page
      .$eval(
        "#poster-canvas",
        (el: Element) => (el as HTMLCanvasElement).dataset.error ?? null
      )
      .catch(() => null);
    if (renderError) throw new Error(`Canvas render failed: ${renderError}`);

    const canvasEl = await page.$("#poster-canvas");
    if (!canvasEl) throw new Error("Canvas element not found after render");

    const screenshot = await canvasEl.screenshot({ type: "png" });

    const blob = await put(`posters/${id}/rendered.png`, screenshot, {
      access: "public",
      allowOverwrite: true,
      contentType: "image/png",
    });

    const [updated] = await db
      .update(posters)
      .set({ renderedUrl: blob.url, updatedAt: new Date() })
      .where(eq(posters.id, id))
      .returning();

    return NextResponse.json(updated);
  } finally {
    await browser.close();
  }
}
