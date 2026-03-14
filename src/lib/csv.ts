import Papa from "papaparse";
import { z } from "zod";

const REQUIRED_COLUMNS = [
  "user_id",
  "session_id",
  "event_name",
  "stage",
  "occurred_at",
] as const;

const csvRowSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
  session_id: z.string().min(1, "session_id is required"),
  event_name: z.string().min(1, "event_name is required"),
  stage: z.string().min(1, "stage is required"),
  occurred_at: z.string().min(1, "occurred_at is required"),
});

export type CsvRow = z.infer<typeof csvRowSchema>;

function isValidTimestamp(value: string) {
  return !Number.isNaN(new Date(value).getTime());
}

export function parseCsv(text: string): CsvRow[] {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(`CSV parse error: ${result.errors[0].message}`);
  }

  const headers = result.meta.fields?.map((field) => field.trim()) || [];

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headers.includes(column)
  );

  if (missingColumns.length > 0) {
    throw new Error(
      `Missing required columns: ${missingColumns.join(", ")}`
    );
  }

  if (result.data.length === 0) {
    throw new Error("CSV contains no rows.");
  }

  return result.data.map((row, index) => {
    const lineNumber = index + 2;

    const parsed = csvRowSchema.safeParse({
      user_id: row.user_id?.trim(),
      session_id: row.session_id?.trim(),
      event_name: row.event_name?.trim(),
      stage: row.stage?.trim(),
      occurred_at: row.occurred_at?.trim(),
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      throw new Error(`Invalid CSV row at line ${lineNumber}: ${firstIssue.message}`);
    }

    if (!isValidTimestamp(parsed.data.occurred_at)) {
      throw new Error(
        `Invalid timestamp at line ${lineNumber}: occurred_at must be ISO-like date/time`
      );
    }

    return parsed.data;
  });
}
