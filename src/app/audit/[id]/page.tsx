import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import SiteFooter from "@/components/site-footer";

type AuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Summary = {
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
};

function formatPercent(value?: number) {
  if (typeof value !== "number") return "—";
  return `${Math.round(value * 100)}%`;
}

function formatSeconds(value?: number | null) {
  if (typeof value !== "number") return "—";
  if (value < 60) return `${value}s`;

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${minutes}m ${seconds}s`;
}

function buildExecutiveSummary(
  summary: Summary,
  firstValueEvent: string
): string {
  const totalSessions = summary.totalSessions ?? 0;
  const reached = summary.sessionsReachedFirstValue ?? 0;
  const dropoffStage = summary.mostCommonDropoffStage || "an unlabeled stage";
  const rate = formatPercent(summary.firstValueRate);

  return `This audit reviewed ${totalSessions} sessions. ${reached} sessions reached the target first value event "${firstValueEvent}", resulting in a first-value rate of ${rate}. The strongest failure concentration appears around ${dropoffStage}, which is the highest-leverage breakdown zone to fix first.`;
}

function buildImmediateRead(summary: Summary) {
  const retries = summary.topRetryEvents || [];
  const topRetry = retries[0]?.event_name || "no repeated event";
  const dropoffStage = summary.mostCommonDropoffStage || "the main breakdown stage";

  return [
    `Fix ${dropoffStage} before redesigning downstream stages.`,
    `Investigate repeated effort around ${topRetry}.`,
    `Shorten time to first value and reduce dead time before visible output.`,
    `Tighten instrumentation around retries, delay, and abandonment transitions.`,
  ];
}

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

  const summary = (audit.summary || {}) as Summary;
  const immediateRead = buildImmediateRead(summary);

  return (
    <>
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
              <p className="text-sm text-neutral-500">First-value rate</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatPercent(summary.firstValueRate)}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm text-neutral-500">Time to first value</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatSeconds(summary.medianTimeToFirstValueSeconds)}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm text-neutral-500">Main drop-off stage</p>
              <p className="mt-2 text-2xl font-semibold">
                {summary.mostCommonDropoffStage || "—"}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Executive summary
              </p>
              <p className="mt-4 text-base leading-8 text-neutral-800">
                {buildExecutiveSummary(summary, audit.first_value_event)}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Audit details
              </p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-neutral-800">
                <p>
                  <span className="font-medium">Contact:</span> {audit.email}
                </p>
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {audit.company || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Rows uploaded:</span>{" "}
                  {audit.upload_rows ?? 0}
                </p>
                <p>
                  <span className="font-medium">First value event:</span>{" "}
                  {audit.first_value_event}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:px-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Immediate read
              </p>
              <ol className="mt-6 space-y-4 text-sm leading-7 text-neutral-800">
                {immediateRead.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Top retry signals
              </p>
              <div className="mt-6 space-y-4">
                {(summary.topRetryEvents || []).length === 0 ? (
                  <p className="text-sm text-neutral-600">
                    No repeated-event retry signal detected.
                  </p>
                ) : (
                  (summary.topRetryEvents || []).map((item) => (
                    <div
                      key={item.event_name}
                      className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-4"
                    >
                      <span className="text-sm font-medium text-neutral-900">
                        {item.event_name}
                      </span>
                      <span className="text-sm text-neutral-600">
                        {item.count} retries
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Stage breakdown
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-neutral-600">
                      Stage
                    </th>
                    <th className="px-6 py-4 font-medium text-neutral-600">
                      Sessions entered
                    </th>
                    <th className="px-6 py-4 font-medium text-neutral-600">
                      Drop-off count
                    </th>
                    <th className="px-6 py-4 font-medium text-neutral-600">
                      Drop-off rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {(summary.stageMetrics || []).map((item) => (
                    <tr key={item.stage}>
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        {item.stage}
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {item.sessionsEntered}
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {item.dropoffCount}
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {formatPercent(item.dropoffRate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
            <div className="rounded-3xl border border-neutral-200 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Recommended next actions
              </p>
              <ol className="mt-6 space-y-4 text-sm leading-7 text-neutral-800">
                <li>1. Address the dominant breakdown stage before changing downstream flows.</li>
                <li>2. Remove repeated effort and retry loops from the highest-friction event.</li>
                <li>3. Reduce time between initial intent and first visible value.</li>
                <li>4. Tighten instrumentation around delay, retries, and stage abandonment.</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
