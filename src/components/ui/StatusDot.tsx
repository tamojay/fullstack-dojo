import * as Tooltip from "@radix-ui/react-tooltip";
import type { ProblemStatus } from "../../types";
import "./StatusDot.css";

interface StatusDotProps {
  status: ProblemStatus;
  onClick: () => void;
}

const statusLabels: Record<ProblemStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

export function StatusDot({ status, onClick }: StatusDotProps) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className={`status-dot status-dot--${status}`}
            onClick={onClick}
            aria-label={`Status: ${statusLabels[status]}. Click to change.`}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="status-dot__tooltip" sideOffset={6}>
            {statusLabels[status]}
            <Tooltip.Arrow className="status-dot__tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
