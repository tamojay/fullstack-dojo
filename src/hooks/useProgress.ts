import { createContext, useContext, useState, useCallback } from "react";
import type { ProblemStatus } from "../types";

const STORAGE_KEY = "fullstack-dojo-progress";

type ProgressMap = Record<string, ProblemStatus>;

function loadFromStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveToStorage(map: ProgressMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

const STATUS_CYCLE: ProblemStatus[] = ["todo", "in-progress", "done"];

export interface ProgressContextValue {
  getStatus: (problemId: string) => ProblemStatus;
  setStatus: (problemId: string, status: ProblemStatus) => void;
  cycleStatus: (problemId: string) => void;
  getTopicProgress: (problemIds: string[]) => {
    total: number;
    done: number;
    inProgress: number;
    percentage: number;
  };
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgressState(): ProgressContextValue {
  const [progressMap, setProgressMap] = useState<ProgressMap>(loadFromStorage);

  const getStatus = useCallback(
    (problemId: string): ProblemStatus => {
      return progressMap[problemId] ?? "todo";
    },
    [progressMap],
  );

  const setStatus = useCallback((problemId: string, status: ProblemStatus) => {
    setProgressMap((prev) => {
      const next = { ...prev, [problemId]: status };
      saveToStorage(next);
      return next;
    });
  }, []);

  const cycleStatus = useCallback((problemId: string) => {
    setProgressMap((prev) => {
      const current = prev[problemId] ?? "todo";
      const idx = STATUS_CYCLE.indexOf(current);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]!;
      const updated = { ...prev, [problemId]: next };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const getTopicProgress = useCallback(
    (problemIds: string[]) => {
      const total = problemIds.length;
      const done = problemIds.filter((id) => progressMap[id] === "done").length;
      const inProgress = problemIds.filter(
        (id) => progressMap[id] === "in-progress",
      ).length;
      const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
      return { total, done, inProgress, percentage };
    },
    [progressMap],
  );

  return { getStatus, setStatus, cycleStatus, getTopicProgress };
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
