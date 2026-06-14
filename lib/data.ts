/**
 * Dummy content data — projects, tech stack, experience, and stats.
 * Replace with real content / a CMS fetch when ready.
 */

export interface TechItem {
  name: string;
  /** Ring index for the orbit layout (0 = innermost). */
  ring: number;
  /** Accent color used for the glow. */
  color: string;
  category: "language" | "framework" | "platform" | "ai";
}

export const techStack: TechItem[] = [
  { name: "Python", ring: 0, color: "#3b82f6", category: "language" },
  { name: "JavaScript", ring: 0, color: "#eab308", category: "language" },
  { name: "TypeScript", ring: 0, color: "#0ea5e9", category: "language" },
  { name: "Next.js", ring: 1, color: "#e5e7eb", category: "framework" },
  { name: "React", ring: 1, color: "#22d3ee", category: "framework" },
  { name: "Vite", ring: 1, color: "#a855f7", category: "framework" },
  { name: "Node.js", ring: 1, color: "#22c55e", category: "framework" },
  { name: "FastAPI", ring: 1, color: "#14b8a6", category: "framework" },
  { name: "LangChain", ring: 2, color: "#a855f7", category: "ai" },
  { name: "LangGraph", ring: 2, color: "#f97316", category: "ai" },
  { name: "OpenAI", ring: 2, color: "#10b981", category: "ai" },
  { name: "n8n", ring: 2, color: "#ef4444", category: "ai" },
  { name: "PostgreSQL", ring: 2, color: "#38bdf8", category: "platform" },
  { name: "Redis", ring: 2, color: "#ef4444", category: "platform" },
  { name: "GraphQL", ring: 2, color: "#ec4899", category: "platform" },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
  /** Tailwind gradient classes used for the card's signature glow. */
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "neura",
    title: "Neura",
    category: "AI Platform",
    year: "2025",
    description:
      "A production RAG platform that turns private knowledge bases into low-latency conversational agents. Streaming responses, vector caching, and evals baked in.",
    tags: ["Next.js", "LangChain", "PostgreSQL", "pgvector", "Redis"],
    href: "#",
    featured: true,
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
  },
  {
    id: "atlas",
    title: "Atlas",
    category: "Developer Tooling",
    year: "2024",
    description:
      "A code-intelligence engine that maps large TypeScript codebases into a queryable graph — powering instant refactors and semantic search across millions of lines.",
    tags: ["TypeScript", "Node.js", "tree-sitter", "GraphQL"],
    href: "#",
    featured: true,
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
  },
  {
    id: "pulse",
    title: "Pulse",
    category: "Realtime Analytics",
    year: "2024",
    description:
      "Event-streaming analytics dashboard handling millions of events per minute with sub-second aggregation and live, animated visualizations.",
    tags: ["React", "Node.js", "Kafka", "ClickHouse"],
    href: "#",
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
  },
  {
    id: "forge",
    title: "Forge",
    category: "Developer Experience",
    year: "2023",
    description:
      "An AI pair-programmer extension that scaffolds typed APIs from natural language and auto-generates tests against the contract.",
    tags: ["TypeScript", "Python", "FastAPI", "OpenAI"],
    href: "#",
    gradient: "from-orange-500/30 via-amber-500/10 to-transparent",
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "AI Product Startup",
    period: "2024 — Present",
    description:
      "Leading the design of an LLM orchestration layer serving high-throughput inference for enterprise customers.",
    highlights: [
      "Architected a multi-tenant inference gateway scaling to 10k req/s",
      "Cut p95 latency 38% with semantic caching + speculative decoding",
      "Mentored 4 engineers and owned the platform roadmap",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "FinTech Scale-up",
    period: "2022 — 2024",
    description:
      "Built customer-facing products and the internal tooling that powered a 5x growth in active users.",
    highlights: [
      "Shipped a realtime dashboard used by 50k+ daily users",
      "Drove migration to a typed, modular Next.js monorepo",
      "Cut API response times 40% through query and caching optimization",
    ],
  },
  {
    role: "Software Engineer",
    company: "Digital Product Studio",
    period: "2020 — 2022",
    description:
      "Delivered web platforms for startups and brands across the product lifecycle, from prototype to launch.",
    highlights: [
      "Launched 12+ production web apps end-to-end",
      "Established a rigorous automated testing and code-review culture",
      "Specialized in performance and accessible, polished UI",
    ],
  },
];

export const stats = [
  { value: "3+", label: "Years building" },
  { value: "15+", label: "Projects shipped" },
  { value: "10k", label: "Req/s at peak" },
  { value: "∞", label: "Curiosity" },
] as const;
