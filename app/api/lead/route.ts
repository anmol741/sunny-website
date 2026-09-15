import { NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * Lead intake endpoint for the contact / showing-request forms.
 *
 * Delivery channels:
 *   1. Follow Up Boss   — POST to the Events API, via `FUB_API_KEY` (runs
 *                          alongside Google Sheets, not as a fallback for it)
 *   2. Google Sheets    — append a row, via a service account
 *   3. CSV / Excel      — append a row to `LEAD_CSV_PATH` (local/dev only,
 *                          used only if neither of the above is configured
 *                          or both fail)
 *   4. Server log       — last resort, so a submission is never dropped silently
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
  consent: boolean;
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

  // Name and email are the only hard requirements — consent is opt-in, phone is optional.
  if (!name || !email) return null;
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
    consent: raw.consent === true,
    receivedAt: new Date().toISOString(),
  };
}

/** 1. Follow Up Boss — Events API (https://docs.followupboss.com/reference/events-create). */
async function sendLeadToFollowUpBoss(lead: Lead): Promise<boolean> {
  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) return false;

  const [firstName, ...rest] = lead.name.split(/\s+/);
  const lastName = rest.join(" ");

  const res = await fetch("https://api.followupboss.com/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      source: "Sunny Chadha Website",
      system: "Sunny Chadha Website",
      type: "General Inquiry",
      message: `${lead.message ?? ""}${
        lead.message ? "\n\n" : ""
      }SMS consent: ${lead.consent ? "yes" : "no"}`,
      person: {
        firstName,
        lastName,
        emails: [{ value: lead.email }],
        ...(lead.phone ? { phones: [{ value: lead.phone }] } : {}),
      },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Follow Up Boss Events API returned ${res.status} ${res.statusText}`,
    );
  }
  return true;
}

/**
 * 2. Google Sheets — runs alongside Follow Up Boss as a second record of
 * every lead.
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

  const row = [
    ...columns.map((column) => escape(lead[column])),
    escape(String(lead.consent)),
  ].join(",");
  await appendFile(
    csvPath,
    `${needsHeader ? `${[...columns, "consent"].join(",")}\n` : ""}${row}\n`,
    "utf8",
  );
  return true;
}

/** Delivers via one channel, logging success/failure the same way for all channels. */
async function deliverToChannel(
  channel: string,
  deliver: (lead: Lead) => Promise<boolean>,
  lead: Lead,
): Promise<boolean> {
  try {
    const delivered = await deliver(lead);
    if (delivered) {
      console.log(`[lead] delivered via ${channel}:`, lead.email);
    }
    return delivered;
  } catch (error) {
    // A configured channel failed. Log it — other channels still run, so a
    // CRM outage can't cost Sunny a lead.
    console.error(`[lead] ${channel} delivery failed:`, error);
    return false;
  }
}

/**
 * Single entry point for delivering a parsed lead. Follow Up Boss and Google
 * Sheets run alongside each other (one failing doesn't skip or block the
 * other, or the visitor's success message); CSV and the server log are a
 * last-resort fallback used only if neither of those delivered.
 */
async function sendLead(lead: Lead): Promise<string> {
  const [fubDelivered, sheetsDelivered] = await Promise.all([
    deliverToChannel("follow-up-boss", sendLeadToFollowUpBoss, lead),
    deliverToChannel("google-sheets", appendLeadToGoogleSheet, lead),
  ]);

  const delivered = [
    fubDelivered && "follow-up-boss",
    sheetsDelivered && "google-sheets",
  ].filter((channel): channel is string => Boolean(channel));

  if (delivered.length > 0) return delivered.join("+");

  if (await deliverToChannel("csv", appendLeadToCsv, lead)) {
    return "csv";
  }

  // Nothing configured (or everything failed). Log the full lead so it can be
  // recovered from the Netlify function logs, and still report success to the
  // visitor rather than telling them to try again.
  console.warn(
    "[lead] NOT DELIVERED — no lead channel is configured. Set FUB_API_KEY " +
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
      { error: "Name and a valid email are required." },
      { status: 400 },
    );
  }

  const channel = await sendLead(lead);
  return NextResponse.json({ ok: true, channel });
}
