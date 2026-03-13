import { ExternalLink } from "lucide-react";
import type { Problem, ProblemStatus } from "../../types";
import { StatusDot } from "./StatusDot";
import { DifficultyBadge } from "./DifficultyBadge";
import { Tag } from "./Tag";
import "./ProblemRow.css";

interface ProblemRowProps {
  problem: Problem;
  status: ProblemStatus;
  onCycleStatus: () => void;
}

export function ProblemRow({ problem, status, onCycleStatus }: ProblemRowProps) {
  return (
    <div className={`problem-row problem-row--${status}`}>
      <StatusDot status={status} onClick={onCycleStatus} />
      <div className="problem-row__center">
        <span className="problem-row__title">{problem.title}</span>
        <div className="problem-row__meta">
          <DifficultyBadge difficulty={problem.difficulty} />
          <div className="problem-row__tags">
            {problem.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
      {problem.link && (
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="problem-row__link"
          aria-label={`Open ${problem.title} on LeetCode`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
