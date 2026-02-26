import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const WALLPAPERS = [
  "SS-Wallpaper-01.jpg",
  "SS-Wallpaper-02.jpg",
  "SS-Wallpaper-03.png",
  "SS-Wallpaper-04.png",
];

export async function GET() {
  const keys = WALLPAPERS.map((f) => `wallpaper:downloads:${f}`);
  const values = await redis.mget<(number | null)[]>(...keys);

  const counts: Record<string, number> = {};
  WALLPAPERS.forEach((f, i) => {
    counts[f] = values[i] ?? 0;
  });

  return Response.json(counts);
}

export async function POST(req: NextRequest) {
  const { filename } = await req.json();

  if (!WALLPAPERS.includes(filename)) {
    return Response.json({ error: "Invalid wallpaper" }, { status: 400 });
  }

  const count = await redis.incr(`wallpaper:downloads:${filename}`);
  return Response.json({ count });
}
