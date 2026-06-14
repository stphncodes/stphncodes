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
  { name: "TanStack", ring: 1, color: "#ff4154", category: "framework" },
  { name: "LangChain", ring: 2, color: "#a855f7", category: "ai" },
  { name: "LangGraph", ring: 2, color: "#f97316", category: "ai" },
  { name: "OpenAI", ring: 2, color: "#10b981", category: "ai" },
  { name: "n8n", ring: 2, color: "#ef4444", category: "ai" },
  { name: "Supabase", ring: 2, color: "#3ecf8e", category: "platform" },
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
    id: "toyota-nigeria",
    title: "Toyota Nigeria Pre-Owned Cars",
    category: "E-Commerce Platform",
    year: "2026",
    description:
      "A certified pre-owned marketplace for Toyota Nigeria — 2,000+ inspected vehicles and genuine parts, with model/year search, 160-point inspection badges, warranty, and verified ownership history.",
    tags: ["TanStack", "TypeScript", "Supabase"],
    href: "https://toyotanigeriapreownedcars.com/",
    featured: true,
    gradient: "from-red-500/30 via-rose-500/10 to-transparent",
  },
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
];

export interface ExperienceItem {
  role: string;
  company: string;
  /** Optional external link for the company name. */
  companyHref?: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Activetechconsult",
    companyHref: "https://activetechconsult.com/",
    period: "2025 — Present",
    description:
      "Building Toyota Nigeria's certified pre-owned cars platform — an e-commerce marketplace for inspected Toyota vehicles and genuine parts.",
    highlights: [
      "Developed the customer-facing marketplace listing 2,000+ certified Toyota models with search and filtering by model and year",
      "Built browsing, vehicle-detail, and inquiry flows around verified history, warranty, and transparent pricing",
      "Shipped a fast, responsive UI serving thousands of customers across Nigeria",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "FinTech Scale-up",
    period: "2024 — 2025",
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
    period: "2023 — 2024",
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

export interface Service {
  title: string;
  tagline: string;
  /** What the engagement includes. */
  includes: string[];
  /** Lucide icon key resolved in the Services section. */
  icon: "globe" | "bot" | "layers";
  /** Tailwind gradient classes used for the card's signature glow. */
  gradient: string;
  /** The standout offer — gets an accent ring + label. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    title: "Business Website",
    tagline: "Fast, modern, mobile-first website built for conversions.",
    includes: ["Design", "Development", "Deployment", "Basic SEO"],
    icon: "globe",
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
  },
  {
    title: "AI Agent",
    tagline:
      "A custom AI agent that handles leads, bookings, or customer support — automatically.",
    includes: [
      "Claude API integration",
      "Chat / form interface",
      "Business logic setup",
    ],
    icon: "bot",
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
  },
  {
    title: "Website + AI Bundle",
    tagline:
      "The full package. A professional site with an AI agent built in — ready to grow your business.",
    includes: ["Everything above", "Priority support"],
    icon: "layers",
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    featured: true,
  },
];

export interface PricingTier {
  name: string;
  /** Display price, e.g. "$300" or "$2,500+". */
  price: string;
  /** One-line summary of what the tier delivers. */
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  /** Highlighted as the recommended plan. */
  popular?: boolean;
}

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    price: "$300",
    summary: "Business website only",
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Contact form",
      "Deployed & live",
    ],
    cta: { label: "Get started", href: "#contact" },
  },
  {
    name: "Growth",
    price: "$1,000",
    summary: "Website + AI Agent",
    features: [
      "Lead capture or FAQ bot",
      "Claude API powered",
      "Integrated into your site",
    ],
    cta: { label: "Get started", href: "#contact" },
    popular: true,
  },
  {
    name: "Premium",
    price: "$2,500+",
    summary: "Full automation stack",
    features: [
      "Custom AI workflows",
      "CRM integration",
      "Ongoing support",
    ],
    cta: { label: "Let's talk", href: "#contact" },
  },
];

export interface Testimonial {
  name: string;
  /** Business or role, e.g. "Founder, Acme Co.". */
  role: string;
  quote: string;
  /** Initials shown in the avatar circle. */
  initials: string;
}

// Mock testimonials — sample content for layout. Swap in real client quotes when available.
export const testimonials: Testimonial[] = [
  {
    name: "Adaeze Okonkwo",
    role: "Founder, Lumina Skincare",
    quote:
      "Stephen rebuilt our site and it loads instantly on mobile — online orders jumped 40% in the first month. He just gets what a small business actually needs.",
    initials: "AO",
  },
  {
    name: "Daniel Mensah",
    role: "Owner, BrightPath Tutors",
    quote:
      "The AI agent he built handles enquiries and books trial lessons around the clock. It feels like we hired a full-time receptionist for a fraction of the cost.",
    initials: "DM",
  },
  {
    name: "Sarah Whitfield",
    role: "Director, Northwind Logistics",
    quote:
      "Clear communication, fast delivery, and the website plus AI bundle paid for itself. We capture leads automatically now instead of losing them after hours.",
    initials: "SW",
  },
];
