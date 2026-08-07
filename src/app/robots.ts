import type { MetadataRoute } from "next";
import { refreshedSiteConfig as siteConfig } from "@/data/portfolio-refresh";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
