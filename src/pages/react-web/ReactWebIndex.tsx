import { sections } from "../../data/sections";
import { reactWebTopics } from "../../data/react-web";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./ReactWebIndex.css";

const section = sections.find((s) => s.id === "react-web")!;

export function ReactWebIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = reactWebTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="react-web-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {reactWebTopics.length === 0 ? (
        <div className="react-web-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/react-web.ts to add content.</code>
        </div>
      ) : (
        <div className="react-web-index__grid">
          {reactWebTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/react-web/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
