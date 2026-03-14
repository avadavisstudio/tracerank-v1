import SiteFooter from "@/components/site-footer";

const paymentLink =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL || "/start";

const builtFor = [
  "B2B SaaS onboarding flows",
  "AI tools with trust-heavy first value",
  "Products with verification or setup friction",
  "Teams that can see drop-off but cannot diagnose it",
];

const deliverables = [
  "First-value rate",
  "Main drop-off stage",
  "Retry and repeated-effort signals",
  "Median time to first value",
  "Ranked immediate fix list",
];

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "B2B SaaS and AI products with multi-step onboarding, setup, verification, or first-value flows.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "A CSV export with user_id, session_id, event_name, stage, and occurred_at columns.",
  },
  {
    question: "What do I receive?",
    answer:
      "One paid founding audit with activation diagnosis, stage breakdown, retry signals, and a ranked fix list.",
  },
  {
    question: "Is this a full analytics replacement?",
    answer:
      "No. TraceRank is a diagnostic layer for activation failure, not a complete analytics suite.",
  },
];

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:px-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
                TraceRank
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-black md:text-6xl">
                Find where activation actually breaks.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                Buy a founding audit, upload a journey export, and get a ranked
                diagnosis of the stages, delays, retries, and abandonment patterns
                hurting first value.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={paymentLink}
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Buy Founding Audit
                </a>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
                >
                  View pricing
                </a>
              </div>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Diagnostic focus
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-neutral-500">First-value rate</p>
                  <p className="mt-2 text-3xl font-semibold">29%</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-neutral-500">
                    Median time to first value
                  </p>
                  <p className="mt-2 text-3xl font-semibold">8m 42s</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-neutral-500">
                    Highest drop-off concentration
                  </p>
                  <p className="mt-2 text-3xl font-semibold">Verification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                One payment. One upload. One diagnosis.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-neutral-200 p-6">
                <p className="text-sm font-medium text-neutral-500">01</p>
                <h3 className="mt-3 text-xl font-semibold">Buy the audit</h3>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  Pay for the founding audit through Stripe-hosted checkout.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 p-6">
                <p className="text-sm font-medium text-neutral-500">02</p>
                <h3 className="mt-3 text-xl font-semibold">Upload the journey</h3>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  Submit your CSV export and define the first value event.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 p-6">
                <p className="text-sm font-medium text-neutral-500">03</p>
                <h3 className="mt-3 text-xl font-semibold">Get the diagnosis</h3>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  TraceRank analyzes the flow and returns stage breakdowns and
                  ranked fixes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Built for
              </p>
              <div className="mt-6 grid gap-4">
                {builtFor.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-neutral-200 p-5"
                  >
                    <p className="text-base leading-7 text-neutral-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                What you get back
              </p>
              <div className="mt-6 grid gap-4">
                {deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-neutral-200 p-5"
                  >
                    <p className="text-base leading-7 text-neutral-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Specimen output
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Example audit snapshot
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                This journey is not failing because demand is weak. It is failing
                because verification delay and repeated effort are destabilizing
                trust before first value appears.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">Verify drop-off</p>
                  <p className="mt-2 text-2xl font-semibold">48%</p>
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">Setup drop-off</p>
                  <p className="mt-2 text-2xl font-semibold">23%</p>
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">First output rate</p>
                  <p className="mt-2 text-2xl font-semibold">29%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Required CSV schema
              </p>
              <div className="mt-6 space-y-3 text-sm leading-7 text-neutral-800">
                <p>user_id</p>
                <p>session_id</p>
                <p>event_name</p>
                <p>stage</p>
                <p>occurred_at</p>
              </div>
              <p className="mt-6 text-sm leading-7 text-neutral-600">
                Initial audits do not require direct product integration. A clean
                event export is enough.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Founding Audit — $249
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-700">
                One journey export. One paid diagnosis. One ranked fix list.
              </p>
            </div>

            <div className="mt-8 max-w-3xl rounded-3xl border border-neutral-200 p-8">
              <ul className="space-y-3 text-base text-neutral-800">
                <li>One journey event-log review</li>
                <li>Activation breakdown by stage</li>
                <li>First-value rate and time-to-value diagnosis</li>
                <li>Retry and abandonment signal review</li>
                <li>Ranked immediate fix list</li>
              </ul>

              <div className="mt-8">
                <a
                  href={paymentLink}
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Buy Founding Audit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                FAQ
              </p>
              <div className="mt-8 space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-3xl border border-neutral-200 p-6"
                  >
                    <h3 className="text-lg font-semibold tracking-tight">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-neutral-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
            <div className="rounded-3xl bg-black px-8 py-12 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
                TraceRank
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight">
                Stop guessing where activation breaks.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                Buy the audit, upload the journey, and get a diagnosis you can act
                on.
              </p>

              <div className="mt-8">
                <a
                  href={paymentLink}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  Buy Founding Audit
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
