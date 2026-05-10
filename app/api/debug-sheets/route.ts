import { NextResponse } from "next/server";
import { google } from "googleapis";

// Temporary debug endpoint — remove after fixing
export async function GET() {
  const results: Record<string, string> = {};

  // 1. Check env vars are present
  results.has_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? "YES" : "MISSING";
  results.has_key   = process.env.GOOGLE_PRIVATE_KEY            ? "YES" : "MISSING";
  results.has_sheet = process.env.GOOGLE_SHEET_ID               ? "YES" : "MISSING";
  results.email_value = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "none").slice(0, 30) + "...";
  results.sheet_id    = process.env.GOOGLE_SHEET_ID ?? "none";

  // 2. Check key format
  const rawKey = process.env.GOOGLE_PRIVATE_KEY ?? "";
  const processedKey = rawKey.replace(/\\n/g, "\n");
  results.key_starts = processedKey.slice(0, 40);
  results.key_contains_newlines = processedKey.includes("\n") ? "YES" : "NO";
  results.key_has_begin = (
    processedKey.includes("BEGIN RSA PRIVATE KEY") ||
    processedKey.includes("BEGIN PRIVATE KEY")
  ) ? "YES" : "NO — KEY FORMAT WRONG";

  // 3. Try to authenticate
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: processedKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    await auth.getClient();
    results.auth = "OK";
  } catch (e: unknown) {
    results.auth = "FAILED: " + (e instanceof Error ? e.message : String(e));
  }

  // 4. Try to actually write a test row
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: processedKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["debug-test@test.com", "DEBUG TEST - DELETE ME"]] },
    });
    results.write = "OK — check your sheet for a debug-test row";
  } catch (e: unknown) {
    results.write = "FAILED: " + (e instanceof Error ? e.message : String(e));
  }

  return NextResponse.json(results, { status: 200 });
}
