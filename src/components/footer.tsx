import { siteConfig } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-semibold text-lg">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              UI Designer &middot; Ho Chi Minh City
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            {(
              [
                ["Dribbble", siteConfig.links.dribbble],
                ["Behance", siteConfig.links.behance],
                ["GitHub", siteConfig.links.github],
              ] as const
            ).map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Designed with care in Figma</p>
        </div>
      </div>
    </footer>
  );
}
