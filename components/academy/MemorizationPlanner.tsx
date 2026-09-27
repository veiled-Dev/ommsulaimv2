"use client";

import { useEffect, useMemo, useState } from "react";
import { buildWeeklySchedule } from "@/lib/memorization/schedule";

type PlannerState = {
  totalPages: number;
  startingPage: number;
  oldMemorizedPages: number;
  pagesPerDayNew: number;
  weeks: number;
  completed: Record<string, boolean>;
};

const STORAGE_KEY = "ommsulaim:quran-planner:v1";

const DEFAULT_STATE: PlannerState = {
  totalPages: 604,
  startingPage: 1,
  oldMemorizedPages: 0,
  pagesPerDayNew: 1,
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

      const parsed = JSON.parse(raw) as Partial<PlannerState> & { updatedAt?: string };

      setState({
        totalPages: Math.max(1, toNumber(parsed.totalPages, DEFAULT_STATE.totalPages)),
        startingPage: Math.max(1, toNumber(parsed.startingPage, DEFAULT_STATE.startingPage)),
        oldMemorizedPages: Math.max(0, toNumber(parsed.oldMemorizedPages, DEFAULT_STATE.oldMemorizedPages)),
        pagesPerDayNew: Math.max(1, toNumber(parsed.pagesPerDayNew, DEFAULT_STATE.pagesPerDayNew)),
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
        weeks: state.weeks,
      }),
    [state.totalPages, state.startingPage, state.oldMemorizedPages, state.pagesPerDayNew, state.weeks]
  );

  const weeklyNew = state.pagesPerDayNew * 7;
  const remaining = Math.max(0, state.totalPages - state.startingPage + 1);
  const estWeeks = weeklyNew > 0 ? Math.ceil(remaining / weeklyNew) : 0;

  const totalDays = schedule.reduce((acc, w) => acc + w.days.length, 0);
  const doneDays = Object.values(state.completed).filter(Boolean).length;
  const progressPct = totalDays === 0 ? 0 : Math.min(100, Math.round((doneDays / totalDays) * 100));

  const orderedDayKeys = useMemo(() => {
    const keys: string[] = [];
    schedule.forEach((week) => {
      week.days.forEach((_, idx) => {
        keys.push(`${week.week}-${idx}`);
      });
    });
    return keys;
  }, [schedule]);

  const setNumeric = (key: keyof Omit<PlannerState, "completed">, value: number) => {
    setState((prev) => {
      const safeValue = Number.isFinite(value) ? Math.max(1, Math.floor(value)) : prev[key];
      if (safeValue === prev[key]) return prev;

      return {
        ...prev,
        [key]: safeValue,
        completed: {},
      };
    });
  };

  const setOldMemorizedPages = (value: number) => {
    setState((prev) => {
      const safeValue = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : prev.oldMemorizedPages;
      if (safeValue === prev.oldMemorizedPages) return prev;

      return {
        ...prev,
        oldMemorizedPages: safeValue,
        completed: {},
      };
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
              <h2 className="text-xl font-bold">Build your Hifz plan</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Adjust the numbers below and your weekly schedule will update automatically.
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changing a setting starts a fresh checklist.
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Total Qur’an pages</span>
            <input
              type="number"
              min={1}
              value={state.totalPages}
              onChange={(e) => setNumeric("totalPages", Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              A standard Madinah Mushaf is often planned as 604 pages. Change this if your Mushaf differs.
            </span>
          </label>

          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Starting page for new Hifz</span>
            <input
              type="number"
              min={1}
              max={state.totalPages + 1}
              value={state.startingPage}
              onChange={(e) => setNumeric("startingPage", Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              Enter the page where you will begin your next new memorization.
            </span>
          </label>

          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Pages already memorized</span>
            <input
              type="number"
              min={0}
              max={state.totalPages}
              value={state.oldMemorizedPages}
              onChange={(e) => setOldMemorizedPages(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              These pages form the pool for your older revision cycle.
            </span>
          </label>

          <label className="text-sm">
            <span className="mb-1.5 block font-medium">New pages per day</span>
            <input
              type="number"
              min={1}
              value={state.pagesPerDayNew}
              onChange={(e) => setNumeric("pagesPerDayNew", Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              This also sets the daily amount used in the recent 10-day revision circle.
            </span>
          </label>

          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Weeks to generate</span>
            <input
              type="number"
              min={1}
              max={52}
              value={state.weeks}
              onChange={(e) => setNumeric("weeks", Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-300 dark:focus:ring-slate-700"
            />
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              Generate up to 52 weeks at a time.
            </span>
          </label>

          <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/80">
            <p className="font-semibold">Your plan at a glance</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <p>New memorization: <strong>{weeklyNew} pages/week</strong></p>
              <p>Estimated finish: <strong>{estWeeks} weeks</strong></p>
              <p>Recent revision: <strong>10-day circle</strong></p>
              <p>Older revision: <strong>7-day cycle</strong></p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div>
              <span className="font-semibold">Progress</span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">{doneDays} of {totalDays} days completed</span>
            </div>
            <span className="font-semibold">{progressPct}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-label={`Hifz planner progress: ${progressPct}%`}>
            <div
              className="h-full rounded-full bg-slate-900 transition-all dark:bg-white"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {hydrated ? "Saved automatically on this device." : "Loading your saved plan..."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={clearChecks}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          Clear Completed Checks
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Reset Planner
        </button>
        <a
          href="mailto:support@ommsulaim.com?subject=Qur%E2%80%99an%20Planner%20Feedback"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          Send Feedback
        </a>
      </div>

      <div className="space-y-6">
        {schedule.map((week) => (
          <div key={week.week} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="font-semibold">Week {week.week}</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">7-day plan</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-sm">
                <thead className="bg-white dark:bg-slate-900">
                  <tr className="border-b border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    <th className="px-4 py-3 text-left font-semibold">Done</th>
                    <th className="px-4 py-3 text-left font-semibold">Day</th>
                    <th className="px-4 py-3 text-left font-semibold">New Memorization</th>
                    <th className="px-4 py-3 text-left font-semibold">Recent Revision</th>
                    <th className="px-4 py-3 text-left font-semibold">Older Revision</th>
                  </tr>
                </thead>
                <tbody>
                  {week.days.map((d, idx) => {
                    const key = `${week.week}-${idx}`;
                    const checked = !!state.completed[key];
                    const dayIndex = orderedDayKeys.indexOf(key);
                    const previousKey = dayIndex > 0 ? orderedDayKeys[dayIndex - 1] : undefined;
                    const canCheck = dayIndex === 0 || (!!previousKey && !!state.completed[previousKey]);

                    return (
                      <tr
                        key={key}
                        className={`border-b last:border-0 dark:border-slate-700 ${checked ? "bg-slate-50 dark:bg-slate-800/60" : ""}`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!checked && !canCheck}
                            onChange={(e) => toggleDone(key, e.target.checked)}
                            aria-label={`Mark Week ${week.week} ${d.dayLabel} complete`}
                            className="h-4 w-4"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">{d.dayLabel}</td>
                        <td className="px-4 py-3">{d.newMemorization}</td>
                        <td className="px-4 py-3">{d.newRevision}</td>
                        <td className="px-4 py-3">{d.oldRevision}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}