export interface PlannerInput {
  totalPages: number;
  startingPage: number;
  oldMemorizedPages: number;
  pagesPerDayNew: number;
  olderRevisionPagesPerDay: number;
  weeks: number;
}

export interface DayPlan {
  dayLabel: string;
  newMemorization: string;
  newRevision: string;
  oldRevision: string;
}

export interface WeekPlan {
  week: number;
  days: DayPlan[];
}

const RECENT_REVISION_WINDOW_DAYS = 10;
const RECENT_REVISION_TARGET_DAYS = 5;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function clampInt(value: number, min: number, max: number) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function makePageRange(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function takeLinearRange(
  cursor: number,
  count: number,
  maxPage: number
): { range: [number, number] | null; next: number } {
  const safeCount = Math.max(0, Math.floor(count));
  if (safeCount === 0 || cursor > maxPage) return { range: null, next: cursor };
  const end = Math.min(maxPage, cursor + safeCount - 1);
  return { range: [cursor, end], next: end + 1 };
}

function pagesToRanges(pages: number[]): Array<[number, number]> {
  if (!pages.length) return [];
  const out: Array<[number, number]> = [];
  let start = pages[0];
  let prev = pages[0];

  for (let i = 1; i < pages.length; i++) {
    const p = pages[i];
    if (p === prev + 1) {
      prev = p;
    } else {
      out.push([start, prev]);
      start = p;
      prev = p;
    }
  }

  out.push([start, prev]);
  return out;
}

function formatRange(range: [number, number]): string {
  const [s, e] = range;
  return s === e ? `p. ${s}` : `pp. ${s}-${e}`;
}

function formatRanges(ranges: Array<[number, number]>): string {
  if (!ranges.length) return "—";
  return ranges.map(formatRange).join(" + ");
}

function pickWrapped<T>(
  arr: T[],
  startIndex: number,
  count: number
): { items: T[]; nextIndex: number } {
  if (!arr.length || count <= 0) return { items: [], nextIndex: 0 };

  const safeStart = ((startIndex % arr.length) + arr.length) % arr.length;
  const safeCount = Math.min(Math.max(0, Math.floor(count)), arr.length);

  const items: T[] = [];
  for (let i = 0; i < safeCount; i++) {
    items.push(arr[(safeStart + i) % arr.length]);
  }

  return { items, nextIndex: (safeStart + safeCount) % arr.length };
}

function uniqueSorted(nums: number[]): number[] {
  return Array.from(new Set(nums)).sort((a, b) => a - b);
}

export function buildWeeklySchedule(input: PlannerInput): WeekPlan[] {
  const totalPages = clampInt(input.totalPages || 604, 1, 10000);
  const startingPage = clampInt(input.startingPage || 1, 1, totalPages + 1);
  const pagesPerDayNew = clampInt(input.pagesPerDayNew || 1, 1, 100);
  const olderRevisionPagesPerDay = clampInt(
    input.olderRevisionPagesPerDay || 10,
    1,
    200
  );
  const weeks = clampInt(input.weeks || 1, 1, 104);

  const providedOld = clampInt(input.oldMemorizedPages || 0, 0, totalPages);
  const oldMemorizedPages =
    providedOld > 0 ? providedOld : Math.max(0, startingPage - 1);

  let newMemCursor = startingPage;
  let latestNewEnd = startingPage - 1;

  // Recent revision is driven by recency: material from the most recent
  // new-memorization window is rotated frequently while it is still fresh.
  let recentRevCursor = 0;

  // Older revision is a maintenance pool. Its cursor continues across weeks
  // so the same opening pages are not repeatedly favoured at each new week.
  let oldRevCursor = 0;

  const plan: WeekPlan[] = [];

  for (let w = 1; w <= weeks; w++) {
    const days: DayPlan[] = [];

    for (let d = 0; d < 7; d++) {
      // 1) New memorization: sequential pages from the chosen starting point.
      const newMem = takeLinearRange(
        newMemCursor,
        pagesPerDayNew,
        totalPages
      );
      const todayNewPages = newMem.range
        ? makePageRange(newMem.range[0], newMem.range[1])
        : [];

      if (newMem.range) {
        newMemCursor = newMem.next;
        latestNewEnd = Math.max(latestNewEnd, newMem.range[1]);
      }

      // 2) Recent revision:
      // Build a pool from the previous 10 days of new memorization.
      // The daily target scales with the size of that pool so recent material
      // is revisited several times rather than receiving only one pass.
      const recentWindowPages = pagesPerDayNew * RECENT_REVISION_WINDOW_DAYS;
      const recentRevisionEnd = newMem.range
        ? newMem.range[0] - 1
        : latestNewEnd;

      const recentPool =
        recentRevisionEnd >= startingPage
          ? makePageRange(
              Math.max(
                startingPage,
                recentRevisionEnd - recentWindowPages + 1
              ),
              recentRevisionEnd
            )
          : [];

      const recentDailyTarget = recentPool.length
        ? Math.max(
            pagesPerDayNew,
            Math.ceil(recentPool.length / RECENT_REVISION_TARGET_DAYS)
          )
        : 0;

      const recentPick = pickWrapped(
        recentPool,
        recentRevCursor,
        recentDailyTarget
      );

      if (recentPool.length) {
        recentRevCursor = recentPick.nextIndex;
      }

      const recentRevisionPages = recentPick.items as number[];

      // 3) Older revision:
      // Established memorization is maintained in manageable portions.
      // Newly memorized pages enter this pool automatically after they leave
      // the recent window. Today's new and recent pages are kept separate.
      const oldBasePages = makePageRange(1, oldMemorizedPages);
      const newSoFarPages =
        latestNewEnd >= startingPage
          ? makePageRange(startingPage, latestNewEnd)
          : [];

      const memorizedPortion = uniqueSorted([
        ...oldBasePages,
        ...newSoFarPages,
      ]);

      const recentSet = new Set(recentPool);
      const excludeFromOld = new Set([
        ...recentSet,
        ...todayNewPages,
      ]);

      const oldPoolPages = memorizedPortion.filter(
        (page) => !excludeFromOld.has(page)
      );

      const oldPick = pickWrapped(
        oldPoolPages,
        oldRevCursor,
        olderRevisionPagesPerDay
      );

      if (oldPoolPages.length) {
        oldRevCursor = oldPick.nextIndex;
      }

      days.push({
        dayLabel: DAYS[d],
        newMemorization: newMem.range ? formatRange(newMem.range) : "—",
        newRevision: formatRanges(
          pagesToRanges(recentRevisionPages)
        ),
        oldRevision: formatRanges(
          pagesToRanges(oldPick.items as number[])
        ),
      });
    }

    plan.push({ week: w, days });
  }

  return plan;
}
