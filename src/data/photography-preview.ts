import type { IndependentProject } from "@/data/independent-projects";

export const photographyPortfolioReview = true;
export const photographyPreviewEnabled = true;
export const photographyPath = "/projects/ai-product-lifestyle-photography";
export const photographyMedia = photographyPortfolioReview
  ? "/__photo-review-media"
  : "/__photo-preview-media";

export const photographyProject: IndependentProject = {
  title: photographyPortfolioReview
    ? "AI Lifestyle Photography & Personalized POD Mockups"
    : "AI Product Lifestyle Photography",
  eyebrow: photographyPortfolioReview ? "Personal Project" : "Independent case study · Private preview",
  description:
    "Reference-led AI scenes and Photoshop finishing for a nine-image seasonal e-commerce set.",
  tags: ["AI art direction", "Adobe Photoshop", "E-commerce imagery"],
  caseHref: photographyPath,
  accent: "Product photography",
  thumbnail: `${photographyMedia}/US_4th-768.webp`,
  thumbnailAlt: "Red pet-print sweatshirt in a holiday porch scene beside a Bernese Mountain Dog",
};
