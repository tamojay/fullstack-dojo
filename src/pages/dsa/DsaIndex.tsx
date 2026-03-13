import { sections } from "../../data/sections";
import { dsaTopics } from "../../data/dsa";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./DsaIndex.css";

const dsaSection = sections.find((s) => s.id === "dsa")!;

export function DsaIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = dsaTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="dsa-index">
      <SectionHeader
        section={dsaSection}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      <div className="dsa-index__grid">
        {dsaTopics.map((topic) => {
          const problemIds = topic.problems.map((p) => p.id);
          const progress = getTopicProgress(problemIds);
          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              sectionAccent={dsaSection.accent}
              progress={progress}
              linkTo={`/dsa/${topic.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
