import type { ReactNode } from "react";
import { ProgressContext, useProgressState } from "../hooks/useProgress";

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const value = useProgressState();
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
