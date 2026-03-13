import { sections } from "../../data/sections";
import { jsFundamentalsTopics } from "../../data/js-fundamentals";
import { useProgress } from "../../hooks/useProgress";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { TopicCard } from "../../components/ui/TopicCard";
import "./JsFundamentalsIndex.css";

const section = sections.find((s) => s.id === "js-fundamentals")!;

export function JsFundamentalsIndex() {
  const { getTopicProgress } = useProgress();

  const allProblemIds = jsFundamentalsTopics.flatMap((t) => t.problems.map((p) => p.id));
  const { done } = getTopicProgress(allProblemIds);

  return (
    <div className="js-fundamentals-index">
      <SectionHeader
        section={section}
        totalProblems={allProblemIds.length}
        doneCount={done}
      />
      {jsFundamentalsTopics.length === 0 ? (
        <div className="js-fundamentals-index__empty">
          <p>No topics added yet.</p>
          <code>Edit src/data/js-fundamentals.ts to add content.</code>
        </div>
      ) : (
        <div className="js-fundamentals-index__grid">
          {jsFundamentalsTopics.map((topic) => {
            const problemIds = topic.problems.map((p) => p.id);
            const progress = getTopicProgress(problemIds);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionAccent={section.accent}
                progress={progress}
                linkTo={`/js-fundamentals/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
