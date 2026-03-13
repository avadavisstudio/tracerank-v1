import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";

type AuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuditPage({ params }: AuditPageProps) {
  const { id } = await params;

  const { data: audit, error } = await supabaseAdmin
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !audit) {
    notFound();
  }

  const summary = audit.summary as
    | {
        totalSessions?: number;
        sessionsReachedFirstValue?: number;
        firstValueRate?: number;
        medianTimeToFirstValueSeconds?: number | null;
        mostCommonDropoffStage?: string | null;
        stageMetrics?: Array<{
          stage: string;
          sessionsEntered: number;
          sessionsReachedFirstValue: number;
          dropoffCount: number;
          dropoffRate: number;
        }>;
        topRetryEvents?: Array<{
          event_name: string;
          count: number;
        }>;
      }
    | null;

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            TraceRank Audit
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {audit.product_name || "Untitled Product"}
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-700">
            Audit ID: {audit.id}
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 md:px-10">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Status</p>
            <p className="mt-2 text-2xl font-semibold">{audit.status}</p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Total sessions</p>
            <p className="mt-2 text-2xl font-semibold">
              {summary?.totalSessions ?? 0}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">First-value rate</p>
            <p className="mt-2 text-2xl font-semibold">
              {typeof summary?.firstValueRate === "number"
                ? `${Math.round(summary.firstValueRate * 100)}%`
                : "0%"}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">Most common drop-off stage</p>
            <p className="mt-2 text-2xl font-semibold">
              {summary?.mostCommonDropoffStage || "None"}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-neutral-900">
              Stage metrics
            </p>

            <div className="mt-6 space-y-4">
              {(summary?.stageMetrics || []).map((stage) => (
                <div
                  key={stage.stage}
                  className="rounded-2xl bg-neutral-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium">{stage.stage}</p>
                    <p className="text-sm text-neutral-600">
                      Drop-off {Math.round(stage.dropoffRate * 100)}%
                    </p>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500">
                        Entered
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {stage.sessionsEntered}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500">
                        Dropped
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {stage.dropoffCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500">
                        Reached first value
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {stage.sessionsReachedFirstValue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {(!summary?.stageMetrics || summary.stageMetrics.length === 0) && (
                <p className="text-sm text-neutral-600">
                  No stage metrics available yet.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                Audit details
              </p>
              <div className="mt-4 space-y-3 text-sm text-neutral-700">
                <p>Email: {audit.email}</p>
                <p>Company: {audit.company || "Not provided"}</p>
                <p>First value event: {audit.first_value_event}</p>
                <p>Rows uploaded: {audit.upload_rows ?? 0}</p>
                <p>
                  Median time to first value:{" "}
                  {summary?.medianTimeToFirstValueSeconds ?? "N/A"} seconds
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                Top retry events
              </p>

              <div className="mt-4 space-y-3">
                {(summary?.topRetryEvents || []).map((retry) => (
                  <div
                    key={retry.event_name}
                    className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-neutral-900">
                      {retry.event_name}
                    </p>
                    <p className="text-sm text-neutral-600">{retry.count}</p>
                  </div>
                ))}

                {(!summary?.topRetryEvents ||
                  summary.topRetryEvents.length === 0) && (
                  <p className="text-sm text-neutral-600">
                    No repeated-event retry signal found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
