import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { analyzeJourney } from "@/lib/analysis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const auditId = String(body?.auditId || "").trim();

    if (!auditId) {
      return NextResponse.json({ error: "auditId is required." }, { status: 400 });
    }

    const { data: audit, error: auditError } = await supabaseAdmin
      .from("audits")
      .select("id, first_value_event")
      .eq("id", auditId)
      .single();

    if (auditError || !audit) {
      return NextResponse.json({ error: "Audit not found." }, { status: 404 });
    }

    const { data: rows, error: rowsError } = await supabaseAdmin
      .from("audit_events")
      .select("user_id, session_id, event_name, stage, occurred_at")
      .eq("audit_id", auditId)
      .order("occurred_at", { ascending: true });

    if (rowsError) {
      throw new Error(rowsError.message || "Failed to load audit events.");
    }

    const summary = analyzeJourney({
      rows: rows || [],
      firstValueEvent: audit.first_value_event,
    });

    const { error: updateError } = await supabaseAdmin
      .from("audits")
      .update({
        status: "analyzed",
        summary,
      })
      .eq("id", auditId);

    if (updateError) {
      throw new Error(updateError.message || "Failed to save analysis.");
    }

    return NextResponse.json({
      ok: true,
      auditId,
      summary,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Analysis request failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
