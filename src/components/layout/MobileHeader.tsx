import { Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import "./MobileHeader.css";

interface MobileHeaderProps {
  onToggleSidebar: () => void;
}

export function MobileHeader({ onToggleSidebar }: MobileHeaderProps) {
  return (
    <header className="mobile-header" aria-label="Mobile navigation">
      <button
        className="mobile-header__hamburger"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <Menu size={20} />
      </button>
      <span className="mobile-header__title">⚡ fullstack-dojo</span>
      <div className="mobile-header__actions">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
