import Papa from "papaparse";
import { z } from "zod";

const csvRowSchema = z.object({
  user_id: z.string().min(1),
  session_id: z.string().optional().default(""),
  event_name: z.string().min(1),
  stage: z.string().optional().default(""),
  occurred_at: z.string().min(1),
});

export type CsvRow = z.infer<typeof csvRowSchema>;

export function parseCsv(text: string): CsvRow[] {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return result.data.map((row, index) => {
    const parsed = csvRowSchema.safeParse({
      user_id: row.user_id?.trim(),
      session_id: row.session_id?.trim() || "",
      event_name: row.event_name?.trim(),
      stage: row.stage?.trim() || "",
      occurred_at: row.occurred_at?.trim(),
    });

    if (!parsed.success) {
      throw new Error(`Invalid CSV row at line ${index + 2}`);
    }

    return parsed.data;
  });
}
