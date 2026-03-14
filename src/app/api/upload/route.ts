import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { parseCsv } from "@/lib/csv";
import { sendIntakeReceivedEmail } from "@/lib/email/send";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const paymentSessionId = String(formData.get("paymentSessionId") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const productName = String(formData.get("productName") || "").trim();
    const firstValueEvent = String(formData.get("firstValueEvent") || "").trim();
    const file = formData.get("file");

    if (!paymentSessionId) {
      return NextResponse.json(
        { error: "Verified payment session is required." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("stripe_checkout_session_id", paymentSessionId)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { error: "Payment session not found." },
        { status: 400 }
      );
    }

    if (payment.status !== "paid") {
      return NextResponse.json(
        { error: "Payment has not been verified yet." },
        { status: 400 }
      );
    }

    if (payment.audit_id) {
      return NextResponse.json(
        { error: "This payment session has already been used for an audit." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: "Work email is required." }, { status: 400 });
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

    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".csv")) {
      return NextResponse.json(
        { error: "Only .csv files are accepted." },
        { status: 400 }
      );
    }

    const fileText = await file.text();

    if (!fileText.trim()) {
      return NextResponse.json(
        { error: "CSV file is empty." },
        { status: 400 }
      );
    }

    const parsedRows = parseCsv(fileText);
    const finalEmail = payment.stripe_customer_email || email;

    const { data: audit, error: auditError } = await supabaseAdmin
      .from("audits")
      .insert({
        email: finalEmail,
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
      session_id: row.session_id,
      event_name: row.event_name,
      stage: row.stage,
      occurred_at: row.occurred_at,
    }));

    const { error: eventsError } = await supabaseAdmin
      .from("audit_events")
      .insert(eventRows);

    if (eventsError) {
      throw new Error(eventsError.message || "Failed to store event rows.");
    }

    const { error: paymentUpdateError } = await supabaseAdmin
      .from("payments")
      .update({
        audit_id: audit.id,
      })
      .eq("id", payment.id);

    if (paymentUpdateError) {
      throw new Error(paymentUpdateError.message || "Failed to link payment to audit.");
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

    await sendIntakeReceivedEmail({
      to: finalEmail,
      productName: productName || null,
      auditId: audit.id,
      firstValueEvent,
      uploadRows: parsedRows.length,
    });

    return NextResponse.json({
      ok: true,
      message: "Upload received and stored.",
      auditId: audit.id,
      rowCount: parsedRows.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload request failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
