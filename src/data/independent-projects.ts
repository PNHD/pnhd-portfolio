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
    accent: "RevOps command center",
    thumbnail:
      "https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/northstar-revops-1iggj3/1788286942989/web.png",
    thumbnailAlt: "Northstar RevOps revenue operations command center concept",
  },
  {
    title: "ReturnFlow Ops",
    eyebrow: "Self-directed concept · E-commerce operations",
    description:
      "A returns and refund operations console built around SLA triage, refund exposure, fraud-risk context, carrier health and an approval workflow for high-volume commerce teams.",
    tags: ["E-commerce UX", "Operations", "Workflow design"],
    liveHref: "https://returnflow-ops-0v2co1.v2.appdeploy.ai/",
    accent: "Returns control tower",
    thumbnail:
      "https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/returnflow-ops-0v2co1/1788287024292/web.png",
    thumbnailAlt: "ReturnFlow Ops e-commerce returns operations console concept",
  },
  {
    title: "AdForge Creative Ops",
    eyebrow: "Self-directed concept · AI creative workflow",
    description:
      "A working AI-assisted creative-operations tool that turns a product brief into structured ad directions, then supports human review, selection and production handoff.",
    tags: ["AI workflow", "Creative strategy", "Product design"],
    liveHref: "https://adforge-creative-ops-aesma7.v2.appdeploy.ai/",
    accent: "AI creative system",
    thumbnail:
      "https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/adforge-creative-ops-aesma7/1788287086972/web.png",
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
