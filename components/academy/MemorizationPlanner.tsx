"use client";

import { useEffect, useMemo, useState } from "react";
import { buildWeeklySchedule } from "@/lib/memorization/schedule";

type PlannerState = {
  totalPages: number;
  startingPage: number;
  oldMemorizedPages: number;
  pagesPerDayNew: number;
  olderRevisionPagesPerDay: number;
  weeks: number;
  completed: Record<string, boolean>;
};

const STORAGE_KEY = "ommsulaim:quran-planner:v1";

const DEFAULT_STATE: PlannerState = {
  totalPages: 604,
  startingPage: 1,
  oldMemorizedPages: 0,
  pagesPerDayNew: 1,
  olderRevisionPagesPerDay: 10,
  weeks: 4,
  completed: {},
};

function toNumber(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function MemorizationPlanner() {
  const [state, setState] = useState<PlannerState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<PlannerState> & {
        updatedAt?: string;
      };

      setState({
        totalPages: Math.max(1, toNumber(parsed.totalPages, DEFAULT_STATE.totalPages)),
        startingPage: Math.max(1, toNumber(parsed.startingPage, DEFAULT_STATE.startingPage)),
        oldMemorizedPages: Math.max(0, toNumber(parsed.oldMemorizedPages, DEFAULT_STATE.oldMemorizedPages)),
        pagesPerDayNew: Math.max(1, toNumber(parsed.pagesPerDayNew, DEFAULT_STATE.pagesPerDayNew)),
        olderRevisionPagesPerDay: Math.max(
          1,
          toNumber(parsed.olderRevisionPagesPerDay, DEFAULT_STATE.olderRevisionPagesPerDay)
        ),
        weeks: Math.max(1, Math.min(52, toNumber(parsed.weeks, DEFAULT_STATE.weeks))),
        completed: parsed.completed ?? {},
      });

      if (parsed.updatedAt) setLastSaved(parsed.updatedAt);
    } catch {
      // Ignore invalid saved data and use defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const payload = {
      ...state,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setLastSaved(payload.updatedAt);
  }, [state, hydrated]);

  const schedule = useMemo(
    () =>
      buildWeeklySchedule({
        totalPages: state.totalPages,
        startingPage: state.startingPage,
        oldMemorizedPages: state.oldMemorizedPages,
        pagesPerDayNew: state.pagesPerDayNew,
        olderRevisionPagesPerDay: state.olderRevisionPagesPerDay,
        weeks: state.weeks,
      }),
    [
      state.totalPages,
      state.startingPage,
      state.oldMemorizedPages,
      state.pagesPerDayNew,
      state.olderRevisionPagesPerDay,
      state.weeks,
    ]
  );

  const weeklyNew = state.pagesPerDayNew * 7;
  const remaining = Math.max(0, state.totalPages - state.startingPage + 1);
  const estWeeks = weeklyNew > 0 ? Math.ceil(remaining / weeklyNew) : 0;

  const totalDays = schedule.reduce((acc, w) => acc + w.days.length, 0);
  const doneDays = Object.values(state.completed).filter(Boolean).length;
  const progressPct =
    totalDays === 0 ? 0 : Math.min(100, Math.round((doneDays / totalDays) * 100));

  const orderedDayKeys = useMemo(() => {
    const keys: string[] = [];
    schedule.forEach((week) => {
      week.days.forEach((_, idx) => {
        keys.push(`${week.week}-${idx}`);
      });
    });
    return keys;
  }, [schedule]);

  const setNumeric = (
    key: keyof Omit<PlannerState, "completed">,
    value: number
  ) => {
    setState((prev) => {
      const safeValue = Number.isFinite(value)
        ? Math.max(1, Math.floor(value))
        : prev[key];

      if (safeValue === prev[key]) return prev;

      return { ...prev, [key]: safeValue, completed: {} };
    });
  };

  const setOldMemorizedPages = (value: number) => {
    setState((prev) => {
      const safeValue = Number.isFinite(value)
        ? Math.max(0, Math.floor(value))
        : prev.oldMemorizedPages;

      if (safeValue === prev.oldMemorizedPages) return prev;

      return { ...prev, oldMemorizedPages: safeValue, completed: {} };
    });
  };

  const toggleDone = (key: string, checked: boolean) => {
    setState((prev) => {
      const dayIndex = orderedDayKeys.indexOf(key);
      if (dayIndex === -1) return prev;

      const completed = { ...prev.completed };

      if (checked) {
        if (dayIndex > 0) {
          const previousKey = orderedDayKeys[dayIndex - 1];
          if (!completed[previousKey]) return prev;
        }

        completed[key] = true;
      } else {
        for (let i = dayIndex; i < orderedDayKeys.length; i += 1) {
          delete completed[orderedDayKeys[i]];
        }
      }

      return { ...prev, completed };
    });
  };

  const clearChecks = () => {
    setState((prev) => ({ ...prev, completed: {} }));
  };

  const resetAll = () => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
    setLastSaved("");
  };

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-700 md:px-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Build your Hifz plan</h2>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Adjust the numbers below and your weekly schedule will update automatically.
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Changing a setting starts a fresh checklist.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">Total Qur’an pages</span>
            <input
              type="number"
              min={1}
              value={state.totalPages}
              onChange={(e) => setNumeric("totalPages", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              A standard Madinah Mushaf is often planned as 604 pages. Change this if your Mushaf differs.
            </span>
          </label>

          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">Starting page for new Hifz</span>
            <input
              type="number"
              min={1}
              max={state.totalPages + 1}
              value={state.startingPage}
              onChange={(e) => setNumeric("startingPage", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              Enter the page where you will begin your next new memorization.
            </span>
          </label>

          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">Pages already memorized</span>
            <input
              type="number"
              min={0}
              max={state.totalPages}
              value={state.oldMemorizedPages}
              onChange={(e) => setOldMemorizedPages(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              These pages form the starting pool for established revision. If your memorization is sequential, this will usually be the pages before your starting page.
            </span>
          </label>

          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">New pages per day</span>
            <input
              type="number"
              min={1}
              value={state.pagesPerDayNew}
              onChange={(e) => setNumeric("pagesPerDayNew", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              Your recent revision load is calculated from this new-memorization pace.
            </span>
          </label>

          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">Older revision pages per day</span>
            <input
              type="number"
              min={1}
              max={200}
              value={state.olderRevisionPagesPerDay}
              onChange={(e) =>
                setNumeric("olderRevisionPagesPerDay", Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              Choose a manageable amount for established memorization. The planner estimates the rotation from this number.
            </span>
          </label>

          <label className="block text-sm text-slate-800 dark:text-slate-800">
            <span className="mb-2 block text-base font-semibold text-slate-900 dark:text-white">Weeks to generate</span>
            <input
              type="number"
              min={1}
              max={52}
              value={state.weeks}
              onChange={(e) => setNumeric("weeks", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-700 dark:focus:ring-slate-700"
            />
            <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
              Generate up to 52 weeks at a time.
            </span>
          </label>

          <div className="rounded-2xl bg-slate-50 p-5 text-base text-slate-800 dark:bg-slate-800/80 dark:text-slate-800 md:col-span-2">
            <p className="font-bold text-slate-900 dark:text-white">Your plan at a glance</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <p>
                New memorization: <strong>{weeklyNew} pages/week</strong>
              </p>
              <p>
                Estimated finish: <strong>{estWeeks} weeks</strong>
              </p>
              <p>
                Recent revision: <strong>frequent rotation of recent pages</strong>
              </p>
              <p>
                Older revision: <strong>{state.olderRevisionPagesPerDay} pages/day</strong>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 text-base dark:border-slate-700 md:col-span-2">
            <p className="font-bold text-slate-900 dark:text-white">How the revision logic works</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-6 text-slate-700 dark:text-slate-200">
              <li>New memorization moves forward page by page from your chosen starting point.</li>
              <li>Recent revision focuses on the pages you have memorized most recently and rotates them frequently while they are still fresh.</li>
              <li>Older revision maintains established memorization in manageable portions. As newer pages move out of the recent pool, they join this maintenance pool automatically.</li>
              <li>The revision settings are a planning guide, not a fixed Hifz methodology. Adjust the load to what the student can maintain consistently.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-5 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 text-base">
            <div>
              <span className="font-bold">Progress</span>
              <span className="ml-2 text-slate-100 dark:text-white">
                {doneDays} of {totalDays} days completed
              </span>
            </div>
            <span className="font-bold">{progressPct}%</span>
          </div>
          <div
            className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
            aria-label={`Hifz planner progress: ${progressPct}%`}
          >
            <div
              className="h-full rounded-full bg-slate-900 transition-all dark:bg-white"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {hydrated ? "Saved automatically on this device." : "Loading your saved plan..."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={clearChecks}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          Clear Completed Checks
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Reset Planner
        </button>
        <a
          href="mailto:support@ommsulaim.com?subject=Qur%E2%80%99an%20Planner%20Feedback"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          Send Feedback
        </a>
      </div>

      <div className="space-y-6">
        {schedule.map((week) => (
          <div
            key={week.week}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-lg font-bold">Week {week.week}</h3>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">7-day plan</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full table-fixed text-base">
                <colgroup>
                  <col className="w-[9%]" />
                  <col className="w-[11%]" />
                  <col className="w-[26%]" />
                  <col className="w-[27%]" />
                  <col className="w-[27%]" />
                </colgroup>
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="px-5 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Done</th>
                    <th className="px-5 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Day</th>
                    <th className="px-5 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">New Memorization</th>
                    <th className="px-5 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Recent Revision</th>
                    <th className="px-5 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Older Revision</th>
                  </tr>
                </thead>
                <tbody>
                  {week.days.map((d, idx) => {
                    const key = `${week.week}-${idx}`;
                    const checked = !!state.completed[key];
                    const dayIndex = orderedDayKeys.indexOf(key);
                    const previousKey =
                      dayIndex > 0 ? orderedDayKeys[dayIndex - 1] : undefined;
                    const canCheck =
                      dayIndex === 0 ||
                      (!!previousKey && !!state.completed[previousKey]);

                    return (
                      <tr
                        key={key}
                        className={`border-b border-slate-200 last:border-0 dark:border-slate-700 ${
                          checked ? "bg-slate-50 dark:bg-slate-800/60" : ""
                        }`}
                      >
                        <td className="px-5 py-5 align-top">
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!checked && !canCheck}
                            onChange={(e) => toggleDone(key, e.target.checked)}
                            aria-label={`Mark Week ${week.week} ${d.dayLabel} complete`}
                            className="h-5 w-5 rounded"
                          />
                        </td>
                        <td className="px-5 py-5 align-top font-bold text-slate-800 dark:text-slate-800">{d.dayLabel}</td>
                        <td className="px-5 py-5 align-top font-medium leading-7 text-slate-800 dark:text-slate-800">{d.newMemorization}</td>
                        <td className="px-5 py-5 align-top font-medium leading-7 text-slate-800 dark:text-slate-800">{d.newRevision}</td>
                        <td className="px-5 py-5 align-top font-medium leading-7 text-slate-800 dark:text-slate-800">{d.oldRevision}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              On a smaller screen, swipe horizontally to see the full schedule.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
