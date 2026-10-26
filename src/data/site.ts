/**
 * Single source of truth for site content.
 *
 * Everything you'll want to change after the first deploy lives in this
 * file: your name, links, bio, and project details. Case-study pages are
 * generated from PROJECTS below, so adding a project is a data change,
 * not a code change.
 *
 * Items marked PLACEHOLDER need your real values.
 */

export const SITE = {
  name: "Vivian Okonkwo",
  headline: "Frontend Engineer",
  // Short line used for <meta name="description"> and social previews.
  description:
    "Frontend engineer building fast, accessible product interfaces with React, Next.js, TypeScript, and Supabase — with practical experience in containerised delivery, automated testing, and AI-assisted workflows.",
  url: "https://vivian-okonkwo.vercel.app",
  location: "Nigeria",
} as const;

/** PLACEHOLDER handles — swap for your real profiles. */
export const CONTACT = {
  email: "viviokonkwo5050@gmail.com",
  github: "https://github.com/vivi-uch",
  linkedin: "https://www.linkedin.com/in/vivian-okonks",
} as const;

/** Sections rendered on the home page, in order. Drives the navbar too. */
export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "toolbox", label: "Toolbox" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT = {
  intro:
    "I build modern web applications with a focus on performance, usability, and user experience, ensuring every interaction feels fast, intuitive, and dependable.",
  body: [
    "I'm a frontend focused software engineer who enjoys building fast, reliable, and intuitive web applications. My primary tools are React, TypeScript, Next.js, and Vite, and I care deeply about creating seamless user experiences, from responsive interfaces to thoughtful error handling, loading states, and accessibility",
    "While frontend development is my specialty, I'm comfortable working across the stack when needed. I've built applications using Supabase, integrated backend services with Flask, containerized projects with Docker, and maintained quality through automated testing with Vitest. I work with Git and Bitbucket daily and leverage AI tools to speed up development, improve code quality, and uncover edge cases early.",
    "I'm also actively exploring AI-driven development, combining traditional software engineering practices with modern tools to build smarter and more efficient solutions.",
  ],
  facts: [
    { label: "Focus", value: "React · TypeScript · Next.js" },
    { label: "Also working in", value: "Supabase · Docker · Vitest · Flask" },
    { label: "Based in", value: "Nigeria (remote-friendly)" },
    {
      label: "Working with",
      value: "Git · Bitbucket · AI-assisted development",
    },
  ],
} as const;

/** Grouped skills. Reorder or extend freely. */
export const TOOLBOX = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Zustand",
      "TanStack Query",
      "Formik + Yup",
      "Zod",
      "Astro",
    ],
  },
  {
    group: "Cloud & data",
    items: [
      "Supabase (Storage, Realtime)",
      "REST APIs",
      "Google OAuth",
      "SQLite",
      "Vercel",
    ],
  },
  {
    group: "Testing & delivery",
    items: [
      "Vitest",
      "Docker",
      "Git",
      "Bitbucket",
      "ESLint",
      "CI-driven deploys",
    ],
  },
  {
    group: "Beyond the frontend",
    items: ["Python", "Flask", "scikit-learn", "AI-assisted development"],
  },
] as const;

export type ProjectStatus = "shipped" | "in-progress" | "planned";

export interface Project {
  /** URL segment: /work/<slug> */
  slug: string;
  name: string;
  /** Short line shown on the home-page card. */
  tagline: string;
  /** One sentence expanding on the tagline, used on the case study. */
  summary: string;
  status: ProjectStatus;
  /** Controls ordering and the featured badge on the home page. */
  featured: boolean;
  stack: string[];
  /** Rendered as the year or period of work. */
  year: string;
  /** PLACEHOLDER links — replace with the real URLs. */
  links: {
    live?: string;
    code?: string;
  };
  /** Case-study body, in order. */
  context: string;
  problem: string;
  approach: string[];
  features: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  next: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "photo-library",
    name: "Realtime Photo",
    tagline: "Live event galleries where every guest becomes a contributor.",
    summary:
      "A photo-sharing app for events: the host creates a gallery, shares a link or QR code, and photos uploaded by guests appear for everyone without a refresh.",
    status: "shipped",
    featured: true,
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Realtime",
      "TanStack Query",
      "Zustand",
    ],
    links: {
      live: "https://photo-library-five.vercel.app/",
      code: "https://github.com/Arinzemike1/photo-library",
    },
    context:
      "Weddings, birthdays, and conferences all have the same problem: photos end up scattered across dozens of phones, and most of them are never seen. The usual fix — a shared drive or a group chat — collapses once more than a handful of people start uploading.",
    problem:
      "Build a gallery that requires no account, works on the device a guest already has in their hand, and stays current while the event is still happening. It also had to survive real-world uploads: large camera files, inconsistent connections, and the HEIC images that iPhones produce by default.",
    approach: [
      "Next.js App Router with a slug-based public route, so guests land on /e/<slug> and nothing else. No auth, no sign-up friction.",
      "Supabase for all three concerns: Postgres for events and photo records, Storage for the files, and Realtime so new uploads broadcast to every open gallery.",
      "Image processing moved entirely to the client before upload. Files are compressed in a web worker and HEIC images are converted to JPEG, which keeps payloads small and avoids server-side transformation cost.",
      "TanStack Query for the gallery feed, with Zustand handling local UI state such as layout preference and upload progress.",
    ],
    features: [
      {
        title: "Realtime gallery",
        detail:
          "A Postgres changes subscription scoped to the event inserts new photos into local state as they arrive — no polling, no refresh button.",
      },
      {
        title: "Client-side image pipeline",
        detail:
          "Files are compressed in a web worker to roughly 2 MB, and HEIC/HEIF images are detected and converted to JPEG on the device before they ever hit the network.",
      },
      {
        title: "Link and QR sharing",
        detail:
          "The host gets a shareable URL and a QR code generated in the browser, which is what makes the no-account model work at a physical event.",
      },
      {
        title: "Photos without the wait",
        detail:
          "A lightbox with keyboard navigation, thumbnail URLs served at reduced width, and lazy loading so a gallery of a few hundred photos still opens quickly.",
      },
    ],
    challenges: [
      {
        title: "HEIC uploads were silently failing",
        detail:
          "Browsers can't render HEIC, so compression and preview both broke. Detecting the format and converting on the client fixed it without adding upload latency for everyone else.",
      },
      {
        title: "Keeping uploads honest",
        detail:
          "Progress reporting across a multi-file upload needs care — sequential processing made byte-level progress meaningful, and failures reset state rather than leaving the UI stuck at 90%.",
      },
      {
        title: "Realtime without duplicate state",
        detail:
          "The uploaded photo is already in local state by the time the realtime event arrives. Scoping subscriptions to the event and inserting by id keeps the list clean.",
      },
    ],
    next: [
      "Move uploads to signed direct-to-storage requests so large batches don't compete with page rendering.",
      "Add a host moderation view for removing photos, including soft deletes.",
      "Cover the upload and compression pipeline with Vitest unit tests, especially the HEIC branch.",
    ],
  },
  {
    slug: "home-carbon",
    name: "HomeCarbon",
    tagline: "A carbon-footprint calculator and analytics dashboard.",
    summary:
      "A household emissions tracker: a multi-step calculator collects transport and energy usage, then a dashboard visualises the footprint over time with recommendations.",
    status: "in-progress",
    featured: true,
    year: "2025 — present",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Formik + Yup",
      "Recharts",
      "React Router",
    ],
    links: {
      live: "https://homecarbon-frontend.onrender.com/",
      code: "https://github.com/Home-Carbon/HomeCarbon-frontend-",
    },
    context:
      "Carbon reporting tools tend to be built for organisations — dense, jargon-heavy, and expensive. Households are left with rough online calculators that give a single number and no sense of what to do with it.",
    problem:
      "Take a genuinely complicated domain — emissions factors across transport, cooking, and electricity — and turn it into a calculator a non-expert can finish in a few minutes, then keep them engaged with history and comparison rather than a one-off score.",
    approach: [
      "A step-by-step calculator that adapts to answers. Choosing a car surfaces different fields than choosing to walk or cycle, so nobody wades through questions that don't apply to them.",
      "Formik and Yup for the multi-step form. Validation rules are defined per step in a shared schema, which made the branching predictable and kept error messaging consistent.",
      "Zustand for calculator state across steps and for the authentication slice, so state survives navigation without prop drilling.",
      "A service layer wrapping axios with dedicated modules per domain, keeping HTTP details out of components.",
      "Google OAuth via @react-oauth/google, with route guards separating public, onboarding, and returning-user views.",
    ],
    features: [
      {
        title: "Adaptive multi-step calculator",
        detail:
          "Five steps with conditional fields per transport and cooking method, shared progress tracking, and a review screen before submission.",
      },
      {
        title: "Two different journeys",
        detail:
          "First-time visitors get an onboarding path with explanatory context; returning users land on a dashboard showing change since their last calculation.",
      },
      {
        title: "Analytics built from real form data",
        detail:
          "Recharts components render emissions trends, historical comparisons, and category breakdowns, with a gauge for the headline figure.",
      },
      {
        title: "Authentication with route guards",
        detail:
          "Session sync across tabs, protected routes, and public-only routes that bounce logged-in users away from sign-in screens.",
      },
    ],
    challenges: [
      {
        title: "Stepping through a long form",
        detail:
          "Managing validation across five steps means deciding when to validate — validating everything upfront is hostile, validating nothing is worse. Per-step validation surfaced on advance is the balance that held up in testing.",
      },
      {
        title: "Domain complexity in the UI",
        detail:
          "Emission factors and units don't map cleanly to form fields. Keeping the calculations in a dedicated module with typed inputs keeps the UI free of domain arithmetic.",
      },
      {
        title: "Still in progress",
        detail:
          "The calculator and dashboard are working; onboarding copy and the recommendations engine are being refined, and the real API is being wired in behind the existing service layer.",
      },
    ],
    next: [
      "Replace mock data with the live API now that the service layer boundary is stable.",
      "Add Vitest coverage for the emissions calculation module, which is the highest-risk logic in the app.",
      "Persist calculations so trends are real rather than seeded.",
    ],
  },
  {
    slug: "m-wallet",
    name: "m-Wallet",
    tagline:
      "A mobile-first fintech dashboard for transfers, airtime, and bills.",
    summary:
      "A digital wallet front end covering transfers, airtime top-ups, bill payments, and a paginated transaction ledger, built against a mock API.",
    status: "shipped",
    featured: true,
    year: "2025",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "json-server",
      "lucide-react",
    ],
    links: {
      live: "http://m-wallet-tz2q.vercel.app/",
      code: "https://github.com/vivi-uch/m-wallet",
    },
    context:
      "Wallet interfaces live or die on trust. If the balance, the ledger, and a receipt disagree, users stop believing the numbers — regardless of how the backend behaves.",
    problem:
      "Build the core money-movement screens — send, top up, pay a bill — with a ledger and receipts that stay consistent with each other, and make it feel right on a phone, since that's where it would actually be used.",
    approach: [
      "React with Vite for a fast dev loop and a small bundle, with React Router handling navigation and a protected-route wrapper.",
      "A json-server mock API shaped like a real backend: users with accounts and balances, banks, and a transactions collection. Building against it forced realistic loading and error states.",
      "A small component layer (Card, Button, Nav, PinModal, Receipt) reused across every screen, which kept the visual language consistent as features were added.",
      "Client-side pagination for the ledger, sorted by date on the client, with the balance and masking controls kept deliberately close to the top of the screen.",
    ],
    features: [
      {
        title: "Balance with masking",
        detail:
          "The headline figure can be hidden with a tap — a small detail that matters when a wallet is opened in public.",
      },
      {
        title: "Transaction ledger",
        detail:
          "Debits and credits are distinguished by direction and colour, with status badges and paginated browsing for long histories.",
      },
      {
        title: "PIN confirmation",
        detail:
          "A modal step before a transfer completes, mirroring how real wallet flows confirm intent rather than acting on a single tap.",
      },
    ],
    challenges: [
      {
        title: "Making mock data behave like production",
        detail:
          "A mock API happily returns everything at once. Deliberately modelling pagination, latency, and the shape of a failed transaction caught UX problems early that would otherwise have surfaced at integration.",
      },
      {
        title: "Keeping the ledger coherent",
        detail:
          "A transaction is a debit from one user's perspective and a credit from another's — the direction indicator is derived from the current user rather than stored, which avoids contradictory rows.",
      },
      {
        title: "Mobile-first, not mobile-only",
        detail:
          "The primary layout is a phone, but the balance panel and the ledger reflow into columns on wider screens instead of stretching into unreadable rows.",
      },
    ],
    next: [
      "Add Vitest tests around transaction direction and formatting, the two places where a bug would mislead a user.",
      "Introduce optimistic updates so the balance reflects a transfer immediately.",
      "Add a spend-over-time summary to the dashboard so the ledger tells a story rather than a list.",
    ],
  },
  {
    slug: "dashboard",
    name: "Analytics Dashboard",
    tagline: "A data-dense interface for exploring metrics in real time.",
    summary:
      "Currently being built: a dashboard for exploring time-series metrics, with filterable ranges and composable chart panels.",
    status: "planned",
    featured: false,
    year: "Coming soon",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Recharts",
    ],
    links: {},
    context:
      "This one is still on the workbench. The intention is to go further into the interaction details that dashboards usually skip — how filter state, chart ranges, and URL state stay in sync, and how a dense layout stays readable on smaller screens.",
    problem:
      "Build a dashboard that handles a realistic volume of time-series data without becoming sluggish, and where every view is shareable as a URL rather than trapped in component state.",
    approach: [
      "Data fetching is being built on TanStack Query so caching, refetching, and stale data are handled by the library rather than by hand.",
      "Filter and range state will live in the URL, so any view can be copied and sent to someone else and will render identically.",
      "Charting will be composed from small panel components rather than one monolithic chart page, so panels can be rearranged or reused.",
    ],
    features: [
      {
        title: "Composable panels",
        detail:
          "Small, independently fetchable chart components that can be arranged per view.",
      },
      {
        title: "Shareable state",
        detail:
          "Ranges and filters encoded in the query string rather than held in memory.",
      },
      {
        title: "Performance budget",
        detail:
          "Virtualised lists and aggregated queries so large ranges stay responsive.",
      },
    ],
    challenges: [
      {
        title: "Still in design",
        detail:
          "Deciding how much density is useful before a layout becomes unreadable is the open question. The interaction model comes first; the visuals follow it.",
      },
    ],
    next: [
      "Nail the data contract and the URL-state model before writing any chart code.",
      "Build one panel end-to-end as a vertical slice, then generalise it.",
      "Add latency instrumentation early, since this is the project most likely to hit performance limits.",
    ],
  },
];

/** Convenience helpers used by pages and the sitemap. */
export const featuredProjects = PROJECTS.filter((p) => p.featured);

export const getProject = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const statusLabel: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  planned: "Coming soon",
};
