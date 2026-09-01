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
    title: "Northstar RevOps",
    eyebrow: "Self-directed concept · B2B SaaS operations",
    description:
      "An interactive revenue-operations command center exploring dense pipeline data, forecast scenarios, risk signals, filtering and deal-level triage for a SaaS team.",
    tags: ["Product UI", "B2B SaaS", "Data workflows"],
    liveHref: "https://northstar-revops-1iggj3.v2.appdeploy.ai/",
    caseHref: "/projects/northstar-revops",
    accent: "RevOps command center",
    thumbnail: "/projects/northstar-revops.svg",
    thumbnailAlt: "Northstar RevOps revenue operations command center concept",
  },
  {
    title: "ReturnFlow Ops",
    eyebrow: "Self-directed concept · E-commerce operations",
    description:
      "A returns and refund operations console built around SLA triage, refund exposure, fraud-risk context, carrier health and an approval workflow for high-volume commerce teams.",
    tags: ["E-commerce UX", "Operations", "Workflow design"],
    liveHref: "https://returnflow-ops-0v2co1.v2.appdeploy.ai/",
    caseHref: "/projects/returnflow-ops",
    accent: "Returns control tower",
    thumbnail: "/projects/returnflow-ops.svg",
    thumbnailAlt: "ReturnFlow Ops e-commerce returns operations console concept",
  },
  {
    title: "AdForge Creative Ops",
    eyebrow: "Self-directed concept · AI creative workflow",
    description:
      "A working AI-assisted creative-operations tool that turns a product brief into structured ad directions, then supports human review, selection and production handoff.",
    tags: ["AI workflow", "Creative strategy", "Product design"],
    liveHref: "https://adforge-creative-ops-aesma7.v2.appdeploy.ai/",
    caseHref: "/projects/adforge-creative-ops",
    accent: "AI creative system",
    thumbnail: "/projects/adforge-creative-ops.svg",
    thumbnailAlt: "AdForge Creative Ops AI-assisted concept generation workflow",
  },
  {
    title: "Thiên Kim",
    eyebrow: "Independent project · AI image + video workflow",
    description:
      "A virtual-character content system exploring repeatable AI image and short-form video production through identity continuity, outfit variation, shot planning and workflow design.",
    tags: ["AI image + video", "Art direction", "Workflow design"],
    liveHref: "https://www.tiktok.com/@tieu.thienkim",
    caseHref: "/projects/thien-kim",
    accent: "AI content system",
    thumbnail: "/projects/thien-kim-collage.webp",
    thumbnailAlt: "Thiên Kim in a selected editorial look",
  },
];
