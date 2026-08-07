export type IndependentProject = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  repoHref: string;
  liveHref?: string;
  accent: string;
};

export const independentProjects: IndependentProject[] = [
  {
    title: "WWM Build Lab",
    eyebrow: "Independent product · Product design + implementation",
    description:
      "A gear and combat calculator for Where Winds Meet Global, built around evidence-checked data, reproducible calculations and a production deployment workflow.",
    tags: ["Product design", "TypeScript", "Data systems"],
    repoHref: "https://github.com/PNHD/wwm-calc",
    liveHref: "https://wonton-wwm.pages.dev",
    accent: "Build calculator",
  },
  {
    title: "WWM Homestead Planner",
    eyebrow: "Independent product · Planning tool",
    description:
      "A web app for planning production, profit, material runway and retainer labor across a complex game economy, with dashboards, recommendations and optimization flows.",
    tags: ["Product UI", "React", "Systems thinking"],
    repoHref: "https://github.com/PNHD/homestead",
    accent: "Planner + optimizer",
  },
  {
    title: "Nexus UI Kit",
    eyebrow: "Independent experiment · UI system",
    description:
      "An AI-SaaS interface system explored across landing, admin dashboard, component gallery, mobile views, documentation and theme variants.",
    tags: ["UI system", "Responsive", "Visual direction"],
    repoHref: "https://github.com/PNHD/nexus-ui-kit",
    accent: "Interface system",
  },
];
