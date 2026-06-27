export const siteConfig = {
  name: "Dang Pham",
  title: "UI / Product Designer",
  tagline: "Crafting intuitive, polished interfaces for modern products.",
  description:
    "UI & Product Designer based in Ho Chi Minh City, Vietnam. Specializing in mobile, web, and SaaS interface design.",
  url: "https://dangpham.pages.dev",
  email: "phamnhathaidang@gmail.com",
  links: {
    dribbble: "https://dribbble.com/pnhd",
    behance: "https://www.behance.net/five3105",
    ui8: "https://ui8.net",
    github: "https://github.com/PNHD",
  },
};

export type Project = {
  slug: string;
  num: string;
  name: string;
  title: string;
  year: string;
  featured: boolean;
  tags: string[];
  blurb: string;
  heroLab: string;
  heroDim: string;
  facts: { role: string; timeline: string; type: string; platform: string };
  intro: string;
  challenge: string;
  approach: { n: string; t: string }[];
  gallery: { lab: string; dim: string }[];
  outcomes: { num: string; lab: string }[];
};

export const projects: Project[] = [
  {
    slug: "nova-ui-kit",
    num: "01",
    name: "Nova",
    title: "Dashboard & SaaS UI Kit",
    year: "2026",
    featured: true,
    tags: ["UI Kit", "Design System", "SaaS", "Figma"],
    blurb:
      "A production-ready SaaS UI kit — 200+ components, 80+ screens, light & dark, fully tokenized.",
    heroLab: "NOVA — SYSTEM OVERVIEW",
    heroDim: "1600 × 900",
    facts: {
      role: "Design Systems · UI",
      timeline: "2025 — 2026",
      type: "Self-initiated · UI8",
      platform: "Web · Figma",
    },
    intro:
      "Nova began with a simple frustration: most UI kits photograph beautifully and collapse the second you actually build with them. I wanted one that holds up under real product pressure — a system you can ship a SaaS app with, not just a pretty cover shot.",
    challenge:
      "Designers buy kits to move faster, then lose days fighting inconsistent spacing, half-finished states, and components that break the moment you resize them. The bar was never \"looks good\" — it was \"survives a real sprint.\"",
    approach: [
      { n: "01", t: "Every value is a token — color, type, spacing, radius, elevation. Change one, the whole system follows." },
      { n: "02", t: "Components designed states-first: default, hover, focus, disabled, loading, empty. No dead ends." },
      { n: "03", t: "80+ genuinely useful screens — onboarding, billing, settings, analytics — not lorem-ipsum filler." },
      { n: "04", t: "Light and dark shipped together from day one, balanced for real contrast, not a quick invert." },
    ],
    gallery: [
      { lab: "COMPONENT LIBRARY", dim: "1600 × 1200" },
      { lab: "DASHBOARD — DARK", dim: "1600 × 1200" },
      { lab: "TOKENS & VARIABLES", dim: "1600 × 1200" },
      { lab: "MOBILE SCREENS", dim: "1080 × 1350" },
    ],
    outcomes: [
      { num: "200+", lab: "Components" },
      { num: "80+", lab: "Screens" },
      { num: "2", lab: "Themes" },
      { num: "4.9★", lab: "UI8 rating" },
    ],
  },
  {
    slug: "meditation-app",
    num: "02",
    name: "Serenity",
    title: "Meditation App Redesign",
    year: "2026",
    featured: true,
    tags: ["Mobile", "UX/UI", "Concept"],
    blurb:
      "A calming mobile experience rebuilt around accessibility, breathing-led navigation, and micro-interactions.",
    heroLab: "SERENITY — HOME & SESSION",
    heroDim: "1600 × 900",
    facts: {
      role: "Product Design",
      timeline: "2026",
      type: "Concept",
      platform: "iOS · Android",
    },
    intro:
      "The original Serenity was lovely to look at and stressful to use — endless choices, thin contrast, no sense of calm in the navigation itself. I rebuilt it so the interface breathes with you instead of demanding from you.",
    challenge:
      "A meditation app that raises your heart rate has failed at the first step. Low contrast locked out a chunk of users, and the home screen asked for ten decisions before you could simply... start.",
    approach: [
      { n: "01", t: "Reduced the home screen to one decision: breathe now, or choose later." },
      { n: "02", t: "Rebuilt the palette for AA+ contrast that still feels soft and warm." },
      { n: "03", t: "Paired every key action with subtle haptics and motion timed to a real breath cycle." },
      { n: "04", t: "A color temperature that quietly shifts from morning to night." },
    ],
    gallery: [
      { lab: "ONBOARDING FLOW", dim: "1080 × 1920" },
      { lab: "SESSION PLAYER", dim: "1080 × 1920" },
      { lab: "LIBRARY", dim: "1080 × 1920" },
      { lab: "PROGRESS", dim: "1080 × 1920" },
    ],
    outcomes: [
      { num: "+38%", lab: "Avg. session" },
      { num: "AA+", lab: "Contrast" },
      { num: "1", lab: "Tap to start" },
      { num: "12", lab: "Screens" },
    ],
  },
  {
    slug: "analytics-dashboard",
    num: "03",
    name: "Pulse",
    title: "Analytics Dashboard",
    year: "2025",
    featured: true,
    tags: ["Web", "SaaS", "Data Viz"],
    blurb:
      "A data-dense analytics dashboard designed for clarity — heavy metrics, calm surface.",
    heroLab: "PULSE — OVERVIEW DASHBOARD",
    heroDim: "1600 × 900",
    facts: {
      role: "UI · Data Viz",
      timeline: "2025",
      type: "Client",
      platform: "Web App",
    },
    intro:
      "Pulse is where I learned that \"more data on screen\" and \"more clarity\" are opposite goals. The brief was a dashboard execs would actually read at 8am — dense, but never noisy.",
    challenge:
      "Stakeholders wanted everything visible at once. Users needed to find one number fast. The job was to honor both without turning the screen into a wall of charts.",
    approach: [
      { n: "01", t: "Progressive disclosure — headline metrics first, detail one click away." },
      { n: "02", t: "A single accent reserved for signal: anomalies and deltas, nothing decorative." },
      { n: "03", t: "Charts chosen by the question they answer, not by what looked impressive in the deck." },
      { n: "04", t: "Tables that fold gracefully into cards on smaller screens." },
    ],
    gallery: [
      { lab: "OVERVIEW", dim: "1600 × 1000" },
      { lab: "DETAIL VIEW", dim: "1600 × 1000" },
      { lab: "FILTERS & SEGMENTS", dim: "1600 × 1000" },
      { lab: "RESPONSIVE", dim: "1080 × 1350" },
    ],
    outcomes: [
      { num: "−40%", lab: "Time to insight" },
      { num: "30+", lab: "Chart states" },
      { num: "1", lab: "Signal color" },
      { num: "2wk", lab: "To ship" },
    ],
  },
  {
    slug: "3d-landing-page",
    num: "04",
    name: "Elevate",
    title: "3D Landing Page Concept",
    year: "2026",
    featured: true,
    tags: ["Web", "3D", "Motion"],
    blurb:
      "Where Blender renders meet clean UI — a landing concept with custom 3D woven into the layout.",
    heroLab: "ELEVATE — HERO RENDER",
    heroDim: "1600 × 900",
    facts: {
      role: "UI · 3D · Motion",
      timeline: "2026",
      type: "Concept",
      platform: "Web",
    },
    intro:
      "Elevate was my excuse to drag Blender into my UI workflow and see what happens when 3D stops being decoration and starts being layout. The render and the type grid had to negotiate the same space.",
    challenge:
      "3D on the web is a tax — on load time, on focus, on legibility. The challenge was keeping the wow without making the page slow or impossible to read.",
    approach: [
      { n: "01", t: "Modeled and lit custom scenes in Blender, baked down to lightweight assets." },
      { n: "02", t: "Tied the 3D to scroll so it earns its weight instead of just spinning." },
      { n: "03", t: "Let type lead — the render supports the message, never fights it." },
      { n: "04", t: "Motion study first, so the 3D had rhythm before a single pixel was placed." },
    ],
    gallery: [
      { lab: "HERO RENDER", dim: "1600 × 1000" },
      { lab: "SCROLL SEQUENCE", dim: "1600 × 1000" },
      { lab: "FEATURE SECTION", dim: "1600 × 1000" },
      { lab: "MOBILE", dim: "1080 × 1920" },
    ],
    outcomes: [
      { num: "60fps", lab: "Target" },
      { num: "4", lab: "3D scenes" },
      { num: "1", lab: "Motion study" },
      { num: "∞", lab: "Fun had" },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    company: "S3Corp.",
    role: "UI Designer",
    period: "Apr 2022 — Apr 2025",
    description:
      "Designed app interfaces, illustration and motion for client products — turning loose briefs into polished, on-brand UI.",
  },
  {
    company: "Shopline Vietnam",
    role: "Senior Graphic Designer",
    period: "Mar 2021 — Mar 2022",
    description:
      "Drove sales & marketing design, shipping campaign graphics that actually converted alongside the marketing team.",
  },
  {
    company: "Select Technology",
    role: "UX/UI Designer",
    period: "Aug 2020 — Feb 2021",
    description:
      "Led the redesign of the Aura app across mobile and web panel — from user flows to final UI.",
  },
  {
    company: "Epsilo",
    role: "UX/UI Designer",
    period: "Aug 2019 — Dec 2019",
    description:
      "Built website layouts and motion for The Scale Group, Epsilo and assorted multimedia work.",
  },
  {
    company: "AA Distribution Software",
    role: "Senior Graphic Designer",
    period: "2017 — 2019",
    description:
      "Crafted banners and Shop-in-Shop storefronts across Tiki, Lazada and Shopee.",
  },
  {
    company: "Mat Bao Corporation",
    role: "Graphic Designer",
    period: "2016 — 2017",
    description:
      "Produced banners, websites and marketing collateral across brand campaigns.",
  },
];

export type SkillGroup = { h: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { h: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"] },
  { h: "3D", items: ["Blender"] },
  { h: "Motion", items: ["After Effects"] },
  { h: "AI Tools", items: ["Claude", "ChatGPT", "Gemini", "ComfyUI"] },
];
