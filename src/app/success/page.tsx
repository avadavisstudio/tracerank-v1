import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import SiteFooter from "@/components/site-footer";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id || "";

  if (!sessionId) {
    return (
      <>
        <main className="min-h-screen bg-white text-black">
          <section className="border-b border-neutral-200">
            <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Payment not verified
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                We could not verify your checkout session.
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-700">
                Please return to checkout or contact support if payment completed
                but this page did not load correctly.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Return to checkout
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const { data: payment } = await supabaseAdmin
    .from("payments")
    .select("*")
    .eq("stripe_checkout_session_id", sessionId)
    .single();

  const verified = session.payment_status === "paid" && payment?.status === "paid";

  if (!verified) {
    return (
      <>
        <main className="min-h-screen bg-white text-black">
          <section className="border-b border-neutral-200">
            <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Payment pending
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Your payment has not been verified yet.
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-700">
                If you just completed checkout, wait a moment and refresh this page.
                If the problem continues, contact support.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Payment verified
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Your founding audit is unlocked.
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              Your payment has been verified. Continue to intake and upload the
              journey export for this paid audit.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/start?payment_session_id=${encodeURIComponent(sessionId)}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Continue to intake
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
              >
                Contact support
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-14 md:px-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                Payment details
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
                <p>Session ID: {sessionId}</p>
                <p>Email: {session.customer_details?.email || session.customer_email || "—"}</p>
                <p>Payment status: {session.payment_status}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                Required next step
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The audit is not processed until you submit the intake form and upload
                a valid journey CSV.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
