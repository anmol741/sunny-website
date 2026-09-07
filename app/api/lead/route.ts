import { NextResponse } from "next/server";

// TODO(CJ/Anmol): This is a placeholder lead-intake endpoint.
// Once Sunny's Follow Up Boss API key is available, forward `body` here to
// the Follow Up Boss Leads API (https://docs.followupboss.com/reference/events-create)
// instead of just logging it. Do NOT fabricate a working FUB integration
// until real credentials are provided — store the key in an env var
// (e.g. FOLLOW_UP_BOSS_API_KEY) and never commit it.
export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, phone, consent } = body ?? {};

  if (!name || !email || !phone || !consent) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  // Placeholder: log the lead server-side for now.
  console.log("[lead] New lead received:", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  // TODO(CJ/Anmol): replace with real Follow Up Boss forwarding, e.g.
  //
  // await fetch("https://api.followupboss.com/v1/events", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Basic ${Buffer.from(
  //       `${process.env.FOLLOW_UP_BOSS_API_KEY}:`
  //     ).toString("base64")}`,
  //   },
  //   body: JSON.stringify({
  //     source: "Sunny Chadha Website",
  //     type: "General Inquiry",
  //     person: { firstName: name, emails: [{ value: email }], phones: [{ value: phone }] },
  //     message: body.message,
  //   }),
  // });

  return NextResponse.json({ ok: true });
}
