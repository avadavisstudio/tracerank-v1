import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            Payment received
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Your founding audit is ready for intake.
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-700">
            The next step is submitting your journey export and defining the
            first value event you want measured.
          </p>

          <div className="mt-8">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Continue to intake
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 py-14 md:px-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-neutral-900">
              What you need next
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
              <li>Work email</li>
              <li>Company or product name</li>
              <li>First value event label</li>
              <li>CSV with required journey fields</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold text-neutral-900">
              Required CSV columns
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
              <li>user_id</li>
              <li>session_id</li>
              <li>event_name</li>
              <li>stage</li>
              <li>occurred_at</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-neutral-900">
              What happens after upload
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
              <li>1. Your CSV is validated and stored</li>
              <li>2. TraceRank analyzes the journey</li>
              <li>3. An audit page is generated</li>
              <li>4. You review stage breakdowns and immediate fixes</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
