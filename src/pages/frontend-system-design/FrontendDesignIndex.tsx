import { sections } from "../../data/sections";
import { frontendSystemDesignTopics } from "../../data/frontend-system-design";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./FrontendDesignIndex.css";

const section = sections.find((s) => s.id === "frontend-system-design")!;

export function FrontendDesignIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = frontendSystemDesignTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="frontend-design-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {frontendSystemDesignTopics.length === 0 ? (
        <div className="frontend-design-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/frontend-system-design.ts to add content.</code>
        </div>
      ) : (
        <div className="frontend-design-index__grid">
          {frontendSystemDesignTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/frontend-system-design/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
