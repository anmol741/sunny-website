import { NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * Lead intake endpoint for the contact / showing-request forms.
 *
 * Delivery is attempted in this order, first configured channel wins:
 *   1. Follow Up Boss   — POST the lead to `FUB_WEBHOOK_URL`
 *   2. Google Sheets    — append a row, via a service account (interim CRM until FUB is ready)
 *   3. CSV / Excel      — append a row to `LEAD_CSV_PATH` (local/dev only)
 *   4. Server log       — last resort, so a submission is never dropped silently
 *
 * TODO(CJ): **Sunny's Follow Up Boss credentials are still outstanding.** Until
 * CJ supplies them nothing reaches the CRM. Two options:
 *
 *   - Easiest: create an inbound webhook / Zapier-style "Lead Source" URL in
 *     Follow Up Boss and set `FUB_WEBHOOK_URL` in Netlify. No code change needed.
 *   - Direct API: get the FUB API key (FUB > Admin > API), set
 *     `FOLLOW_UP_BOSS_API_KEY`, and switch `forwardToFollowUpBoss()` over to the
 *     Events API (https://docs.followupboss.com/reference/events-create), which
 *     needs Basic auth: `Buffer.from(`${key}:`).toString("base64")`.
 *
 * Do NOT hardcode a key or invent a working FUB integration — env vars only,
 * and never commit the values.
 *
 * TODO(CJ): Also confirm the retention/consent wording in the form matches what
 * Sunny's brokerage requires under PIPEDA/CASL before launch.
 */

const INTEREST_OPTIONS = [
  "Buying",
  "Selling",
  "Commercial",
  "Just Looking",
] as const;

type Interest = (typeof INTEREST_OPTIONS)[number];

type Lead = {
  name: string;
  email: string;
  phone?: string;
  interestedIn?: Interest;
  message?: string;
  formType: string;
  listingAddress?: string;
  listingMls?: string;
  receivedAt: string;
};

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Shape and validate the raw form payload. Returns null if it isn't usable. */
function parseLead(body: unknown): Lead | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;

  const name = asTrimmedString(raw.name);
  const email = asTrimmedString(raw.email);

  // Name, email, and consent are the only hard requirements — phone is optional.
  if (!name || !email || raw.consent !== true) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  const interest = asTrimmedString(raw.interestedIn);

  return {
    name,
    email,
    phone: asTrimmedString(raw.phone),
    interestedIn: INTEREST_OPTIONS.includes(interest as Interest)
      ? (interest as Interest)
      : undefined,
    message: asTrimmedString(raw.message),
    formType: asTrimmedString(raw.formType) ?? "contact",
    listingAddress: asTrimmedString(raw.listingAddress),
    listingMls: asTrimmedString(raw.listingMls),
    receivedAt: new Date().toISOString(),
  };
}

/** 1. Follow Up Boss inbound webhook. */
async function forwardToFollowUpBoss(lead: Lead): Promise<boolean> {
  const webhookUrl = process.env.FUB_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "sunnychadha.com",
      type:
        lead.formType === "showing" ? "Property Inquiry" : "General Inquiry",
      person: {
        firstName: lead.name,
        emails: [{ value: lead.email }],
        ...(lead.phone ? { phones: [{ value: lead.phone }] } : {}),
      },
      interestedIn: lead.interestedIn,
      message: lead.message,
      property: lead.listingAddress
        ? { street: lead.listingAddress, mlsNumber: lead.listingMls }
        : undefined,
      receivedAt: lead.receivedAt,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Follow Up Boss webhook returned ${res.status} ${res.statusText}`,
    );
  }
  return true;
}

/**
 * 2. Google Sheets — interim CRM until Sunny's FUB webhook URL is issued.
 *
 * Appends one row per lead to the sheet at `GOOGLE_SHEET_ID`, columns:
 * Timestamp | Name | Email | Phone | Interested In | Message. Auth is a
 * service account (no OAuth login flow, works headlessly from the server) —
 * the account's client email must be shared on the sheet with Editor access,
 * and the sheet needs that header row added once, up front, so columns line
 * up with what gets appended here.
 */
async function appendLeadToGoogleSheet(lead: Lead): Promise<boolean> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !privateKey || !sheetId) return false;

  const auth = new google.auth.JWT({
    email: clientEmail,
    // Netlify env vars store the key's newlines escaped as literal `\n`.
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          lead.receivedAt,
          lead.name,
          lead.email,
          lead.phone ?? "",
          lead.interestedIn ?? "",
          lead.message ?? "",
        ],
      ],
    },
  });

  return true;
}

/**
 * 3. CSV append — opens directly in Excel.
 *
 * NOTE: only useful when running with a persistent filesystem (local `next dev`
 * or a long-lived server). Netlify functions have an ephemeral filesystem, so a
 * file written here does NOT survive between invocations. Left in as the
 * "Excel fallback" for local capture and testing only.
 */
async function appendLeadToCsv(lead: Lead): Promise<boolean> {
  const csvPath = process.env.LEAD_CSV_PATH;
  if (!csvPath) return false;

  const { appendFile, access } = await import("node:fs/promises");

  const escape = (value: string | undefined) =>
    `"${(value ?? "").replace(/"/g, '""')}"`;

  const columns = [
    "receivedAt",
    "name",
    "email",
    "phone",
    "interestedIn",
    "message",
    "formType",
    "listingAddress",
    "listingMls",
  ] as const;

  let needsHeader = false;
  try {
    await access(csvPath);
  } catch {
    needsHeader = true;
  }

  const row = columns.map((column) => escape(lead[column])).join(",");
  await appendFile(
    csvPath,
    `${needsHeader ? `${columns.join(",")}\n` : ""}${row}\n`,
    "utf8",
  );
  return true;
}

/**
 * Single entry point for delivering a parsed lead. Tries each configured
 * channel in order and returns the name of whichever one accepted it (or
 * "log" if none are configured). Adding Follow Up Boss for real is then just
 * setting `FUB_WEBHOOK_URL` in Netlify — this function and its channel list
 * don't need to change.
 */
async function sendLead(lead: Lead): Promise<string> {
  const channels: Array<[string, (lead: Lead) => Promise<boolean>]> = [
    ["follow-up-boss", forwardToFollowUpBoss],
    ["google-sheets", appendLeadToGoogleSheet],
    ["csv", appendLeadToCsv],
  ];

  for (const [channel, deliver] of channels) {
    try {
      if (await deliver(lead)) {
        console.log(`[lead] delivered via ${channel}:`, lead.email);
        return channel;
      }
    } catch (error) {
      // A configured channel failed. Log it and fall through to the next one so
      // a CRM outage can't cost Sunny a lead.
      console.error(`[lead] ${channel} delivery failed:`, error);
    }
  }

  // Nothing configured (or everything failed). Log the full lead so it can be
  // recovered from the Netlify function logs, and still report success to the
  // visitor rather than telling them to try again.
  console.warn(
    "[lead] NOT DELIVERED — no lead channel is configured. Set FUB_WEBHOOK_URL " +
      "or GOOGLE_SHEETS_CLIENT_EMAIL/GOOGLE_SHEETS_PRIVATE_KEY/GOOGLE_SHEET_ID in " +
      "the Netlify environment. Lead payload:",
    lead,
  );
  return "log";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json(
      { error: "Name, a valid email, and consent are required." },
      { status: 400 },
    );
  }

  const channel = await sendLead(lead);
  return NextResponse.json({ ok: true, channel });
}
