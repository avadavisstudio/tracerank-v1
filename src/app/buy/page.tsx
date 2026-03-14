import CheckoutButton from "@/components/checkout-button";
import SiteFooter from "@/components/site-footer";

type BuyPageProps = {
  searchParams: Promise<{
    canceled?: string;
  }>;
};

export default async function BuyPage({ searchParams }: BuyPageProps) {
  const params = await searchParams;
  const canceled = params.canceled === "1";

  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Buy the TraceRank Founding Audit
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              One payment. One journey upload. One diagnostic readout with ranked
              fixes.
            </p>

            {canceled ? (
              <p className="mt-6 text-sm font-medium text-red-600">
                Checkout was canceled. You can restart it below.
              </p>
            ) : null}

            <div className="mt-8">
              <CheckoutButton />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-sm font-semibold text-neutral-900">
                Included in the founding audit
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-700">
                <li>One journey event-log review</li>
                <li>Activation breakdown by stage</li>
                <li>First-value rate and time-to-value diagnosis</li>
                <li>Retry and abandonment signal review</li>
                <li>Ranked immediate fix list</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
