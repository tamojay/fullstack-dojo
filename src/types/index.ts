export type SectionId =
  | "dsa"
  | "advanced-dsa"
  | "js-fundamentals"
  | "react-web"
  | "frontend-coding"
  | "frontend-system-design"
  | "backend-system-design";

export type Difficulty = "easy" | "medium" | "hard";
export type ProblemStatus = "todo" | "in-progress" | "done";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  link?: string;
  approach?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  code?: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  problems: Problem[];
  section: SectionId;
}

export interface SectionMeta {
  id: SectionId;
  title: string;
  shortTitle: string;
  icon: string;
  accent: string;
  path: string;
  description: string;
}
