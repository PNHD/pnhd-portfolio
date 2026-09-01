import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/app-shell";
import { AnalyticsRuntime } from "@/components/analytics-runtime";
import { refreshedSiteConfig as siteConfig } from "@/data/portfolio-refresh";
import "./globals.css";
import "./portfolio-refresh.css";
import "./project-cases.css";
import "./project-cases-expanded.css";
import "./thien-kim-media.css";
import "./accessibility.css";

const publicPositioning = {
  title: "Product & Visual Designer",
  description:
    "Product and visual designer in Ho Chi Minh City working across B2B SaaS product UI, e-commerce operations, visual systems and AI-assisted creative workflows.",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${publicPositioning.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: publicPositioning.description,
  keywords: [
    "Product Designer",
    "Visual Designer",
    "SaaS Product Designer",
    "UI Designer",
    "Figma Designer",
    "B2B SaaS Design",
    "Dashboard Design",
    "E-commerce UX",
    "Design Systems",
    "AI Product Design",
    "AI Creative Workflow",
    "Motion Designer",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Blender",
    "Dang Pham",
    "Ho Chi Minh City",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — ${publicPositioning.title}`,
    title: `${siteConfig.name} — ${publicPositioning.title}`,
    description: publicPositioning.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${publicPositioning.title}`,
    description: publicPositioning.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: publicPositioning.title,
    description: publicPositioning.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    sameAs: [siteConfig.links.dribbble, siteConfig.links.behance, siteConfig.links.github],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.dribbble.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={null}>
          <AnalyticsRuntime />
        </Suspense>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
