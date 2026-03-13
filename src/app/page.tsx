import Link from "next/link";

const bullets = [
  "Pinpoint the stage where activation becomes unstable",
  "Measure time-to-first-value, retries, and abandonment",
  "Get a ranked fix list instead of another dashboard",
];

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "B2B SaaS and AI products with multi-step onboarding, setup, verification, or first-value flows.",
  },
  {
    question: "What data do I need?",
    answer:
      "A CSV export with user_id, session_id, event_name, stage, and occurred_at columns.",
  },
  {
    question: "Is this a full analytics replacement?",
    answer:
      "No. TraceRank is a diagnostic layer for activation failure, not a complete analytics suite.",
  },
];

export default function HomePage() {
  return (
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
              Upload a journey event export and get a ranked diagnosis of the
              stages, delays, retries, and abandonment patterns hurting first
              value.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Start a TraceRank Audit
              </Link>

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
              Why teams buy this
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Most teams can see drop-off. Very few can explain where activation
              first became fragile.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              TraceRank isolates the point where progress weakens, confidence
              drops, and time-to-value stretches. That gives founders and
              product teams a clearer answer to what to fix first.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-3xl border border-neutral-200 p-6"
              >
                <p className="text-base leading-7 text-neutral-800">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Specimen output
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Example audit snapshot
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                This activation flow is not failing because demand is weak. It
                is failing because verification delay and repeated effort are
                destabilizing trust before first value appears.
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
                Ranked fix list
              </p>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-neutral-800">
                <li>
                  <span className="font-semibold">1.</span> Reduce verification
                  delay and surface progress state immediately after account
                  creation.
                </li>
                <li>
                  <span className="font-semibold">2.</span> Remove duplicate
                  effort in setup and clarify the next required action.
                </li>
                <li>
                  <span className="font-semibold">3.</span> Shorten the path to
                  first visible output inside the trust-sensitive window.
                </li>
                <li>
                  <span className="font-semibold">4.</span> Instrument retries
                  and dead-end loops by stage.
                </li>
                <li>
                  <span className="font-semibold">5.</span> Track time-to-first-
                  value as a primary activation stability metric.
                </li>
              </ol>
            </div>
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
              Founding Audit — $500
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              One product journey. One event upload. One diagnosis. One ranked
              fix list.
            </p>
          </div>

          <div className="mt-8 max-w-3xl rounded-3xl border border-neutral-200 p-8">
            <ul className="space-y-3 text-base text-neutral-800">
              <li>One journey event-log review</li>
              <li>Activation breakdown by stage</li>
              <li>First-value rate and time-to-value diagnosis</li>
              <li>Retry and abandonment signal review</li>
              <li>Ranked fix list with next actions</li>
            </ul>

            <div className="mt-8">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Start a TraceRank Audit
              </Link>
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
              Upload the journey. Get the diagnosis. Fix what is actually
              costing conversion.
            </p>

            <div className="mt-8">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                Start a TraceRank Audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
