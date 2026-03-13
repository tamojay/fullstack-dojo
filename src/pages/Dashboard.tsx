import { useNavigate } from "react-router-dom";
import * as icons from "lucide-react";
import { sections } from "../data/sections";
import { dsaTopics } from "../data/dsa";
import { advancedDsaTopics } from "../data/advanced-dsa";
import { jsFundamentalsTopics } from "../data/js-fundamentals";
import { reactWebTopics } from "../data/react-web";
import { frontendCodingTopics } from "../data/frontend-coding";
import { frontendSystemDesignTopics } from "../data/frontend-system-design";
import { backendSystemDesignTopics } from "../data/backend-system-design";
import { useProgress } from "../hooks/useProgress";
import { ProgressRing } from "../components/ui/ProgressRing";
import type { SectionId, Topic } from "../types";
import "./Dashboard.css";

const topicsBySectionId: Record<SectionId, Topic[]> = {
  dsa: dsaTopics,
  "advanced-dsa": advancedDsaTopics,
  "js-fundamentals": jsFundamentalsTopics,
  "react-web": reactWebTopics,
  "frontend-coding": frontendCodingTopics,
  "frontend-system-design": frontendSystemDesignTopics,
  "backend-system-design": backendSystemDesignTopics,
};

function getIcon(name: string, size = 22) {
  const Icon = icons[name as keyof typeof icons] as React.ComponentType<{
    size: number;
  }>;
  return Icon ? <Icon size={size} /> : null;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { getTopicProgress } = useProgress();

  return (
    <div className="dashboard">
      <div className="dashboard__hero">
        <h1 className="dashboard__title">fullstack-dojo</h1>
        <p className="dashboard__subtitle">
          Your interview prep command center
        </p>
      </div>

      <div className="dashboard__grid">
        {sections.map((section) => {
          const topics = topicsBySectionId[section.id];
          const allProblemIds = topics.flatMap((t) =>
            t.problems.map((p) => p.id),
          );
          const { total, done, percentage } = getTopicProgress(allProblemIds);

          return (
            <button
              key={section.id}
              className="dashboard__card"
              style={{ "--card-accent": section.accent } as React.CSSProperties}
              onClick={() => navigate(section.path)}
              aria-label={`Go to ${section.title}`}
            >
              <div className="dashboard__card-header">
                <span className="dashboard__card-icon">
                  {getIcon(section.icon)}
                </span>
                <ProgressRing
                  percentage={percentage}
                  size={44}
                  strokeWidth={3}
                  color={section.accent}
                />
              </div>
              <h2 className="dashboard__card-title">{section.title}</h2>
              <p className="dashboard__card-description">
                {section.description}
              </p>
              <div className="dashboard__card-footer">
                <span className="dashboard__card-stats">
                  {done} / {total} problems done
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
