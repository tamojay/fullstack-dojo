# CLAUDE.md — fullstack-dojo

## Project Overview

**fullstack-dojo** is a single-page interview preparation dashboard. It is a personal study tracker covering 7 sections: DSA, Advanced DSA, JS Fundamentals, React & Web Fundamentals, Frontend Machine Coding, Frontend System Design, and Backend System Design. The user will add all question content and data themselves — the app's job is to provide the shell, navigation, layout, and UI patterns.

---

## Tech Stack (strict — do not deviate)

| Layer         | Choice                                                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | **React 19**                                                                                                                                                                                                                                       |
| Build         | **Vite 6** (use `npm create vite@latest fullstack-dojo -- --template react-ts`)                                                                                                                                                                    |
| Language      | **TypeScript 5** (strict mode)                                                                                                                                                                                                                     |
| UI Primitives | **Radix UI** — use `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, `@radix-ui/react-scroll-area`, `@radix-ui/react-progress`, `@radix-ui/react-collapsible`, `@radix-ui/react-separator` |
| Routing       | **React Router v6** — `react-router-dom@6`, use `HashRouter` for static deploy compatibility                                                                                                                                                       |
| Icons         | **Lucide React** — `lucide-react`                                                                                                                                                                                                                  |
| State         | **Local state first** (`useState`, `useReducer`). Use `localStorage` for persisting progress. **Do NOT install Redux Toolkit** unless I explicitly ask for it.                                                                                     |
| Styling       | **Vanilla CSS** with CSS custom properties. No Tailwind, no CSS-in-JS, no Sass. One `.css` file co-located per component.                                                                                                                          |

### Install command

```bash
npm create vite@latest fullstack-dojo -- --template react-ts
cd fullstack-dojo
npm install @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-scroll-area @radix-ui/react-progress @radix-ui/react-collapsible @radix-ui/react-separator react-router-dom@6 lucide-react
```

---

## Design System

### Theme: Dark terminal aesthetic

Think VS Code meets a hacker dashboard — dark backgrounds, neon accents, monospace touches, sharp corners on data, rounded corners on cards.

### Fonts (load via Google Fonts CDN in `index.html`)

- **Code / mono**: `'JetBrains Mono', monospace`
- **UI / sans**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

### CSS Custom Properties (define in `:root` in `src/styles/global.css`)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-tertiary: #1a1a2e;
  --bg-hover: #22223a;

  /* Text */
  --text-primary: #e0e0e8;
  --text-secondary: #7878a0;
  --text-muted: #50506a;

  /* Section accents — each section gets a signature color */
  --accent-green: #00ff88; /* DSA */
  --accent-purple: #aa66ff; /* Advanced DSA, Backend System Design */
  --accent-orange: #ff8844; /* JS Fundamentals */
  --accent-blue: #4488ff; /* React/Web, Frontend System Design */
  --accent-cyan: #00ddff; /* Frontend Machine Coding */
  --accent-red: #ff4466; /* Hard difficulty badge */

  /* Borders & Radius */
  --border: #1e1e30;
  --border-light: #2a2a40;
  --radius: 8px;
  --radius-lg: 12px;
  --radius-sm: 6px;

  /* Layout */
  --sidebar-width: 260px;

  /* Fonts */
  --font-mono: "JetBrains Mono", monospace;
  --font-ui: "Inter", -apple-system, sans-serif;

  /* Shadows */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-glow-green: 0 0 20px rgba(0, 255, 136, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

### Responsive breakpoints

- **Desktop**: >= 768px — sidebar visible, grid layouts
- **Mobile**: < 768px — sidebar is a slide-out drawer triggered by hamburger button, single column
- Use **mobile-first CSS**: base styles are mobile, use `@media (min-width: 768px) {}` to layer desktop styles

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx          # Main layout wrapper: sidebar + content area
│   │   ├── AppShell.css
│   │   ├── Sidebar.tsx           # Left sidebar navigation
│   │   ├── Sidebar.css
│   │   ├── MobileHeader.tsx      # Mobile-only top bar with hamburger + title
│   │   └── MobileHeader.css
│   │
│   ├── ui/                       # Reusable UI primitives
│   │   ├── TopicCard.tsx         # Card for a topic (icon, title, description, progress ring)
│   │   ├── TopicCard.css
│   │   ├── ProblemRow.tsx        # Single problem row with status toggle, difficulty badge, external link
│   │   ├── ProblemRow.css
│   │   ├── DifficultyBadge.tsx   # "Easy" / "Medium" / "Hard" pill badge
│   │   ├── DifficultyBadge.css
│   │   ├── ProgressRing.tsx      # SVG circular progress indicator
│   │   ├── ProgressRing.css
│   │   ├── SectionHeader.tsx     # Page header for each section (icon, title, description, stats)
│   │   ├── SectionHeader.css
│   │   ├── StatusDot.tsx         # Colored dot: green=done, orange=in-progress, gray=todo
│   │   ├── StatusDot.css
│   │   ├── Tag.tsx               # Small pill for tags like "hashmap", "dfs"
│   │   └── Tag.css
│   │
│   └── dsa/                      # (Example section-specific components if needed later)
│
├── pages/
│   ├── Dashboard.tsx             # Home "/" — overview grid of all 7 sections with progress
│   ├── Dashboard.css
│   ├── dsa/
│   │   ├── DsaIndex.tsx          # "/dsa" — grid of DSA topic cards
│   │   ├── DsaIndex.css
│   │   ├── DsaTopic.tsx          # "/dsa/:topicId" — problem list for one topic
│   │   └── DsaTopic.css
│   ├── advanced-dsa/
│   │   ├── AdvancedDsaIndex.tsx
│   │   └── AdvancedDsaIndex.css
│   ├── js-fundamentals/
│   │   ├── JsFundamentalsIndex.tsx
│   │   └── JsFundamentalsIndex.css
│   ├── react-web/
│   │   ├── ReactWebIndex.tsx
│   │   └── ReactWebIndex.css
│   ├── frontend-coding/
│   │   ├── FrontendCodingIndex.tsx
│   │   └── FrontendCodingIndex.css
│   ├── frontend-system-design/
│   │   ├── FrontendDesignIndex.tsx
│   │   └── FrontendDesignIndex.css
│   └── backend-system-design/
│       ├── BackendDesignIndex.tsx
│       └── BackendDesignIndex.css
│
├── data/
│   ├── sections.ts               # Array of SectionMeta objects (id, title, icon, accent, path)
│   ├── dsa.ts                    # Array of Topic objects for DSA section
│   ├── advanced-dsa.ts           # Placeholder: export empty array, user will fill
│   ├── js-fundamentals.ts        # Placeholder
│   ├── react-web.ts              # Placeholder
│   ├── frontend-coding.ts        # Placeholder
│   ├── frontend-system-design.ts # Placeholder
│   └── backend-system-design.ts  # Placeholder
│
├── types/
│   └── index.ts                  # All shared TypeScript types
│
├── hooks/
│   └── useProgress.ts            # useProgress hook (localStorage persistence)
│
├── styles/
│   └── global.css                # CSS reset, :root variables, scrollbar, focus ring
│
├── App.tsx                       # Router setup with all routes
├── App.css                       # Minimal/empty
└── main.tsx                      # Entry point: HashRouter + App
```

---

## TypeScript Types (`src/types/index.ts`)

```typescript
export type SectionId =
  | "dsa"
  | "advanced-dsa"
  | "js-fundamentals"
  | "react-web"
  | "frontend-coding"
  | "frontend-system-design"
  | "backend-system-design";

export type Difficulty = "easy" | "medium" | "hard";
export type ProblemStatus = "todo" | "in-progress" | "done";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  link?: string; // external URL (LeetCode, etc.)
  approach?: string; // user's notes — plain text or markdown
  timeComplexity?: string;
  spaceComplexity?: string;
  code?: string; // solution code snippet
}

export interface Topic {
  id: string;
  title: string;
  icon: string; // Lucide icon name (e.g., 'LayoutList', 'GitBranch')
  description: string;
  problems: Problem[];
  section: SectionId;
}

export interface SectionMeta {
  id: SectionId;
  title: string;
  shortTitle: string; // abbreviated for sidebar (e.g., 'DSA', 'FE Coding')
  icon: string; // Lucide icon name
  accent: string; // CSS variable reference (e.g., 'var(--accent-green)')
  path: string; // route path (e.g., '/dsa')
  description: string;
}
```

---

## Routing (`src/App.tsx`)

Use React Router v6 with `HashRouter` (wrapped in `main.tsx`).

```
/                              → <Dashboard />
/dsa                           → <DsaIndex />
/dsa/:topicId                  → <DsaTopic />
/advanced-dsa                  → <AdvancedDsaIndex />
/js-fundamentals               → <JsFundamentalsIndex />
/react-web                     → <ReactWebIndex />
/frontend-coding               → <FrontendCodingIndex />
/frontend-system-design        → <FrontendDesignIndex />
/backend-system-design         → <BackendDesignIndex />
```

All routes render inside `<AppShell>` which provides sidebar + content area.

---

## Component Specifications

### AppShell (`components/layout/AppShell.tsx`)

- Wraps the entire app.
- Renders `<Sidebar>` on the left, `<main>` content area on the right.
- On mobile (< 768px), sidebar is hidden by default; toggled by hamburger in `<MobileHeader>`.
- Sidebar state managed with `useState` in AppShell, passed down as props.
- Content area: `margin-left: var(--sidebar-width)` on desktop, `margin-left: 0` on mobile.
- Content area has `padding: 24px 28px` on desktop, `padding: 16px` on mobile.

### Sidebar (`components/layout/Sidebar.tsx`)

- Fixed position, full height, `width: var(--sidebar-width)`.
- Top: logo/app name "⚡ fullstack-dojo" (link to `/`).
- Middle: nav links for all 7 sections. Use `NavLink` from React Router. Active link gets the section's accent color on left border + text color.
- Render Lucide icons dynamically by importing all of `lucide-react` and looking up by name.
- On mobile: add overlay/backdrop when open, slide in from left with `transform: translateX`.
- Bottom: version text "v0.1.1".

### MobileHeader (`components/layout/MobileHeader.tsx`)

- Only visible on mobile (< 768px).
- Fixed top bar with hamburger button (toggles sidebar) and current page title.
- Height ~48px, `background: var(--bg-secondary)`, bottom border.

### Dashboard (`pages/Dashboard.tsx`)

- Route: `/`
- Heading: "fullstack-dojo" + subtitle "Your interview prep command center"
- Grid of 7 section cards. Each card shows: icon, title, description, total problems count, done count, progress ring.
- Cards are clickable, navigate to the section's index page.
- Grid: 1 column on mobile, 2 on tablet, 3 on desktop.
- Each card's border/glow uses the section's accent color on hover.

### TopicCard (`components/ui/TopicCard.tsx`)

- Used inside section index pages to represent a topic (e.g., "Arrays & Hashing").
- Props: `topic: Topic`, `sectionAccent: string`, `progress: { done, total, percentage }`
- Shows: Lucide icon, title, description, problem count, ProgressRing.
- Clickable (wraps in `<Link>`).
- Hover: subtle lift + accent glow.

### ProblemRow (`components/ui/ProblemRow.tsx`)

- Used inside topic pages to show a single problem.
- Props: `problem: Problem`, `status: ProblemStatus`, `onCycleStatus: () => void`
- Left: clickable StatusDot (cycles through todo → in-progress → done on click).
- Center: problem title, tags (as Tag pills), DifficultyBadge.
- Right: external link icon (if `problem.link` exists), opens in new tab.
- Row has subtle hover background.

### ProgressRing (`components/ui/ProgressRing.tsx`)

- SVG-based circular progress indicator.
- Props: `percentage: number`, `size?: number` (default 40), `strokeWidth?: number` (default 3), `color?: string`.
- Shows percentage number in center.
- Track color: `var(--border)`, fill color: passed `color` prop.

### DifficultyBadge (`components/ui/DifficultyBadge.tsx`)

- Pill/badge showing "Easy" (green), "Medium" (orange), "Hard" (red).
- Small, inline, font-size 11px, uppercase, monospace font.

### StatusDot (`components/ui/StatusDot.tsx`)

- Small circle: gray=todo, orange=in-progress, green=done.
- Clickable, `cursor: pointer`, with tooltip (Radix Tooltip) showing current status.
- On click, cycles to next status.

### Tag (`components/ui/Tag.tsx`)

- Tiny pill badge for tags like "hashmap", "dfs", "bfs".
- `background: var(--bg-tertiary)`, `color: var(--text-secondary)`, `font-size: 10px`.

### SectionHeader (`components/ui/SectionHeader.tsx`)

- Reusable header for each section index page.
- Props: `section: SectionMeta`, `totalProblems: number`, `doneCount: number`
- Shows icon, title, description, and a stats bar (e.g., "12 / 67 completed").

---

## Data Files

### `src/data/sections.ts`

Export a `sections: SectionMeta[]` array with all 7 sections configured. Each entry has `id`, `title`, `shortTitle`, `icon`, `accent`, `path`, `description`. Map section accents:

- DSA → `var(--accent-green)`
- Advanced DSA → `var(--accent-purple)`
- JS Fundamentals → `var(--accent-orange)`
- React/Web → `var(--accent-blue)`
- Frontend Coding → `var(--accent-cyan)`
- Frontend System Design → `var(--accent-blue)`
- Backend System Design → `var(--accent-purple)`

### `src/data/dsa.ts`

Export `dsaTopics: Topic[]`. Include these topics with placeholder problems (I'll fill in the real data later):

1. **Arrays & Hashing** (icon: `LayoutList`) — 8 problems
2. **Two Pointers** (icon: `ArrowLeftRight`) — 5 problems
3. **Sliding Window** (icon: `PanelLeftOpen`) — 5 problems
4. **Stack** (icon: `Layers`) — 5 problems
5. **Binary Search** (icon: `SearchCode`) — 5 problems
6. **Linked List** (icon: `Link2`) — 6 problems
7. **Trees** (icon: `GitBranch`) — 8 problems
8. **Graphs** (icon: `Share2`) — 6 problems
9. **Dynamic Programming** (icon: `Table2`) — 9 problems
10. **Heap / Priority Queue** (icon: `Triangle`) — 5 problems
11. **Backtracking** (icon: `Undo2`) — 5 problems
12. **Greedy** (icon: `Zap`) — 5 problems

For each problem, include: `id` (format: `dsa-{topicAbbrev}-{num}`), `title`, `difficulty`, `tags`, and optionally `link` to LeetCode. Use real NeetCode 150 / Blind 75 problems where possible.

### Other data files

For `advanced-dsa.ts`, `js-fundamentals.ts`, `react-web.ts`, `frontend-coding.ts`, `frontend-system-design.ts`, `backend-system-design.ts` — export an empty `Topic[]` array with a comment that the user will add content later:

```typescript
import type { Topic } from "../types";
// TODO: Add topics and problems
export const advancedDsaTopics: Topic[] = [];
```

---

## Hooks

### `useProgress` (`src/hooks/useProgress.ts`)

Manages problem completion status via localStorage.

```typescript
const STORAGE_KEY = 'fullstack-dojo-progress';
// Stores Record<string, ProblemStatus> in localStorage

export function useProgress() {
  // Returns:
  getStatus(problemId: string): ProblemStatus          // defaults to 'todo'
  setStatus(problemId: string, status: ProblemStatus): void
  cycleStatus(problemId: string): void                 // todo → in-progress → done → todo
  getTopicProgress(problemIds: string[]): { total, done, inProgress, percentage }
}
```

Provide this hook via a React context so all components share the same state without prop drilling. Create a `ProgressProvider` that wraps the app.

---

## Page Behavior

### DsaIndex (`/dsa`)

- Uses `<SectionHeader>` with DSA section meta.
- Renders a grid of `<TopicCard>` for each topic in `dsaTopics`.
- Each card shows live progress from `useProgress`.
- Grid: 1 col mobile, 2 col tablet, 3 col desktop.

### DsaTopic (`/dsa/:topicId`)

- Reads `topicId` from URL params, finds matching topic from `dsaTopics`.
- If not found, show a "Topic not found" message with link back.
- Header: topic icon, title, description, progress bar (Radix Progress).
- List of `<ProblemRow>` for each problem in the topic.
- Clicking StatusDot cycles the problem's status (persisted via useProgress).

### Other section index pages

- Same pattern as DsaIndex but reading from their respective data file.
- If the data array is empty, show a placeholder/empty state: "No topics added yet. Edit `src/data/{section}.ts` to add content."

---

## Coding Conventions

1. **CSS**: One `.css` file per component, co-located in the same folder. Use BEM-style naming: `.sidebar`, `.sidebar__item`, `.sidebar__item--active`. No CSS modules, no styled-components.
2. **Components**: Functional components only. Named exports (not default). One component per file.
3. **Imports**: Import directly from file paths. No barrel `index.ts` re-exports.
4. **Accessibility**: All Radix primitives with proper `aria-label`. Keyboard navigation must work. Visible focus rings (already in global CSS).
5. **Mobile-first CSS**: Base styles are mobile layout. Add desktop layout inside `@media (min-width: 768px) {}`.
6. **No unused code**: Don't generate placeholder components that do nothing. If a section has no data, show the empty state inside the index page itself.
7. **Lucide icons**: Import icons dynamically by mapping string names. Create a helper function:
   ```typescript
   import * as icons from 'lucide-react';
   function getIcon(name: string, size = 18) {
     const Icon = icons[name as keyof typeof icons] as React.ComponentType<{ size: number }>;
     return Icon ? <Icon size={size} /> : null;
   }
   ```
8. **Links to external URLs**: Always open in new tab with `target="_blank" rel="noopener noreferrer"`.

---

## What NOT to do

- Do NOT install Tailwind CSS.
- Do NOT install Redux Toolkit unless explicitly asked.
- Do NOT use CSS-in-JS (styled-components, emotion, etc.).
- Do NOT create a backend or API — this is purely a static SPA.
- Do NOT add authentication or user accounts.
- Do NOT use `default export` — always use `named exports`.
- Do NOT create `index.ts` barrel files.
- Do NOT add testing setup unless asked.
- Do NOT over-engineer — keep it simple, the user will iterate.

---

## Build & Dev Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build locally
```

---

## Current Status

- [ ] Project scaffolded with Vite + React 19 + TypeScript
- [ ] All dependencies installed
- [ ] Global styles + CSS variables
- [ ] Types defined
- [ ] AppShell + Sidebar + MobileHeader
- [ ] Dashboard home page
- [ ] DSA section (index + topic pages) — fully functional
- [ ] Placeholder pages for remaining 6 sections with empty states
- [ ] useProgress hook with localStorage persistence
- [ ] Responsive: works on mobile, tablet, desktop
