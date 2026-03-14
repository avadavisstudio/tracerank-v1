export default function SpecimenPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            TraceRank Specimen
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Public-safe example audit
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            This specimen shows the kind of diagnostic output TraceRank produces
            from a structured journey export.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 md:px-10">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">First-value rate</p>
            <p className="mt-2 text-2xl font-semibold">29%</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Time to first value</p>
            <p className="mt-2 text-2xl font-semibold">8m 42s</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Main drop-off stage</p>
            <p className="mt-2 text-2xl font-semibold">Verify</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Top retry signal</p>
            <p className="mt-2 text-2xl font-semibold">verify_email</p>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-neutral-200 p-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Audit snapshot
            </p>
            <p className="mt-4 text-base leading-8 text-neutral-800">
              This activation journey is not failing because awareness is weak.
              It is failing because verification delay and repeated effort are
              destabilizing progress before first value appears.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Immediate fixes
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-neutral-800">
              <li>1. Reduce verification delay immediately after account creation</li>
              <li>2. Remove repeated verification attempts and unclear error states</li>
              <li>3. Shorten the path from verification into first visible output</li>
              <li>4. Track retry loops and dead-end states by stage</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
