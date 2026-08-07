import type { MetadataRoute } from "next";
import { refreshedSiteConfig as siteConfig } from "@/data/portfolio-refresh";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects/wwm-build-lab`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/projects/thien-kim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
