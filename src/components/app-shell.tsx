"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-sw"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      <span className="knob" aria-hidden="true" />
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const mountFrame = requestAnimationFrame(() => {
      setMounted(true);
      setReady(true);
    });
    const t = setTimeout(() => setEntered(true), 1500);
    return () => {
      cancelAnimationFrame(mountFrame);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const frame = () => {
      ticking = false;
      const sy = window.scrollY;
      setScrolled(sy > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, Math.max(0, (sy / max) * 100)) : 0;
      const bar = document.querySelector<HTMLElement>(".scroll-prog .pbar i");
      const num = document.querySelector<HTMLElement>(".scroll-prog .sp-num");
      if (bar) bar.style.setProperty("--p", p.toFixed(1) + "%");
      if (num) num.textContent = Math.round(p) + "%";
      const aurora = document.querySelector<HTMLElement>(".aurora");
      if (aurora) aurora.style.transform = `translate3d(0,${(sy * 0.06).toFixed(1)}px,0)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const closeFrame = requestAnimationFrame(() => setMenuOpen(false));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(closeFrame);
      io.disconnect();
    };
  }, [pathname]);

  const dark = mounted ? resolvedTheme === "dark" : true;
  const cls = [
    "app",
    dark ? "dark" : "",
    ready ? "ready" : "",
    entered ? "entered" : "",
    scrolled ? "scrolled" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <div className="grain" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="scroll-prog" aria-hidden="true">
        <span className="sp-num">0%</span>
        <span className="pbar">
          <i />
        </span>
      </div>

      <header className="nav">
        <Link className="brand" href="/">
          <span className="dot" aria-hidden="true" />
          Dang Pham
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <ThemeSwitch />
          <Link className="cta-sm" href="/#contact">
            Let&apos;s talk
          </Link>
          <button
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
            {n.label}
          </Link>
        ))}
        <div className="mm-foot">
          <span className="mono" style={{ fontSize: ".76rem", color: "var(--ink-2)" }}>
            Switch theme
          </span>
          <ThemeSwitch />
        </div>
      </nav>

      <main className="layer1">{children}</main>

      <footer className="foot">
        <div className="foot-l">
          <b>Dang Pham</b> — Visual / Digital Designer
        </div>
        <div className="foot-l">© {new Date().getFullYear()} · Ho Chi Minh City, Vietnam</div>
        <button
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}
