import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";

export const maxDuration = 30;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) {
    return NextResponse.json({ error: "Badge not found" }, { status: 404 });
  }

  try {
    let browser;

    if (process.env.NODE_ENV === "development") {
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.default.launch({
        executablePath:
          process.platform === "darwin"
            ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            : process.platform === "win32"
              ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
              : "/usr/bin/google-chrome",
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } else {
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium");
      browser = await puppeteer.default.launch({
        args: chromium.default.args,
        defaultViewport: { width: 1600, height: 900 },
        executablePath: await chromium.default.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://sheships.org";

    await page.goto(`${baseUrl}/badge/${id}/capture`, {
      waitUntil: "networkidle0",
    });

    // Wait for the badge to signal it's ready (physics settled)
    await page.waitForFunction("window.__BADGE_READY__ === true", {
      timeout: 15000,
    });

    const screenshot = await page.screenshot({
      type: "png",
      omitBackground: true,
    });

    await browser.close();

    return new Response(Buffer.from(screenshot), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="sheships-badge-${badge.number}.png"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Screenshot failed:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 }
    );
  }
}
