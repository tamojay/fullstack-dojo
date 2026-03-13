import { sections } from "../../data/sections";
import { frontendCodingTopics } from "../../data/frontend-coding";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./FrontendCodingIndex.css";

const section = sections.find((s) => s.id === "frontend-coding")!;

export function FrontendCodingIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = frontendCodingTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="frontend-coding-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {frontendCodingTopics.length === 0 ? (
        <div className="frontend-coding-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/frontend-coding.ts to add content.</code>
        </div>
      ) : (
        <div className="frontend-coding-index__grid">
          {frontendCodingTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/frontend-coding/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
