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
    github: "https://github.com/PNHD",
  },
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  featured: boolean;
  externalLink?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "nova-ui-kit",
    title: "Nova — Dashboard & SaaS UI Kit",
    description:
      "A production-ready SaaS UI kit with 200+ components, 80+ screens, light & dark themes. Token-based design system with full auto layout.",
    tags: ["UI Kit", "Dashboard", "SaaS", "Figma"],
    year: "2026",
    featured: true,
    externalLink: { label: "Buy on UI8", href: "https://ui8.net" },
  },
  {
    slug: "meditation-app",
    title: "Serenity — Meditation App Redesign",
    description:
      "A calming mobile experience redesigned from the ground up. Focus on accessibility, micro-interactions, and a soothing color palette.",
    tags: ["Mobile", "UI", "Concept"],
    year: "2026",
    featured: true,
  },
  {
    slug: "analytics-dashboard",
    title: "Pulse — Analytics Dashboard",
    description:
      "A data-rich SaaS dashboard designed for clarity. Complex data presented through clean charts, filters, and responsive layouts.",
    tags: ["Web", "UI", "Dashboard"],
    year: "2026",
    featured: true,
  },
  {
    slug: "3d-landing-page",
    title: "Elevate — 3D Landing Page Concept",
    description:
      "Where 3D illustration meets modern UI. A landing page concept featuring custom Blender renders integrated into a sleek interface.",
    tags: ["Web", "3D", "UI"],
    year: "2026",
    featured: false,
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
      "Designed app interfaces, illustrations, and motion for client products — turning briefs into polished, on-brand visuals.",
  },
  {
    company: "Shopline Vietnam",
    role: "Senior Graphic Designer",
    period: "Mar 2021 — Mar 2022",
    description:
      "Drove design for sales and marketing, partnering with the marketing team to ship campaign graphics that converted.",
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
      "Built website layouts and motion design for The Scale Group, Epsilo, and other multimedia work.",
  },
  {
    company: "AA Distribution Software",
    role: "Senior Graphic Designer",
    period: "2017 — 2019",
    description:
      "Crafted banners and Shop-in-Shop storefronts across Tiki, Lazada, and Shopee.",
  },
  {
    company: "Mat Bao Corporation",
    role: "Graphic Designer",
    period: "2016 — 2017",
    description:
      "Produced banners, websites, and marketing materials across brand campaigns.",
  },
];

export const skills = [
  { name: "Figma", category: "Design" },
  { name: "Adobe XD", category: "Design" },
  { name: "Photoshop", category: "Design" },
  { name: "Illustrator", category: "Design" },
  { name: "Blender", category: "3D" },
  { name: "After Effects", category: "Motion" },
  { name: "Claude", category: "AI Tools" },
  { name: "ChatGPT", category: "AI Tools" },
  { name: "Gemini", category: "AI Tools" },
  { name: "ComfyUI", category: "AI Tools" },
];
