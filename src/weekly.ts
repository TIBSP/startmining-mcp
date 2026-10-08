const DAY_MS = 86_400_000;

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

/** Monday (UTC) of the ISO week containing `d`. */
function mondayOf(d: Date): Date {
  const midnight = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const offset = (new Date(midnight).getUTCDay() + 6) % 7;
  return new Date(midnight - offset * DAY_MS);
}

/**
 * Mondays (YYYY-MM-DD, oldest first) of `weeks` consecutive ISO weeks ending with
 * the week containing `week`, or with the last fully closed week when omitted.
 */
export function weekStarts(week: string | undefined, weeks: number, now = new Date()): string[] {
  let last: Date;
  if (week) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(week) || Number.isNaN(Date.parse(`${week}T00:00:00Z`))) {
      throw new Error("Invalid week. Use YYYY-MM-DD (any day of the ISO week)");
    }
    last = mondayOf(new Date(`${week}T00:00:00Z`));
  } else {
    last = new Date(mondayOf(now).getTime() - 7 * DAY_MS);
  }
  if (!Number.isInteger(weeks) || weeks < 1 || weeks > 8) {
    throw new Error("weeks must be an integer between 1 and 8");
  }
  return Array.from({ length: weeks }, (_, i) =>
    isoDay(new Date(last.getTime() - (weeks - 1 - i) * 7 * DAY_MS))
  );
}
