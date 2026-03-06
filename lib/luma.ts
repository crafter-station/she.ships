interface LumaGuest {
  approval_status: string;
  user_name: string;
  user_email: string;
}

interface LumaGuestResponse {
  guest: LumaGuest;
}

type GetApprovedGuestResult =
  | { approved: true; name: string }
  | { approved: false; error: "not_found" | "not_approved" };

async function checkEventGuest(
  apiKey: string,
  eventId: string,
  email: string
): Promise<GetApprovedGuestResult> {
  const url = new URL("https://public-api.luma.com/v1/event/get-guest");
  url.searchParams.set("event_id", eventId);
  url.searchParams.set("id", email);

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "x-luma-api-key": apiKey,
    },
  });

  if (!res.ok) {
    return { approved: false, error: "not_found" };
  }

  const data = (await res.json()) as LumaGuestResponse;

  if (!data.guest || data.guest.approval_status !== "approved") {
    return { approved: false, error: "not_approved" };
  }

  return { approved: true, name: data.guest.user_name };
}

export async function getApprovedGuest(
  email: string
): Promise<GetApprovedGuestResult> {
  const apiKey = process.env.LUMA_API_KEY;
  const eventId = process.env.LUMA_EVENT_ID;

  if (!apiKey || !eventId) {
    throw new Error("Missing LUMA_API_KEY or LUMA_EVENT_ID env vars");
  }

  const eventIds = [eventId, process.env.LUMA_EVENT_ID_2].filter(
    (id): id is string => !!id
  );

  for (const id of eventIds) {
    const result = await checkEventGuest(apiKey, id, email);
    if (result.approved) {
      return result;
    }
  }

  return { approved: false, error: "not_found" };
}
