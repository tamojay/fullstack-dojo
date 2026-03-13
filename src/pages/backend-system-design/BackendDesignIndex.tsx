import { sections } from "../../data/sections";
import { backendSystemDesignTopics } from "../../data/backend-system-design";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./BackendDesignIndex.css";

const section = sections.find((s) => s.id === "backend-system-design")!;

export function BackendDesignIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = backendSystemDesignTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="backend-design-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {backendSystemDesignTopics.length === 0 ? (
        <div className="backend-design-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/backend-system-design.ts to add content.</code>
        </div>
      ) : (
        <div className="backend-design-index__grid">
          {backendSystemDesignTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/backend-system-design/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
