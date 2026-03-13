import type { Difficulty } from "../../types";
import "./DifficultyBadge.css";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const labels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className={`difficulty-badge difficulty-badge--${difficulty}`}>
      {labels[difficulty]}
    </span>
  );
}
