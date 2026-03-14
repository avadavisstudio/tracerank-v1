import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook signature or secret." },
      { status: 400 }
    );
  }

  try {
    const body = await req.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;

      const paymentIntent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null;

      const email =
        session.customer_details?.email || session.customer_email || null;

      const { error } = await supabaseAdmin
        .from("payments")
        .update({
          status: "paid",
          stripe_payment_intent_id: paymentIntent,
          stripe_customer_email: email,
          amount_total: session.amount_total ?? null,
          currency: session.currency ?? null,
          paid_at: new Date().toISOString(),
        })
        .eq("stripe_checkout_session_id", session.id);

      if (error) {
        throw new Error(error.message || "Failed to update paid payment.");
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;

      const { error } = await supabaseAdmin
        .from("payments")
        .update({
          status: "expired",
        })
        .eq("stripe_checkout_session_id", session.id);

      if (error) {
        throw new Error(error.message || "Failed to update expired payment.");
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook handling failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
