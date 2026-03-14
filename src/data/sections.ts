import type { SectionMeta } from "../types";

export const sections: SectionMeta[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    shortTitle: "DS & Algo",
    icon: "Code2",
    accent: "var(--accent-green)",
    path: "/dsa",
    description:
      "Data Structures & Algorithms — arrays, trees, graphs, DP and beyond.",
  },
  {
    id: "advanced-dsa",
    title: "Adv.Data Structures & Algorithms",
    shortTitle: "Adv. DS & Algo",
    icon: "Cpu",
    accent: "var(--accent-purple)",
    path: "/advanced-dsa",
    description:
      "Hard-level algorithmic patterns: segment trees, tries, advanced DP, bit manipulation.",
  },
  {
    id: "js-fundamentals",
    title: "JS Fundamentals",
    shortTitle: "JS Fundamentals",
    icon: "FileCode",
    accent: "var(--accent-orange)",
    path: "/js-fundamentals",
    description:
      "Core JavaScript concepts: closures, prototypes, async, event loop, and more.",
  },
  {
    id: "react-web",
    title: "React & Web Fundamnetals",
    shortTitle: "React/Web Fundamentals",
    icon: "Globe",
    accent: "var(--accent-blue)",
    path: "/react-web",
    description:
      "React internals, hooks, rendering, performance, browser APIs, and the web platform.",
  },
  {
    id: "frontend-coding",
    title: "Frontend Machine Coding",
    shortTitle: "Frontend Coding",
    icon: "Monitor",
    accent: "var(--accent-cyan)",
    path: "/frontend-coding",
    description:
      "Build components and mini-apps from scratch under time pressure.",
  },
  {
    id: "frontend-system-design",
    title: "Frontend System Design",
    shortTitle: "Frontend System Design",
    icon: "Layout",
    accent: "var(--accent-blue)",
    path: "/frontend-system-design",
    description:
      "Design scalable frontend architectures: component systems, state, performance.",
  },
  {
    id: "backend-system-design",
    title: "Backend System Design",
    shortTitle: "Backend System Design",
    icon: "Server",
    accent: "var(--accent-purple)",
    path: "/backend-system-design",
    description:
      "Design distributed systems: databases, caching, queues, microservices.",
  },
];
