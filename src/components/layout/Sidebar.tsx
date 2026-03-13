import { NavLink } from "react-router-dom";
import * as icons from "lucide-react";
import { sections } from "../../data/sections";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function getIcon(name: string, size = 16) {
  const Icon = icons[name as keyof typeof icons] as React.ComponentType<{
    size: number;
  }>;
  return Icon ? <Icon size={size} /> : null;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
      aria-label="Main navigation"
    >
      <div className="sidebar__header">
        <NavLink to="/" className="sidebar__logo" onClick={onClose}>
          <span className="sidebar__logo-icon">⚡</span>
          <span className="sidebar__logo-text">fullstack-dojo</span>
        </NavLink>
      </div>

      <nav className="sidebar__nav">
        {sections.map((section) => (
          <NavLink
            key={section.id}
            to={section.path}
            className={({ isActive }) =>
              `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
            }
            style={
              {
                "--section-accent": section.accent,
              } as React.CSSProperties
            }
            onClick={onClose}
          >
            <span className="sidebar__item-icon">{getIcon(section.icon)}</span>
            <span className="sidebar__item-label">{section.shortTitle}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__version">v0.1.1</span>
      </div>
    </aside>
  );
}
