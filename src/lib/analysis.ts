type EventRow = {
  user_id: string;
  session_id: string | null;
  event_name: string;
  stage: string | null;
  occurred_at: string;
};

type AnalysisInput = {
  rows: EventRow[];
  firstValueEvent: string;
};

type StageMetric = {
  stage: string;
  sessionsEntered: number;
  sessionsReachedFirstValue: number;
  dropoffCount: number;
  dropoffRate: number;
};

type RetryMetric = {
  event_name: string;
  count: number;
};

type RankedFix = {
  title: string;
  why: string;
  priority: "High" | "Medium" | "Low";
};

export type AnalysisResult = {
  totalSessions: number;
  sessionsReachedFirstValue: number;
  firstValueRate: number;
  medianTimeToFirstValueSeconds: number | null;
  mostCommonDropoffStage: string | null;
  stageMetrics: StageMetric[];
  topRetryEvents: RetryMetric[];
  auditSnapshot: string;
  rankedFixes: RankedFix[];
  instrumentationCoverage: string;
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function buildAuditSnapshot(args: {
  totalSessions: number;
  sessionsReachedFirstValue: number;
  firstValueRate: number;
  mostCommonDropoffStage: string | null;
  topRetryEvents: RetryMetric[];
  firstValueEvent: string;
}) {
  const {
    totalSessions,
    sessionsReachedFirstValue,
    firstValueRate,
    mostCommonDropoffStage,
    topRetryEvents,
    firstValueEvent,
  } = args;

  const dropoffStage = mostCommonDropoffStage || "an unlabeled stage";
  const retrySignal = topRetryEvents[0]?.event_name || "no major repeated event";
  const percent = Math.round(firstValueRate * 100);

  return `This audit reviewed ${totalSessions} sessions. ${sessionsReachedFirstValue} sessions reached the target first value event "${firstValueEvent}", producing a first-value rate of ${percent}%. The primary breakdown concentrates around ${dropoffStage}, and the strongest repeated-effort signal appears around ${retrySignal}. The highest-leverage opportunity is reducing friction before or within ${dropoffStage} so more sessions reach first value with less repeated effort.`;
}

function buildRankedFixes(args: {
  mostCommonDropoffStage: string | null;
  topRetryEvents: RetryMetric[];
  medianTimeToFirstValueSeconds: number | null;
  stageMetrics: StageMetric[];
}) {
  const {
    mostCommonDropoffStage,
    topRetryEvents,
    medianTimeToFirstValueSeconds,
    stageMetrics,
  } = args;

  const fixes: RankedFix[] = [];
  const mainStage = mostCommonDropoffStage || "the main breakdown stage";
  const topRetry = topRetryEvents[0]?.event_name;

  fixes.push({
    title: `Fix friction inside ${mainStage}`,
    why: `This stage holds the strongest concentration of abandonment and should be addressed before downstream redesign.`,
    priority: "High",
  });

  if (topRetry) {
    fixes.push({
      title: `Reduce repeated effort around ${topRetry}`,
      why: `Repeated event attempts usually indicate confusion, failure states, or unnecessary loops.`,
      priority: "High",
    });
  }

  if (
    typeof medianTimeToFirstValueSeconds === "number" &&
    medianTimeToFirstValueSeconds > 180
  ) {
    fixes.push({
      title: "Shorten time to first value",
      why: `The current path to first value is slow enough to create avoidable drop-off before visible payoff appears.`,
      priority: "High",
    });
  }

  const unlabeledStage = stageMetrics.find((stage) => stage.stage === "Unlabeled");
  if (unlabeledStage) {
    fixes.push({
      title: "Improve journey instrumentation",
      why: `Unlabeled events weaken diagnostic quality and make prioritization less reliable.`,
      priority: "Medium",
    });
  }

  fixes.push({
    title: "Track stage-level retries and abandonment over time",
    why: `Ongoing measurement is required to verify whether changes actually improve activation stability.`,
    priority: "Medium",
  });

  return fixes.slice(0, 5);
}

function buildInstrumentationCoverage(stageMetrics: StageMetric[]) {
  const hasUnlabeled = stageMetrics.some((stage) => stage.stage === "Unlabeled");

  if (stageMetrics.length <= 1) {
    return "Low";
  }

  if (hasUnlabeled) {
    return "Medium";
  }

  return "High";
}

export function analyzeJourney({
  rows,
  firstValueEvent,
}: AnalysisInput): AnalysisResult {
  const sessions = new Map<string, EventRow[]>();

  for (const row of rows) {
    const sessionKey = row.session_id?.trim() || `${row.user_id}::fallback`;

    if (!sessions.has(sessionKey)) {
      sessions.set(sessionKey, []);
    }

    sessions.get(sessionKey)!.push(row);
  }

  const stageSessionMap = new Map<string, Set<string>>();
  const dropoffStageCounts = new Map<string, number>();
  const retryCounts = new Map<string, number>();
  const timeToValue: number[] = [];

  let sessionsReachedFirstValue = 0;

  for (const [sessionKey, sessionRows] of sessions.entries()) {
    const ordered = [...sessionRows].sort(
      (a, b) =>
        new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
    );

    const seenEvents = new Map<string, number>();

    for (const row of ordered) {
      const stage = row.stage?.trim() || "Unlabeled";

      if (!stageSessionMap.has(stage)) {
        stageSessionMap.set(stage, new Set());
      }

      stageSessionMap.get(stage)!.add(sessionKey);

      const eventKey = row.event_name.trim();
      seenEvents.set(eventKey, (seenEvents.get(eventKey) || 0) + 1);
    }

    for (const [eventName, count] of seenEvents.entries()) {
      if (count > 1) {
        retryCounts.set(eventName, (retryCounts.get(eventName) || 0) + (count - 1));
      }
    }

    const firstEventTime = new Date(ordered[0].occurred_at).getTime();

    const firstValueRow = ordered.find(
      (row) => row.event_name.trim() === firstValueEvent.trim()
    );

    if (firstValueRow) {
      sessionsReachedFirstValue += 1;

      const firstValueTime = new Date(firstValueRow.occurred_at).getTime();
      const diffSeconds = Math.max(
        0,
        Math.round((firstValueTime - firstEventTime) / 1000)
      );

      timeToValue.push(diffSeconds);
    } else {
      const lastStage = ordered[ordered.length - 1].stage?.trim() || "Unlabeled";

      dropoffStageCounts.set(
        lastStage,
        (dropoffStageCounts.get(lastStage) || 0) + 1
      );
    }
  }

  const totalSessions = sessions.size;
  const firstValueRate =
    totalSessions === 0 ? 0 : sessionsReachedFirstValue / totalSessions;

  const orderedStages = Array.from(stageSessionMap.keys());

  const stageMetrics: StageMetric[] = orderedStages.map((stage) => {
    const entered = stageSessionMap.get(stage)?.size || 0;
    const dropped = dropoffStageCounts.get(stage) || 0;

    return {
      stage,
      sessionsEntered: entered,
      sessionsReachedFirstValue,
      dropoffCount: dropped,
      dropoffRate: entered === 0 ? 0 : dropped / entered,
    };
  });

  let mostCommonDropoffStage: string | null = null;
  let maxDropoffCount = -1;

  for (const [stage, count] of dropoffStageCounts.entries()) {
    if (count > maxDropoffCount) {
      maxDropoffCount = count;
      mostCommonDropoffStage = stage;
    }
  }

  const topRetryEvents = Array.from(retryCounts.entries())
    .map(([event_name, count]) => ({ event_name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const medianTimeToFirstValueSeconds = median(timeToValue);

  const auditSnapshot = buildAuditSnapshot({
    totalSessions,
    sessionsReachedFirstValue,
    firstValueRate,
    mostCommonDropoffStage,
    topRetryEvents,
    firstValueEvent,
  });

  const rankedFixes = buildRankedFixes({
    mostCommonDropoffStage,
    topRetryEvents,
    medianTimeToFirstValueSeconds,
    stageMetrics,
  });

  const instrumentationCoverage = buildInstrumentationCoverage(stageMetrics);

  return {
    totalSessions,
    sessionsReachedFirstValue,
    firstValueRate,
    medianTimeToFirstValueSeconds,
    mostCommonDropoffStage,
    stageMetrics,
    topRetryEvents,
    auditSnapshot,
    rankedFixes,
    instrumentationCoverage,
  };
}
