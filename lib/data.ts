/**
 * Site content data — services, pricing, work, process, tech stack, and stats.
 * Single source of truth for the agency offer; edit here to update the page.
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
    category: "E-Commerce Marketplace",
    year: "2026",
    description:
      "A certified pre-owned marketplace for Toyota Nigeria, built end-to-end: 2,000+ inspected vehicles and genuine parts, with model/year search, 160-point inspection badges, warranty, and verified ownership history.",
    tags: ["TanStack", "TypeScript", "Supabase"],
    href: "https://toyotanigeriapreownedcars.com/",
    featured: true,
    gradient: "from-red-500/30 via-rose-500/10 to-transparent",
  },
  {
    id: "active-technologies",
    title: "Active Technologies",
    category: "Corporate Website",
    year: "2025",
    description:
      "The corporate website for Active Technologies, a tech recruitment firm that connects companies with vetted software engineers, built as a fast, responsive single-page React app.",
    tags: ["React", "JavaScript"],
    href: "https://activetechconsult.com/",
    featured: true,
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
  },
  {
    id: "amana-cruise",
    title: "AmanaCruise",
    category: "Booking Platform",
    year: "2026",
    description:
      "A Nigerian intercity ridesharing platform where riders search routes and dates to book seats on shared trips, backed by ID verification, live tracking, and community ratings. Built the front-end UIs in React and Tailwind.",
    tags: ["React", "Tailwind CSS"],
    href: "https://amanacruise.com/",
    featured: true,
    gradient: "from-blue-500/30 via-sky-500/10 to-transparent",
  },
];

export interface ProcessStep {
  /** Ordinal shown on the timeline, e.g. "01". */
  step: string;
  title: string;
  description: string;
  points: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We get clear on your business, your customers, and what winning online actually looks like for you.",
    points: ["Goals & audience", "What success looks like", "Scope & timeline"],
  },
  {
    step: "02",
    title: "Design",
    description:
      "A brand-fit design mapped to conversions, so visitors trust you and take action, not just admire the pixels.",
    points: ["Brand-aligned UI", "Built to convert", "Mobile-first"],
  },
  {
    step: "03",
    title: "Build",
    description:
      "Your website or web app, engineered fast on a modern, scalable stack and shipped live.",
    points: ["Modern, scalable stack", "Fast & SEO-ready", "Launched & live"],
  },
  {
    step: "04",
    title: "Automate",
    description:
      "Layer in an AI agent and automations that compound the value of your site, capturing leads and running the busywork.",
    points: [
      "AI agent for leads & support",
      "Workflow & CRM automation",
      "Runs 24/7",
    ],
  },
  {
    step: "05",
    title: "Grow",
    description:
      "Measure what matters, iterate, and keep the whole system earning long after launch.",
    points: ["Analytics & iteration", "Ongoing support", "Room to scale"],
  },
];

export const stats = [
  { value: "5+", label: "Projects shipped" },
  { value: "1k+", label: "Listings built" },
  { value: "3+", label: "Years building" },
  { value: "48h", label: "Reply time" },
] as const;

export interface Service {
  title: string;
  tagline: string;
  /** What the engagement includes. */
  includes: string[];
  /** Lucide icon key resolved in the Services section. */
  icon: "globe" | "bot" | "layers" | "workflow";
  /** Tailwind gradient classes used for the card's signature glow. */
  gradient: string;
  /** The standout offer — gets an accent ring + label. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    title: "Web Development",
    tagline:
      "Business websites, web apps, and e-commerce or marketplace builds. Fast, modern, and built to turn visitors into customers.",
    includes: [
      "Business websites",
      "Web apps & dashboards",
      "E-commerce & marketplaces",
      "Mobile-first & SEO-ready",
    ],
    icon: "globe",
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
  },
  {
    title: "Agentic AI",
    tagline:
      "Custom AI agents that capture leads, book appointments, and handle customer support around the clock, powered by the Claude API.",
    includes: [
      "Lead & booking agents",
      "24/7 customer support",
      "Claude API integration",
      "Trained on your business",
    ],
    icon: "bot",
    gradient: "from-blue-500/30 via-sky-500/10 to-transparent",
    featured: true,
  },
  {
    title: "Automation",
    tagline:
      "Workflow automation that connects your tools, routes your leads, and runs your ops, so the busywork runs itself.",
    includes: [
      "Lead routing & follow-up",
      "CRM integration",
      "Ops & workflow automation",
      "n8n-style pipelines",
    ],
    icon: "workflow",
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
  },
];

export interface PricingTier {
  name: string;
  /** Primary display price in NGN, e.g. "₦150k–400k". */
  price: string;
  /** USD equivalent for international clients, shown smaller beside the price. */
  priceUsd?: string;
  /** One-line summary of what the tier delivers. */
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  /** Optional footnote, e.g. a maintenance retainer. */
  note?: string;
  /** Highlighted as the recommended plan. */
  popular?: boolean;
}

export const pricing: PricingTier[] = [
  {
    name: "Get online",
    price: "₦150k–400k",
    priceUsd: "$100–270",
    summary: "A business website that earns trust",
    features: [
      "Up to 5 pages",
      "Mobile-first & fast",
      "Contact form & basic SEO",
      "Deployed & live",
    ],
    cta: { label: "Get started", href: "#contact" },
  },
  {
    name: "Get leads on autopilot",
    price: "₦450k–1.2M",
    priceUsd: "$300–800",
    summary: "Website + a custom AI agent",
    features: [
      "Everything in Get online",
      "AI agent for leads, bookings & support",
      "Claude-powered, trained on your business",
      "Captures leads 24/7",
    ],
    cta: { label: "Get started", href: "#contact" },
    popular: true,
  },
  {
    name: "Full growth stack",
    price: "₦1M–3M+",
    priceUsd: "$670–2,000+",
    summary: "Website + AI + automation",
    features: [
      "Everything in Get leads",
      "Workflow & CRM automation",
      "Lead routing & ops on autopilot",
      "Priority support",
    ],
    cta: { label: "Let's talk", href: "#contact" },
    note: "Optional maintenance from ₦50k/mo ($35)",
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
      "Stephen rebuilt our site and it loads instantly on mobile. Online orders jumped 40% in the first month. He just gets what a small business actually needs.",
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

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Buyer-intent FAQs. Also rendered as FAQPage structured data in the FAQ
 * section, so keep answers accurate and self-contained (plain text).
 */
export const faqs: Faq[] = [
  {
    question: "How much does a website cost in Nigeria?",
    answer:
      "A business website of up to 5 pages starts from ₦150,000–₦400,000 (about $100–$270). E-commerce, booking, and marketplace platforms start from ₦500,000 depending on scope. International clients are billed the USD equivalent, and you get a fixed quote before any work begins, no surprises.",
  },
  {
    question: "How long does it take to build my website?",
    answer:
      "Most business websites go live within 1–3 weeks. Web apps, e-commerce, and marketplace builds take longer depending on the features involved. You get a clear timeline with your quote and updates at every stage.",
  },
  {
    question: "What is an AI agent, and what can it do for my business?",
    answer:
      "An AI agent is a custom assistant, built on the Claude API, that lives on your website and works 24/7. It answers customer questions, captures and qualifies leads, books appointments, and hands off to you when needed, so you never lose an enquiry after hours.",
  },
  {
    question: "What is workflow automation?",
    answer:
      "Automation connects the tools you already use so repetitive work runs itself: routing new leads to the right place, following up automatically, syncing your CRM, and handling day-to-day ops. It saves hours every week and makes sure nothing slips through the cracks.",
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer:
      "Yes. I'm based in Abuja, Nigeria and work with clients worldwide, fully remote. Pricing is shown in Naira with a USD equivalent, and international clients can pay in USD.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. Optional maintenance and support retainers start from ₦50,000/month (about $35), covering updates, monitoring, small changes, and keeping your site, AI agent, and automations running smoothly.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just an idea of your goals and any brand assets or content you already have. If you don't have copy or a logo yet, I can help. The first step is a quick chat, send a message through the contact form and I'll reply within 48 hours.",
  },
];
