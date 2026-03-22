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

  // Load saved progress once
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
        weeks: Math.max(1, toNumber(parsed.weeks, DEFAULT_STATE.weeks)),
        completed: parsed.completed ?? {},
      });

      if (parsed.updatedAt) setLastSaved(parsed.updatedAt);
    } catch {
      // ignore bad saved payload
    } finally {
      setHydrated(true);
    }
  }, []);

  // Auto-save on every change
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
  const progressPct = totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100);

  const setNumeric = (key: keyof PlannerState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDone = (key: string, checked: boolean) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [key]: checked },
    }));
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
      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-2 dark:border-slate-700 dark:bg-slate-900">
        <label className="text-sm">
          <span className="mb-1 block font-medium">Total Qur’an pages</span>
          <input
            type="number"
            min={1}
            value={state.totalPages}
            onChange={(e) => setNumeric("totalPages", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">Starting page (new hifz)</span>
          <input
            type="number"
            min={1}
            max={state.totalPages + 1}
            value={state.startingPage}
            onChange={(e) => setNumeric("startingPage", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">Old memorized pages</span>
          <input
            type="number"
            min={0}
            max={state.totalPages}
            value={state.oldMemorizedPages}
            onChange={(e) => setNumeric("oldMemorizedPages", Math.max(0, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">New pages per day</span>
          <input
            type="number"
            min={1}
            value={state.pagesPerDayNew}
            onChange={(e) => setNumeric("pagesPerDayNew", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">Weeks to generate</span>
          <input
            type="number"
            min={1}
            max={52}
            value={state.weeks}
            onChange={(e) => setNumeric("weeks", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-slate-800 dark:text-slate-200">
          <p>Weekly new memorization: <strong>{weeklyNew}</strong> pages</p>
          <p>Estimated weeks to finish: <strong>{estWeeks}</strong></p>
          <p>New revision cycle: <strong>last 10 days (circular)</strong></p>
          <p>Old revision cycle: <strong>completed every 7 days</strong></p>
          <p>Progress: <strong>{doneDays}/{totalDays}</strong> days ({progressPct}%)</p>
          <p className="mt-1 text-xs text-gray-500">
            {hydrated ? "Auto-saved locally." : "Loading saved progress..."}
            {lastSaved ? ` Last save: ${new Date(lastSaved).toLocaleString()}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={clearChecks}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
        >
          Clear Completed Checks
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Reset Planner
        </button>
      </div>

      <div className="space-y-6">
        {schedule.map((week) => (
          <div key={week.week} className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="bg-gray-50 px-4 py-2 text-sm font-semibold dark:bg-slate-800 dark:text-slate-100">Week {week.week}</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white dark:bg-slate-900">
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Done</th>
                    <th className="px-4 py-2 text-left">Day</th>
                    <th className="px-4 py-2 text-left">New Memorization</th>
                    <th className="px-4 py-2 text-left">New Revision (10-day circle)</th>
                    <th className="px-4 py-2 text-left">Old Revision (7-day cycle)</th>
                  </tr>
                </thead>
                <tbody>
                  {week.days.map((d, idx) => {
                    const key = `${week.week}-${idx}`;
                    const checked = !!state.completed[key];
                    return (
                      <tr key={key} className="border-b last:border-0 dark:border-slate-700">
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => toggleDone(key, e.target.checked)}
                          />
                        </td>
                        <td className="px-4 py-2 font-medium">{d.dayLabel}</td>
                        <td className="px-4 py-2">{d.newMemorization}</td>
                        <td className="px-4 py-2">{d.newRevision}</td>
                        <td className="px-4 py-2">{d.oldRevision}</td>
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