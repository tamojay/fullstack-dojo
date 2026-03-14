import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./UserMenu.css";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

export function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="user-menu__trigger" aria-label="Open account menu">
          {user.avatarUrl ? (
            <img
              className="user-menu__avatar"
              src={user.avatarUrl}
              alt={user.name}
            />
          ) : (
            <span className="user-menu__initials" aria-hidden="true">
              {getInitials(user.name)}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="user-menu__content"
          align="end"
          sideOffset={8}
        >
          {/* Profile info */}
          <div className="user-menu__profile">
            <span className="user-menu__profile-name">{user.name}</span>
            <span className="user-menu__profile-email">{user.email}</span>
          </div>

          <DropdownMenu.Separator className="user-menu__separator" />

          <DropdownMenu.Item
            className="user-menu__item user-menu__item--muted"
            disabled
          >
            <User size={14} />
            Profile (coming soon)
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="user-menu__separator" />

          <DropdownMenu.Item
            className="user-menu__item user-menu__item--danger"
            onSelect={signOut}
          >
            <LogOut size={14} />
            Sign out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="user-menu__arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
