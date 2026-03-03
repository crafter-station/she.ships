import { NextResponse } from "next/server";
import { getApprovedGuest } from "@/lib/luma";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const guest = await getApprovedGuest(email);

  if (!guest.approved) {
    return NextResponse.json({ error: guest.error }, { status: 403 });
  }

  return NextResponse.json({ ok: true, name: guest.name });
}
