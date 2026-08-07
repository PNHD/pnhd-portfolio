export type IndependentProject = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  accent: string;
  thumbnail: string;
  thumbnailAlt: string;
  caseHref?: string;
  repoHref?: string;
  liveHref?: string;
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
    caseHref: "/projects/wwm-build-lab",
    accent: "Build calculator",
    thumbnail: "/projects/wwm-build-lab.png",
    thumbnailAlt: "WWM Build Lab calculator interface",
  },
  {
    title: "Thiên Kim",
    eyebrow: "Independent project · AI visual + video workflow",
    description:
      "A virtual-character content system for short-form image and video production, with identity rules, shot planning, trend-mimic routing and repeatable AI-assisted workflows.",
    tags: ["AI video", "Art direction", "n8n workflow"],
    liveHref: "https://www.tiktok.com/@tieu.thienkim",
    caseHref: "/projects/thien-kim",
    accent: "AI content system",
    thumbnail: "/projects/thien-kim-cover.svg",
    thumbnailAlt: "Frame from a Thiên Kim AI-generated short-form video",
  },
  {
    title: "WWM Homestead Planner",
    eyebrow: "Independent product · Planning tool",
    description:
      "A web app for planning production, profit, material runway and retainer labor across a complex game economy, with dashboards, recommendations and optimization flows.",
    tags: ["Product UI", "React", "Systems thinking"],
    repoHref: "https://github.com/PNHD/homestead",
    liveHref: "https://wwm-homestead.pages.dev",
    caseHref: "/projects/wwm-homestead",
    accent: "Planner + optimizer",
    thumbnail: "/projects/wwm-homestead.png",
    thumbnailAlt: "WWM Homestead Planner dashboard interface",
  },
];
