import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const company = String(body?.company || "").trim();
    const productName = String(body?.productName || "").trim();
    const website = String(body?.website || "").trim();
    const message = String(body?.message || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("inquiries").insert({
      name,
      email,
      company: company || null,
      product_name: productName || null,
      website: website || null,
      message,
      status: "new",
    });

    if (error) {
      throw new Error(error.message || "Failed to save inquiry.");
    }

    return NextResponse.json({
      ok: true,
      message: "Inquiry received.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Inquiry request failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
