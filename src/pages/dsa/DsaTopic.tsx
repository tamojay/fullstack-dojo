import { useParams, Link } from "react-router-dom";
import * as RadixProgress from "@radix-ui/react-progress";
import * as icons from "lucide-react";
import { dsaTopics } from "../../data/dsa";
import { sections } from "../../data/sections";
import { useProgress } from "../../hooks/useProgress";
import { ProblemRow } from "../../components/ui/ProblemRow";
import "./DsaTopic.css";

const dsaSection = sections.find((s) => s.id === "dsa")!;

function getIcon(name: string, size = 20) {
  const Icon = icons[name as keyof typeof icons] as React.ComponentType<{ size: number }>;
  return Icon ? <Icon size={size} /> : null;
}

export function DsaTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const { getStatus, cycleStatus, getTopicProgress } = useProgress();

  const topic = dsaTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="dsa-topic__not-found">
        <p>Topic not found.</p>
        <Link to="/dsa" className="dsa-topic__back-link">
          ← Back to DSA
        </Link>
      </div>
    );
  }

  const problemIds = topic.problems.map((p) => p.id);
  const { done, total, percentage } = getTopicProgress(problemIds);

  return (
    <div className="dsa-topic">
      <div className="dsa-topic__breadcrumb">
        <Link to="/dsa" className="dsa-topic__back-link">
          ← DSA
        </Link>
      </div>

      <header
        className="dsa-topic__header"
        style={{ "--section-color": dsaSection.accent } as React.CSSProperties}
      >
        <div className="dsa-topic__header-top">
          <span className="dsa-topic__icon">{getIcon(topic.icon)}</span>
          <div>
            <h1 className="dsa-topic__title">{topic.title}</h1>
            <p className="dsa-topic__description">{topic.description}</p>
          </div>
        </div>
        <div className="dsa-topic__progress-bar">
          <span className="dsa-topic__progress-label">
            {done} / {total} completed
          </span>
          <RadixProgress.Root
            className="dsa-topic__radix-progress"
            value={percentage}
            aria-label={`${percentage}% complete`}
          >
            <RadixProgress.Indicator
              className="dsa-topic__radix-indicator"
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          </RadixProgress.Root>
        </div>
      </header>

      <div className="dsa-topic__list">
        {topic.problems.map((problem) => (
          <ProblemRow
            key={problem.id}
            problem={problem}
            status={getStatus(problem.id)}
            onCycleStatus={() => cycleStatus(problem.id)}
          />
        ))}
      </div>
    </div>
  );
}
