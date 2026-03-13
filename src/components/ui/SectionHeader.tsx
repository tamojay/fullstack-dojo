import * as icons from "lucide-react";
import type { SectionMeta } from "../../types";
import "./SectionHeader.css";

interface SectionHeaderProps {
  section: SectionMeta;
  totalProblems: number;
  doneCount: number;
}

function getIcon(name: string, size = 24) {
  const Icon = icons[name as keyof typeof icons] as React.ComponentType<{ size: number }>;
  return Icon ? <Icon size={size} /> : null;
}

export function SectionHeader({ section, totalProblems, doneCount }: SectionHeaderProps) {
  const percentage = totalProblems === 0 ? 0 : Math.round((doneCount / totalProblems) * 100);

  return (
    <header
      className="section-header"
      style={{ "--section-color": section.accent } as React.CSSProperties}
    >
      <div className="section-header__top">
        <span className="section-header__icon">{getIcon(section.icon)}</span>
        <div className="section-header__text">
          <h1 className="section-header__title">{section.title}</h1>
          <p className="section-header__description">{section.description}</p>
        </div>
      </div>
      <div className="section-header__stats">
        <span className="section-header__count">
          {doneCount} / {totalProblems} completed
        </span>
        <div className="section-header__bar-track">
          <div
            className="section-header__bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </header>
  );
}
