"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      className="theme-sw"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="knob" />
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

  // mount + entrance timing
  useEffect(() => {
    setMounted(true);
    setReady(true);
    const t = setTimeout(() => setEntered(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // scroll: header state + progress bar + aurora parallax
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

  // close menu + lock body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // reveal-on-scroll, re-scanned per route
  useEffect(() => {
    setMenuOpen(false);
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
    return () => io.disconnect();
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
      <div className="grain" />
      <div className="aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="scroll-prog">
        <span className="sp-num">0%</span>
        <span className="pbar">
          <i />
        </span>
      </div>

      <header className="nav">
        <Link className="brand" href="/">
          <span className="dot" />
          Dang Pham
        </Link>
        <nav className="nav-links">
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
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="mobile-menu">
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
      </div>

      <main className="layer1">{children}</main>

      <footer className="foot">
        <div className="foot-l">
          <b>Dang Pham</b> — UI / Product Designer
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
