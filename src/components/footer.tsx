import Link from "next/link";
import { siteConfig } from "@/data/portfolio";

const socials = [
  ["Dribbble", siteConfig.links.dribbble],
  ["Behance", siteConfig.links.behance],
  ["GitHub", siteConfig.links.github],
] as const;

const nav = [
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20">
        {/* Top — large CTA text */}
        <div className="mb-16">
          <p className="text-muted-foreground text-sm mb-3">
            Have a project in mind?
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="heading-xl link-underline hover:text-accent transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Col 1 — info */}
          <div>
            <p className="font-semibold mb-3">{siteConfig.name}</p>
            <p className="text-muted-foreground leading-relaxed">
              UI Designer & 3D Artist
              <br />
              Ho Chi Minh City, Vietnam
            </p>
          </div>

          {/* Col 2 — nav */}
          <div>
            <p className="label mb-3">Navigation</p>
            <ul className="space-y-2">
              {nav.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — social */}
          <div>
            <p className="label mb-3">Social</p>
            <ul className="space-y-2">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — availability */}
          <div>
            <p className="label mb-3">Status</p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for work
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Designed in Figma</p>
        </div>
      </div>
    </footer>
  );
}
