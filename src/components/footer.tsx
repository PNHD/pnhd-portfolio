import { siteConfig } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="ed-footer">
      <div>
        © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.title}
      </div>
      <div>Ho Chi Minh City, Vietnam</div>
    </footer>
  );
}
