import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { parseCsv } from "@/lib/csv";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const productName = String(formData.get("productName") || "").trim();
    const firstValueEvent = String(formData.get("firstValueEvent") || "").trim();
    const file = formData.get("file");

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!firstValueEvent) {
      return NextResponse.json(
        { error: "First value event is required." },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "CSV file is required." }, { status: 400 });
    }

    const fileText = await file.text();
    const parsedRows = parseCsv(fileText);

    if (parsedRows.length === 0) {
      return NextResponse.json(
        { error: "CSV contains no valid rows." },
        { status: 400 }
      );
    }

    const { data: audit, error: auditError } = await supabaseAdmin
      .from("audits")
      .insert({
        email,
        company: company || null,
        product_name: productName || null,
        first_value_event: firstValueEvent,
        status: "uploaded",
        upload_rows: parsedRows.length,
      })
      .select("id")
      .single();

    if (auditError || !audit) {
      throw new Error(auditError?.message || "Failed to create audit.");
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${audit.id}/${Date.now()}-${safeFileName}`;

    const { error: storageError } = await supabaseAdmin.storage
      .from("audit-uploads")
      .upload(filePath, Buffer.from(fileText, "utf8"), {
        contentType: "text/csv",
        upsert: false,
      });

    if (storageError) {
      throw new Error(storageError.message || "Failed to upload CSV.");
    }

    const eventRows = parsedRows.map((row) => ({
      audit_id: audit.id,
      user_id: row.user_id,
      session_id: row.session_id || null,
      event_name: row.event_name,
      stage: row.stage || null,
      occurred_at: row.occurred_at,
    }));

    const { error: eventsError } = await supabaseAdmin
      .from("audit_events")
      .insert(eventRows);

    if (eventsError) {
      throw new Error(eventsError.message || "Failed to store event rows.");
    }

    const { error: updateError } = await supabaseAdmin
      .from("audits")
      .update({
        file_path: filePath,
      })
      .eq("id", audit.id);

    if (updateError) {
      throw new Error(updateError.message || "Failed to update audit file path.");
    }

    return NextResponse.json({
      ok: true,
      message: "Upload received and stored.",
      auditId: audit.id,
      rowCount: parsedRows.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload request failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
