import { sections } from "../../data/sections";
import { advancedDsaTopics } from "../../data/advanced-dsa";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./AdvancedDsaIndex.css";

const section = sections.find((s) => s.id === "advanced-dsa")!;

export function AdvancedDsaIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = advancedDsaTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="advanced-dsa-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {advancedDsaTopics.length === 0 ? (
        <div className="advanced-dsa-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/advanced-dsa.ts to add content.</code>
        </div>
      ) : (
        <div className="advanced-dsa-index__grid">
          {advancedDsaTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/advanced-dsa/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
