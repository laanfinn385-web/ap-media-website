import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { logEmailToSheet } from "@/lib/googleSheets";

console.log("[api/download] route loaded");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  console.log("[api/download] POST received");

  const body = await req.json().catch(() => ({}));
  const email: string = (body.email ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  // Log to Google Sheet — don't fail the request if Sheets is misconfigured yet
  try {
    await logEmailToSheet(email);
    console.log("[api/download] email logged:", email);
  } catch (err) {
    console.error("[api/download] Sheets error (non-fatal):", err);
  }

  // Stream the PDF back so the browser can save it
  const pdfPath = join(process.cwd(), "public", "downloads", "Volle_Agenda_Content_Gids.pdf");
  const pdfBuffer = readFileSync(pdfPath);

  console.log("[api/download] sending PDF, size:", pdfBuffer.byteLength);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Volle_Agenda_Content_Gids.pdf"',
      "Content-Length": pdfBuffer.byteLength.toString(),
    },
  });
}
