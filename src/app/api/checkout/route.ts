import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_ID." },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      customer_creation: "always",
      allow_promotion_codes: false,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/buy?canceled=1`,
      metadata: {
        offer: "TraceRank Founding Audit",
      },
    });

    const { error } = await supabaseAdmin.from("payments").insert({
      stripe_checkout_session_id: session.id,
      status: "created",
      amount_total: session.amount_total ?? null,
      currency: session.currency ?? null,
    });

    if (error) {
      throw new Error(error.message || "Failed to create payment record.");
    }

    return NextResponse.json({
      ok: true,
      url: session.url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout creation failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
