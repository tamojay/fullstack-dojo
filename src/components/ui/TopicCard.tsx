import { Link } from "react-router-dom";
import * as icons from "lucide-react";
import type { Topic } from "../../types";
import { ProgressRing } from "./ProgressRing";
import "./TopicCard.css";

interface TopicCardProps {
  topic: Topic;
  sectionAccent: string;
  progress: { done: number; total: number; percentage: number };
  linkTo: string;
}

function getIcon(name: string, size = 20) {
  const Icon = icons[name as keyof typeof icons] as React.ComponentType<{ size: number }>;
  return Icon ? <Icon size={size} /> : null;
}

export function TopicCard({ topic, sectionAccent, progress, linkTo }: TopicCardProps) {
  return (
    <Link
      to={linkTo}
      className="topic-card"
      style={{ "--card-accent": sectionAccent } as React.CSSProperties}
    >
      <div className="topic-card__header">
        <span className="topic-card__icon">{getIcon(topic.icon)}</span>
        <ProgressRing
          percentage={progress.percentage}
          size={40}
          strokeWidth={3}
          color={sectionAccent}
        />
      </div>
      <h3 className="topic-card__title">{topic.title}</h3>
      <p className="topic-card__description">{topic.description}</p>
      <div className="topic-card__footer">
        <span className="topic-card__count">
          {progress.done}/{progress.total} done
        </span>
      </div>
    </Link>
  );
}
