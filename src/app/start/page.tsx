import AuditUploadForm from "@/components/audit-upload-form";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            TraceRank Intake
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Submit your paid audit intake
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            Upload your journey export and define the first value event you want
            measured. This intake powers the founding audit you already bought.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <AuditUploadForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                What happens next
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
                <li>1. You submit paid intake details</li>
                <li>2. CSV is parsed and validated</li>
                <li>3. Journey analysis is generated</li>
                <li>4. Audit view is created</li>
                <li>5. You review breakdowns and ranked fixes</li>
              </ol>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                CSV requirements
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
                <li>user_id</li>
                <li>session_id</li>
                <li>event_name</li>
                <li>stage</li>
                <li>occurred_at</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
