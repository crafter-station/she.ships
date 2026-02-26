import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { secret } = await request.json();
  if (secret === process.env.BADGE_SECRET) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
}
