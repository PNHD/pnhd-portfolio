import type { IndependentProject } from "@/data/independent-projects";

export const photographyPreviewEnabled = process.env.PHOTOGRAPHY_LOCAL_PREVIEW === "1";
export const photographyPath = "/projects/ai-product-lifestyle-photography";
export const photographyMedia = "/__photo-preview-media";

export const photographyProject: IndependentProject = {
  title: "AI Product Lifestyle Photography",
  eyebrow: "Independent case study · Private preview",
  description:
    "Reference-led AI scenes and Photoshop finishing for a nine-image seasonal e-commerce set.",
  tags: ["AI art direction", "Adobe Photoshop", "E-commerce imagery"],
  caseHref: photographyPath,
  accent: "Product photography",
  thumbnail: `${photographyMedia}/US_4th-768.webp`,
  thumbnailAlt: "Red pet-print sweatshirt in a holiday porch scene beside a Bernese Mountain Dog",
};
