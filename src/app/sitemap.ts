import type { MetadataRoute } from "next";
import { refreshedSiteConfig as siteConfig } from "@/data/portfolio-refresh";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectPaths = [
    "wwm-build-lab",
    "thien-kim",
    "co-giao-ai",
    "claude-ui-lab",
    "wwm-homestead",
  ];

  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPaths.map((path) => ({
      url: `${siteConfig.url}/projects/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
